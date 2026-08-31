# Architecture

How Recall is put together, and why. If you just want to use it, the
[README](README.md) is enough. If you are changing it, read
[AGENTS.md](AGENTS.md) too.

## The idea

Recall is a database made of markdown files. There is no runtime, no daemon and
no index — the storage engine is the agent's own file reading, and the query
language is English.

That sounds like a limitation and is mostly the point. Memory you can read is
memory you can correct. Every fact the agent believes about you sits in a file
you can open, edit, diff and revert. A vector store cannot offer that.

## The four memory files

| File | Holds | Lifetime |
|------|-------|----------|
| `memory/identity.md` | How the AI behaves — personality, rules, tone | Permanent |
| `memory/profile.md` | What's true about you — preferences, stack | Grows over time |
| `memory/history/` | What happened — dated session entries | Archived monthly |
| `memory/session.md` | What you're doing right now | Resets each session |

The split is about **lifetime, not subject matter**. Each file changes at a
different rate, which is what makes the system affordable: only the slow-moving
files are loaded every session.

## Loading order

`recall.md` is the entry point. When you type your AI's name:

1. `memory/identity.md` — who the AI is
2. `memory/profile.md` — who you are
3. `memory/session.md` — where you left off

Three reads, and the agent is itself again. `memory/history/` is **not** loaded
— it is searched on demand by the `search` feature when you ask about the past.
That is deliberate: history grows without bound, and loading it every session
would make the system more expensive the longer you used it.

Installing the `merge` feature collapses the first two files into
`memory/merged.md`, reducing startup to two reads.

## Writing

Memory is not append-only. Before writing, each candidate fact is resolved
against what is already in the file to exactly one of **ADD**, **UPDATE**,
**DELETE** or **NOOP**, and every line carries provenance — `stated`,
`inferred` or `external`. Superseded lines are struck through and dated rather
than deleted, so a contradiction can be audited instead of silently resolved.

The full protocol is in [`recall.md`](recall.md); the line format is documented
in [`memory/profile.md`](memory/profile.md). The reason this matters for
security is in [SECURITY.md](SECURITY.md).

## Features

Everything beyond the four memory files is optional and lives in `features/`.
A feature is simultaneously two things:

- **A Claude Code plugin** — `.claude-plugin/plugin.json` plus a `SKILL.md` at
  the plugin root, installable with `/plugin install <name>@recall`
- **A written protocol** — `README.md` and `install.md` that any agent can read
  and execute, on any tool

The second is why the first is not a lock-in. On Codex or Cursor there is no
plugin system, so you say `"Load session-log"` and the agent follows the
install protocol itself. Same feature, same result, no packaging.

`SKILL.md` stays at the plugin root rather than in `skills/<name>/`. Every
feature ships exactly one skill, and Claude Code discovers a single skill at the
root — so the nested layout would gain nothing and break a path people already
reference.

### Dependencies between features

Most features are independent. The exceptions:

| Feature | Requires | Why |
|---------|----------|-----|
| `inject-tone`, `inject-mood`, `inject-time` | `hook-user-prompt` | They are injector scripts; the framework is what runs them |
| `search` | `session-log` | It searches the entries `session-log` writes |
| `session-brief` | `reminders`, `projects`, `time-aware` (optional) | Each adds a section to the brief; it degrades gracefully without them |

### Features that write outside the repository

Five features edit `~/.claude/`: `hook-session-start`, `hook-user-prompt`, and
the three `inject-*` features. All five ship an `uninstall.md`, and the
validator refuses to pass a `hook`- or `inject`-named feature that does not.
Two more handle paid API credentials: `image-gen` and `video-gen`.

## Validation

`npm run validate` runs one zero-dependency Node script that enforces the parts
of this architecture a reader cannot see:

- Directory names are kebab-case, and `SKILL.md` `name` equals the directory name
- Frontmatter parses — a skill whose frontmatter does not parse never loads, silently
- No duplicate skill names
- Relative links resolve (fenced code blocks are skipped)
- Template placeholders do not leak into shipped documentation
- Hook and inject features ship an uninstall protocol
- Every marketplace entry resolves to a real `plugin.json`, and every
  `plugin.json` has a marketplace entry

Files over 300 lines warn rather than fail. A `SKILL.md` is loaded whenever its
trigger fires, so length is a per-invocation cost.

## Full file tree

