#!/usr/bin/env node
/**
 * Repo validator — zero dependencies, Node 18+.
 *
 * Enforces the naming rule (directory name == SKILL.md `name`) and catches the
 * structural mistakes that silently break features:
 *   - SKILL.md with missing or unparseable frontmatter (the feature never loads)
 *   - name/directory mismatches
 *   - duplicate skill names
 *   - broken relative links
 *   - unreplaced template placeholders in shipped files
 *   - oversized files that eat the context budget
 *
 * Usage: node scripts/validate.mjs
 * Exits 1 on any error. Warnings do not fail the build.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative, extname } from 'node:path';

const ROOT = resolve(process.argv[2] ?? '.');
const FEATURES_DIR = join(ROOT, 'features');

// Files that are TEMPLATES and are allowed to contain [PLACEHOLDER] tokens.
const PLACEHOLDER_ALLOWLIST = [
  'recall.md',
  'memory/identity.md',
  'memory/profile.md',
  'memory/session.md',
  'setup-guide.md',
  'setup-wizard.md',
];

const MAX_LINES = 300;          // warn above this
const IGNORE_DIRS = new Set(['.git', 'node_modules', '.claude']);

const errors = [];
const warnings = [];

const err = (file, msg) => errors.push({ file, msg });
const warn = (file, msg) => warnings.push({ file, msg });

// ---------------------------------------------------------------- helpers

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (IGNORE_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const rel = (p) => relative(ROOT, p).split('\\').join('/');

/**
 * Minimal frontmatter reader. Returns null when there is no parseable block.
 * Handles the multi-line double-quoted scalars this project uses for `description`.
 */
function readFrontmatter(text) {
  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return null;

  const end = lines.indexOf('---', 1);
  if (end === -1) return null;

  const block = lines.slice(1, end);
  const fields = {};
  let key = null;
  let buffer = '';
  let open = false;

  for (const line of block) {
    if (open) {
      buffer += ' ' + line.trim();
      if (buffer.trimEnd().endsWith('"')) {
        fields[key] = buffer.trim().replace(/^"|"$/g, '');
        open = false;
        key = null;
        buffer = '';
      }
      continue;
    }
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    key = m[1];
    const value = m[2].trim();
    if (value.startsWith('"') && !(value.length > 1 && value.endsWith('"'))) {
      open = true;
      buffer = value;
    } else {
      fields[key] = value.replace(/^"|"$/g, '');
      key = null;
    }
  }
  if (open && key) fields[key] = buffer.trim().replace(/^"|"$/g, '');
  return fields;
}

const isKebab = (s) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s);

// ---------------------------------------------------- 1. feature contract

const seenNames = new Map();

if (!existsSync(FEATURES_DIR)) {
  err('features/', 'directory not found — run the rename phase first');
} else {
  for (const entry of readdirSync(FEATURES_DIR)) {
    const dir = join(FEATURES_DIR, entry);
    if (!statSync(dir).isDirectory()) continue;

    if (!isKebab(entry)) {
      err(`features/${entry}`, 'directory name must be lowercase kebab-case');
    }
    if (!existsSync(join(dir, 'README.md'))) {
      err(`features/${entry}`, 'missing README.md');
    }

    const skillPath = join(dir, 'SKILL.md');
    const nestedSkills = walk(dir).filter((f) => f.endsWith('SKILL.md'));
    const skills = existsSync(skillPath) ? [skillPath] : nestedSkills;

    if (skills.length === 0) {
      warn(`features/${entry}`, 'no SKILL.md (fine for docs-only features)');
      continue;
    }

    for (const sp of skills) {
      const fm = readFrontmatter(readFileSync(sp, 'utf8'));
      if (!fm) {
        err(rel(sp), 'no parseable YAML frontmatter — this skill will NEVER load');
        continue;
      }
      if (!fm.name) err(rel(sp), 'frontmatter missing required field: name');
      if (!fm.description) err(rel(sp), 'frontmatter missing required field: description');
      if (fm.name && !isKebab(fm.name)) {
        err(rel(sp), `name "${fm.name}" must be lowercase kebab-case`);
      }
      // The naming rule.
      if (fm.name && skills.length === 1 && fm.name !== entry) {
        err(rel(sp), `name "${fm.name}" does not match directory "${entry}"`);
      }
      if (fm.name) {
        if (seenNames.has(fm.name)) {
          err(rel(sp), `duplicate skill name "${fm.name}" (also in ${seenNames.get(fm.name)})`);
        } else {
          seenNames.set(fm.name, rel(sp));
        }
      }
    }

    // Features that write outside the repo must be reversible.
    const files = readdirSync(dir).join(' ').toLowerCase();
    const touchesSystem = /hook|inject/.test(entry);
    if (touchesSystem && !files.includes('uninstall')) {
      err(`features/${entry}`, 'installs hooks but ships no uninstall protocol');
    }
  }
}

// ------------------------------------------------ 2. links & placeholders

const mdFiles = walk(ROOT).filter((f) => extname(f) === '.md');

