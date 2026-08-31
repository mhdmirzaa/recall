# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Recall starts at 1.0.0. It began as a fork but is a new project, not a
continuation of any earlier version number.

## [Unreleased]

### Removed

- **The two inherited ToyyibPay library items** —
  `integration/toyyibpay-payment-gateway.md` and
  `security/toyyibpay-webhook-verification.md`. 1,100 lines of personal
  integration notes for one Malaysian payment gateway, shipped in a catalogue
  meant to hold patterns any project can reuse. `security/security-headers.md`
  is now the sole example item, and the `integration/` section folder goes with
  them.
- **`AUDIT.md`.** It recorded the pre-rebuild state and the old file paths —
  scaffolding for the restructure, not documentation a user reads. Now
  gitignored. The 1.0.0 entry below no longer links to it.

## [1.0.0] - 2026-08-31

First release of Recall as a standalone project. Everything below is relative
to the inherited state the rebuild started from.

### Added

- **Plugin marketplace.** `.claude-plugin/marketplace.json` declares 27
  plugins, one per feature, with categories and keywords. Each feature carries
  its own `.claude-plugin/plugin.json` at 1.0.0. Installing a feature is now
  `/plugin install <name>@recall` instead of typing a phrase and hoping six
  English steps are executed correctly.
- **Ten skills that did not exist or could not load.** `search`, `merge`,
  `time-aware`, `hook-session-start`, `hook-user-prompt`, `inject-tone`,
  `inject-mood` and `inject-time` had no `SKILL.md` at all. Every description is
  built from trigger phrases already documented in that feature's own docs.
- **`AGENTS.md`** — cross-tool agent instructions, read natively by Codex,
  Cursor, Copilot, Gemini CLI and Windsurf. Exact commands, the feature
  contract, and explicit boundaries.
- **`ARCHITECTURE.md`** — the design reasoning and the full file tree, moved
  out of the README.
- **`CONTRIBUTING.md`** — the feature contract, skill authoring, the context
  budget rule, and a PR checklist.
- **`SECURITY.md`** — reporting policy plus the memory poisoning threat model.
- **`CHANGELOG.md`**, **`LICENSE`** (MIT), and GitHub issue and PR templates.
- **`package.json` and CI.** `npm run validate` runs on every push and pull
  request, Node 20. No dependencies key, no lockfile, no install step.
- **Marketplace integrity checks in the validator** — every marketplace entry
  must resolve to a real `plugin.json` whose name agrees, and every
  `plugin.json` must have an entry, since one without is uninstallable.
- **Security notes** on every feature that installs a hook or handles an API
  key: `hook-session-start`, `hook-user-prompt`, the three `inject-*` features,
  `image-gen` and `video-gen`.

### Changed

- **Everything is renamed.** A reader should understand a file from its name
  alone. `master-memory.md` → `recall.md`; `main/` → `memory/` with
  `identity-core.md` → `identity.md`, `relationship-memory.md` → `profile.md`,
  `current-session.md` → `session.md`; `daily-diary/` → `memory/history/`;
  `Feature/` → `features/`. All 135 moves used `git mv`, so history is intact.
- **All 27 feature directories renamed** to plain words without the `-System`
  suffix — `Forge-Self-Improvement-System` → `new-skill`,
  `Echo-Memory-Recall` → `search`, `Observation-System` → `code-audit`, and so
  on. Each `SKILL.md` `name` now matches its directory.
- **Uniform filenames inside every feature.** 35 differently-named install
  protocols became `install.md` and `uninstall.md`; the `*-core.md` files became
  `protocol.md`.
- **Terminology is plain.** Master Memory → Index, Identity Core → Identity,
  Relationship Memory → Profile, Current Session → Working memory, Daily Diary →
  History, Resurrection Command → Command, Instant Restoration Protocol →
  Loading memory.
- **Memory writes resolve instead of appending.** Each fact is compared against
  what memory holds and resolved to ADD, UPDATE, DELETE or NOOP. Superseded
  entries are struck through and dated rather than deleted, and every line
  carries provenance — `stated`, `inferred` or `external`. Previously `save`
  appended unconditionally, so contradictions accumulated.
- **README restructured** from 440 lines to 198: one sentence, the memory
  table, a three-step quick start, then the feature tables.
- **`features/skill-plugin` removed** and its 91 references rewritten. The
  marketplace does its job; its authoring guidance moved to `CONTRIBUTING.md`.

### Fixed

- **Two skills that had never loaded.** `postmortem/SKILL.md` and
  `session-brief/SKILL.md` opened with a markdown heading instead of YAML
  frontmatter, so Claude Code skipped them silently. Both features appeared
  installed and did nothing.
- **69 template placeholders** shipped in documentation across 16 files. Feature
  docs contained the literal `AI_NAME` token in brackets, so they read as though
  the reader's AI were named after the placeholder itself. Converted to
  `<ai-name>` / `<user-name>`, matching the convention the install protocols
  already used.
- **Two broken relative links** in the project list format.
- **The link checker no longer reads inside fenced code blocks.** A link in a
  ` ```markdown ` fence is an example of generated output, not a link into the
  repo, and checking it produced false errors for anyone documenting a format.
- **`.DS_Store` and `.env` are gitignored.** `.env` in particular is a file the
  two API features instruct users to create.

### Security

- **Memory poisoning documented as the primary threat** (OWASP ASI06, 2026
  Agentic Top 10). Memory files are trusted, auto-loaded every session and
  persistent, so a malicious line written once influences every future session
  without the attacker being present again. Session-scoped prompt-injection
  defences do not catch this, because the payload never arrives — it is already
  there at load time.
- **External content must be user-confirmed before entering a memory file,** and
  is tagged `external`. The features that can move outside content into memory
  are named explicitly: `library`, `search`, `image-gen`, `video-gen`,
  `learned-rules`, and anything fetching a URL.
- **Memory belongs in git**, so every write is a reviewable diff and an injected
  line can be traced to the session that introduced it.
- **An audit procedure** for a memory file you do not trust, including the check
  that actually finds things: memory should describe what is true, so an entry
  written as an instruction is shaped wrong.
- **The limits are stated.** These protocols instruct a cooperating agent; they
  are not enforced controls, and they do not stop an attacker with filesystem
  write access.

[Unreleased]: https://github.com/mhdmirzaa/recall/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/mhdmirzaa/recall/releases/tag/v1.0.0