```
recall/
├── .claude-plugin/           # Marketplace manifest — one entry per feature
│   └── marketplace.json
├── .github/                  # Issue and PR templates, and the validate workflow
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/
│   │   └── validate.yml
│   └── pull_request_template.md
├── features/                 # Optional. Install only what you need — each one is a plugin.
│   ├── adventure/            # Visual-novel RPG sessions
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── code-audit/           # Four-tier code review: survey, investigate, refine, audit
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── decisions/            # Append-only log of decisions and their reasoning
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── git-commit/           # Structured commits with session context
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── hook-session-start/   # Loads memory automatically when Claude Code starts
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── hooks/
│   │   │   ├── session-start.ps1.template
│   │   │   └── session-start.sh.template
│   │   ├── install.md
│   │   ├── README.md
│   │   ├── SKILL.md
│   │   └── uninstall.md
│   ├── hook-user-prompt/     # UserPromptSubmit hook framework the inject-* features plug into
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── examples/
│   │   │   ├── example-timestamp-injector.ps1.template
│   │   │   └── example-timestamp-injector.sh.template
│   │   ├── master-hook/
│   │   │   ├── user-prompt-hook.ps1.template
│   │   │   └── user-prompt-hook.sh.template
│   │   ├── injector-format.md
│   │   ├── install.md
│   │   ├── README.md
│   │   ├── SKILL.md
│   │   └── uninstall.md
│   ├── image-gen/            # Render PNGs via the OpenAI image API — needs a key, costs money
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── scripts/
│   │   │   ├── invoke-image-gen.sh.template
│   │   │   └── Invoke-ImageGen.ps1.template
│   │   ├── .env.example
│   │   ├── credential-setup.md
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── image-prompt/         # Write Midjourney / NijiJourney prompts
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── inject-mood/          # Adds MOOD: to every prompt — needs hook-user-prompt
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── injectors/
│   │   │   ├── mood.ps1.template
│   │   │   └── mood.sh.template
│   │   ├── commands.md
│   │   ├── install.md
│   │   ├── README.md
│   │   ├── SKILL.md
│   │   └── uninstall.md
│   ├── inject-time/          # Adds a timestamp and period to every prompt — needs hook-user-prompt
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── injectors/
│   │   │   ├── time.ps1.template
│   │   │   └── time.sh.template
│   │   ├── install.md
│   │   ├── README.md
│   │   ├── SKILL.md
│   │   └── uninstall.md
│   ├── inject-tone/          # Adds TONE: to every prompt — needs hook-user-prompt
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── injectors/
│   │   │   ├── tone.ps1.template
│   │   │   └── tone.sh.template
│   │   ├── commands.md
│   │   ├── install.md
│   │   ├── README.md
│   │   ├── SKILL.md
│   │   └── uninstall.md
│   ├── learned-rules/        # Behavioural rules the AI accumulates from its own mistakes
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── config.json
│   │   ├── install.md
│   │   ├── README.md
│   │   ├── rules-format.md
│   │   └── SKILL.md
│   ├── library/              # Reusable knowledge entries in eight fixed formats
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── formats/          # One template per entry type
│   │   │   ├── architecture-format.md
│   │   │   ├── component-format.md
│   │   │   ├── database-format.md
│   │   │   ├── diagram-format.md
│   │   │   ├── integration-format.md
│   │   │   ├── security-format.md
│   │   │   ├── theme-format.md
│   │   │   └── workflow-format.md
│   │   ├── items/            # Ready-made entries you can install
│   │   │   ├── integration/
│   │   │   │   └── toyyibpay-payment-gateway.md
│   │   │   ├── security/
│   │   │   │   ├── security-headers.md
│   │   │   │   └── toyyibpay-webhook-verification.md
│   │   │   └── README.md
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── merge/                # Collapse identity + profile into one file for faster loading
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── patches/          # Versioned fixes to memory files
│   │   │   ├── install.md
│   │   │   ├── PATCH-001.md
│   │   │   └── patch-format.md
│   │   ├── memory-format.md
│   │   ├── protocol.md
│   │   ├── README.md
│   │   ├── session-format.md
│   │   └── SKILL.md
│   ├── music/                # Turn an image into a concept album with Suno-ready lyrics
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── new-skill/            # The AI proposes new skills from patterns it notices
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── postmortem/           # Failure log — what broke and what prevents it next time
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── install.md
│   │   ├── protocol.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── projects/             # Ten active project slots, least-recently-used archived
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── reminders/            # Follow-ups that survive across sessions
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── search/               # Search past sessions and answer in narrative
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── install.md
│   │   ├── output-format.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── session-brief/        # Context briefing delivered at session start
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── install.md
│   │   ├── protocol.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── session-log/          # Write a dated entry into memory/history/
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── time-aware/           # Time-of-day awareness in greetings and behaviour
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── protocol.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── topic-notes/          # Subject-based notes that outlive the calendar
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── index-format.md
│   │   ├── install.md
│   │   ├── README.md
│   │   ├── SKILL.md
│   │   └── topic-format.md
│   ├── trim/                 # Budget-aware compaction — summarise instead of delete
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── install.md
│   │   ├── policy-format.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── video-gen/            # Render MP4 via the Seedance API — needs a key, costs money
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── scripts/
│   │   │   ├── invoke-video-gen.sh.template
│   │   │   └── Invoke-VideoGen.ps1.template
│   │   ├── .env.example
│   │   ├── credential-setup.md
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   └── work-plan/            # Plan-to-execution tracking with per-task commits
│       ├── .claude-plugin/
│       │   └── plugin.json
│       ├── install.md
│       ├── plan-format.md
│       ├── README.md
│       └── SKILL.md
├── memory/                   # The four memory files. This is the whole database.
│   ├── history/              # What happened — dated entries, archived monthly
│   │   ├── example-entry.md  # A worked example
│   │   └── format.md         # Entry structure and archive rules
│   ├── identity.md           # How the AI behaves — permanent
│   ├── profile.md            # What's true about you — grows over time
│   └── session.md            # What you are doing right now — resets each session
├── scripts/                  # Repo tooling
│   └── validate.mjs          # npm run validate
├── AGENTS.md                 # Instructions for agents changing this repo
├── AUDIT.md                  # Pre-restructure audit, kept as the historical record
├── CHANGELOG.md              # Release history
├── CONTRIBUTING.md           # Instructions for humans changing this repo
├── LICENSE                   # MIT
├── package.json              # Zero dependencies; exists for `npm run validate`
├── README.md                 # Start here
├── recall.md                 # Entry point — loading order and the save protocol
├── SECURITY.md               # Threat model: memory poisoning
├── setup-guide.md            # Manual setup (2-5 min)
└── setup-wizard.md           # Guided setup (30 sec)
```
