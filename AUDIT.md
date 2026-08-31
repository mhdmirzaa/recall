# Audit — pre-restructure state

Baseline audit of the repository as inherited, taken before any renaming. Every finding
below was produced by running the check, not by reading. This file deliberately contains
the old names; it is the historical record of what was fixed.

- **Commit audited:** `42e29a3` (Initial commit)
- **Date:** 2026-08-31
- **Scope:** 141 files, 76 markdown files, 17,153 markdown lines, 28 features

---

## 1. SKILL.md frontmatter and naming

A SKILL.md without parseable YAML frontmatter never loads — Claude Code skips it silently,
so the feature appears installed and does nothing. Nine features ship no SKILL.md at all;
two ship one that cannot load; fourteen carry a `name` that will not match its directory
after the rename.

| Old directory | New directory | Frontmatter | `name:` | Action |
|---|---|---|---|---|
| `Auto-Commit-System` | `git-commit` | ok | `auto-commit` | rename |
| `Auto-Load-Hook-System` | `hook-session-start` | **no SKILL.md** | — | author |
| `Decision-Log-System` | `decisions` | ok | `log-decision` | rename |
| `Echo-Memory-Recall` | `search` | **no SKILL.md** | — | author |
| `Forge-Self-Improvement-System` | `new-skill` | ok | `forge-skill` | rename |
| `Image-Generation-System` | `image-gen` | ok | `image-generation` | rename |
| `Image-Prompt-System` | `image-prompt` | ok | `image-prompt` | matches |
| `Interactive-Story-System` | `adventure` | ok | `interactive-story` | rename |
| `LRU-Project-Management-System` | `projects` | ok | `manage-project` | rename |
| `Library-System` | `library` | ok | `library` | matches |
| `Memory-Compaction-System` | `trim` | ok | `memory-compaction` | rename |
| `Memory-Consolidation-System` | `merge` | **no SKILL.md** | — | author |
| `Mood-Prompt-Inject-System` | `inject-mood` | **no SKILL.md** | — | author |
| `Mulahazah-System` | `learned-rules` | ok | `mulahazah` | rename |
| `Observation-System` | `code-audit` | ok | `observation` | rename |
| `Post-Mortem-System` | `postmortem` | **NO FRONTMATTER** | — | fix |
| `Reminders-System` | `reminders` | ok | `check-reminders` | rename |
| `Save-Diary-System` | `session-log` | ok | `save-diary` | rename |
| `Session-Briefing-System` | `session-brief` | **NO FRONTMATTER** | — | fix |
| `Skill-Plugin-System` | *(replaced by marketplace)* | **no SKILL.md** | — | delete |
| `Song-Creation-System` | `music` | ok | `song-creation` | rename |
| `Time-Prompt-Inject-System` | `inject-time` | **no SKILL.md** | — | author |
| `Time-based-Aware-System` | `time-aware` | **no SKILL.md** | — | author |
| `Tone-Prompt-Inject-System` | `inject-tone` | **no SKILL.md** | — | author |
| `Topic-Diary-System` | `topic-notes` | ok | `topic-diary` | rename |
| `User-Prompt-Hook-System` | `hook-user-prompt` | **no SKILL.md** | — | author |
| `Video-Generation-System` | `video-gen` | ok | `video-generation` | rename |
| `Work-Plan-Execution` | `work-plan` | ok | `work-plan` | matches |

**Totals:** 17 SKILL.md files exist. 2 are unloadable. 14 need a `name` change.
9 features have none; 8 of those need one written (the ninth is deleted).

### Broken by construction

`Post-Mortem-System/SKILL.md` and `Session-Briefing-System/SKILL.md` both open with a
markdown heading (`# 🔥 Post-Mortem — Skill Plugin`) instead of a `---` frontmatter block.
Their trigger words are documented in the body as a `## Trigger Words` list, so the
information needed to write a valid `description` is already present — it was simply never
put in frontmatter.

---

## 2. Broken relative links

2 of 470+ relative links do not resolve.

| File | Target |
|---|---|
| `Feature/LRU-Project-Management-System/SKILL.md` | `./active/name.md` |
| `Feature/LRU-Project-Management-System/SKILL.md` | `./archived/name.md` |

Both are illustrative paths inside prose written as real links. They describe a directory
layout the user creates at install time, so they should be inline code, not links.

---

## 3. Unreplaced template placeholders

20 files ship `[AI_NAME]`, `[USER_NAME]` or `[YOUR_NAME]` tokens — 109 occurrences.
Six of these are genuine templates the user personalises at setup. The other **14 are
feature documentation**, where a literal `[AI_NAME]` is just a bug: it means the docs were
copy-pasted from the template and never generalised.