for (const file of mdFiles) {
  const text = readFileSync(file, 'utf8');
  const relPath = rel(file);

  // Broken relative links. Fenced code blocks are skipped — a link inside a
  // ```markdown fence is an example of output, not a link into this repo.
  let inFence = false;
  for (const line of text.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    for (const m of line.matchAll(/\[[^\]]*\]\((?!https?:|mailto:|#)([^)]+)\)/g)) {
      const target = m[1].split('#')[0].trim();
      if (!target) continue;
      const resolved = resolve(dirname(file), target);
      if (!existsSync(resolved)) {
        err(relPath, `broken link -> ${target}`);
      }
    }
  }

  // Unreplaced placeholders outside the template allowlist.
  if (!PLACEHOLDER_ALLOWLIST.includes(relPath)) {
    const hits = [...text.matchAll(/\[(AI_NAME|USER_NAME|YOUR_NAME)\]/g)];
    if (hits.length) {
      err(relPath, `${hits.length} unreplaced placeholder(s), e.g. ${hits[0][0]}`);
    }
  }

  // Context budget.
  const lineCount = text.split(/\r?\n/).length;
  if (lineCount > MAX_LINES) {
    warn(relPath, `${lineCount} lines — consider splitting (loaded content costs context)`);
  }
}

// ------------------------------------------- 3. marketplace integrity
//
// Two directions, both of which silently break installs when they drift:
//   - a marketplace entry pointing at a directory with no plugin.json
//   - a plugin.json nobody can install because it has no marketplace entry

const MARKETPLACE = join(ROOT, '.claude-plugin', 'marketplace.json');

if (existsSync(MARKETPLACE)) {
  let manifest = null;
  try {
    manifest = JSON.parse(readFileSync(MARKETPLACE, 'utf8'));
  } catch (e) {
    err('.claude-plugin/marketplace.json', `invalid JSON: ${e.message}`);
  }

  if (manifest) {
    const entries = Array.isArray(manifest.plugins) ? manifest.plugins : [];
    if (!entries.length) err('.claude-plugin/marketplace.json', 'no plugins declared');

    const listed = new Set();

    for (const entry of entries) {
      const label = entry?.name ?? '(unnamed)';
      if (!entry?.name) {
        err('.claude-plugin/marketplace.json', 'plugin entry missing required field: name');
        continue;
      }
      listed.add(entry.name);

      if (typeof entry.source !== 'string') {
        err('.claude-plugin/marketplace.json', `${label}: source must be a relative path string`);
        continue;
      }

      const dir = join(ROOT, entry.source);
      if (!existsSync(dir) || !statSync(dir).isDirectory()) {
        err('.claude-plugin/marketplace.json', `${label}: source "${entry.source}" is not a directory`);
        continue;
      }

      const pluginPath = join(dir, '.claude-plugin', 'plugin.json');
      if (!existsSync(pluginPath)) {
        err(rel(dir), `listed in the marketplace but has no .claude-plugin/plugin.json`);
        continue;
      }

      let plugin = null;
      try {
        plugin = JSON.parse(readFileSync(pluginPath, 'utf8'));
      } catch (e) {
        err(rel(pluginPath), `invalid JSON: ${e.message}`);
        continue;
      }

      if (plugin.name !== entry.name) {
        err(rel(pluginPath), `name "${plugin.name}" does not match marketplace entry "${entry.name}"`);
      }
      if (!plugin.version) err(rel(pluginPath), 'missing required field: version');
      if (!plugin.description) err(rel(pluginPath), 'missing required field: description');
    }

    // Every plugin.json must be reachable from the marketplace.
    if (existsSync(FEATURES_DIR)) {
      for (const entry of readdirSync(FEATURES_DIR)) {
        const pluginPath = join(FEATURES_DIR, entry, '.claude-plugin', 'plugin.json');
        if (!existsSync(pluginPath)) continue;
        if (!listed.has(entry)) {
          err(`features/${entry}`, 'has a plugin.json but no marketplace entry — nobody can install it');
        }
      }
    }
  }
}

// ------------------------------------------------------- 4. repo hygiene

for (const f of ['LICENSE', 'README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'CHANGELOG.md']) {
  if (!existsSync(join(ROOT, f))) err(f, 'missing');
}

// -------------------------------------------------------------- 5. report

const group = (items) => {
  const byFile = new Map();
  for (const i of items) {
    if (!byFile.has(i.file)) byFile.set(i.file, []);
    byFile.get(i.file).push(i.msg);
  }
  return byFile;
};

if (warnings.length) {
  console.log('\nWARNINGS');
  for (const [file, msgs] of group(warnings)) {
    console.log(`  ${file}`);
    for (const m of msgs) console.log(`    - ${m}`);
  }
}

if (errors.length) {
  console.log('\nERRORS');
  for (const [file, msgs] of group(errors)) {
    console.log(`  ${file}`);
    for (const m of msgs) console.log(`    - ${m}`);
  }
  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)\n`);
  process.exit(1);
}

console.log(`\nAll checks passed. ${seenNames.size} skills validated, ${warnings.length} warning(s).\n`);