| File | Count | Template? |
|---|---:|---|
| `master-memory.md` | 12 | yes |
| `main/identity-core.md` | 10 | yes |
| `main/relationship-memory.md` | 5 | yes |
| `main/current-session.md` | 2 | yes |
| `setup-guide.md` | 13 | yes |
| `setup-wizard.md` | 3 | yes |
| `Feature/Memory-Consolidation-System/main-memory-format.md` | 9 | **no** |
| `Feature/Memory-Consolidation-System/consolidation-core.md` | 8 | **no** |
| `Feature/Time-based-Aware-System/README.md` | 8 | **no** |
| `Feature/Time-based-Aware-System/time-aware-core.md` | 8 | **no** |
| `Feature/Auto-Load-Hook-System/install-auto-load-hook.md` | 6 | **no** |
| `Feature/Memory-Consolidation-System/patches/PATCH-001.md` | 4 | **no** |
| `Feature/Auto-Load-Hook-System/README.md` | 3 | **no** |
| `Feature/Auto-Load-Hook-System/uninstall-auto-load-hook.md` | 2 | **no** |
| `Feature/Memory-Consolidation-System/patches/patch-format.md` | 2 | **no** |
| `daily-diary/daily-diary-protocol.md` | 9 | **no** |
| `Feature/Memory-Consolidation-System/patches/install-patch-system.md` | 1 | **no** |
| `Feature/Skill-Plugin-System/README.md` | 1 | **no** |
| `Feature/Skill-Plugin-System/install-skill-plugin.md` | 1 | **no** |
| `README.md` | 1 | **no** |

`scripts/validate.mjs` allowlists the six templates and errors on the rest.

---

## 4. Oversized files

Threshold: 300 lines. Anything loaded on every request costs context on every request, and
a SKILL.md is loaded whenever its trigger fires.

| File | Lines | Why it matters |
|---|---:|---|
| `Feature/Observation-System/SKILL.md` | 651 | Worst offender. Four independent tiers (Survey / Investigate / Refine / Audit) in one file; loading it to run one tier pulls in all four. |
| `library-items/integration/toyyibpay-payment-gateway.md` | 565 | Library content, loaded on demand only — acceptable. |
| `library-items/security/toyyibpay-webhook-verification.md` | 556 | Same. |
| `Feature/Interactive-Story-System/SKILL.md` | 477 | Loaded per turn during an active adventure. |
| `Feature/LRU-Project-Management-System/SKILL.md` | 372 | Commands and the LRU engine are separable. |
| `README.md` | 368 | 160 lines of it is a hand-drawn file tree. |
| `library-items/security/security-headers.md` | 358 | On-demand — acceptable. |
| `Feature/Library-System/formats/database-format.md` | 301 | Marginal. |

Validator treats these as warnings, not errors.

---

## 5. README ↔ `Feature/` drift

**None.** All 28 directories under `Feature/` appear in the README's tier tables, and every
feature named in the README exists on disk. The README's file tree is also accurate — it
lists all 8 files in `Feature/Library-System/formats/`, and all 8 exist.

---

## 6. Missing hygiene files

| File | Status |
|---|---|
| `LICENSE` | **missing** |
| `CONTRIBUTING.md` | **missing** |
| `CHANGELOG.md` | **missing** |
| `SECURITY.md` | **missing** |
| `.github/` | **missing** (no issue templates, no PR template, no CI) |
| `package.json` | **missing** (no `npm run validate` entry point) |
| `README.md` | present |

---

## 7. Other findings

- **`.DS_Store` is untracked and not gitignored.** It will be committed by accident.
- **No git remote configured.**
- **`Mulahazah-System` documents its install as `npx continuous-improvement install`** — an
  external npm package. Renaming the directory to `learned-rules` does not change that
  dependency, and the feature is not self-contained the way the other 27 are.
- **No secrets committed.** `.env.example` files in `Image-Generation-System` and
  `Video-Generation-System` contain only `sk-REPLACE-WITH-YOUR-KEY` and
  `REPLACE-WITH-YOUR-KEY`; the shell templates read from the environment.
- **Seven features write outside the repository** — `Auto-Load-Hook-System`,
  `User-Prompt-Hook-System` and the three `*-Prompt-Inject-System` features install shell and
  PowerShell hooks into `~/.claude/`; `Image-Generation-System` and `Video-Generation-System`
  handle API keys and make paid API calls. Five ship an uninstall protocol. The two
  generation features do not, but they install no hooks either.
- **Version claim.** The README declares `Version: 4.2`. Recall starts at 1.0.0; this is a
  new project, not a continuation.
