# AGENTS.md

Instructions for AI coding agents working on the Recall repository itself.

If you are here to *use* Recall as a memory system, you want `recall.md`. This
file is about changing the repo.

## What this project is

A persistent memory system for AI agents, made entirely of markdown. There is
no runtime, no build, no test suite and no dependencies. The "system" is a set
of `.md` files an agent reads at the start of a session and writes back to.

Almost every change here is prose. Treat the writing as the product.

## Commands

```bash
npm run validate          # the only check; must exit 0
claude plugin validate . --strict            # marketplace manifest
claude plugin validate ./features/<name> --strict   # one plugin
```

There is no install step — zero dependencies, no lockfile. CI runs
`npm run validate` on Node 20.

To test a feature the way a user gets it:

```bash
claude plugin marketplace add "$(pwd)"   # absolute path; "." is rejected
claude plugin install <feature>@recall
claude plugin details <feature>@recall   # confirms the skill was discovered
claude plugin uninstall <feature>@recall
claude plugin marketplace remove recall
```

Always run that cleanup. Leaving a test marketplace in the user's settings is
a side effect they did not ask for.

## Layout

```
recall.md              Entry point: loading order and the save protocol
memory/                The four memory files — this is the whole database
  identity.md          How the AI behaves          (permanent)
  profile.md           What is true about the user (grows)
  session.md           What is happening now       (resets)
  history/             Dated session entries       (archived monthly)
features/<name>/       One directory per feature; each is a plugin
scripts/validate.mjs   The validator
.claude-plugin/        marketplace.json — one entry per feature
```

## Naming

A reader must understand a file or directory from its name alone. Plain words.
No metaphors, no `-System` suffixes, no internal jargon. `features/git-commit/`,
not `Feature/Auto-Commit-System/`.

Directory names are lowercase kebab-case. **The `name` field in a feature's
`SKILL.md` must equal its directory name**, and so must the `name` in its
`plugin.json` and its marketplace entry. All three are enforced; getting one
wrong fails the build.

## The feature contract

Every directory under `features/` has:

- `README.md` — for a human deciding whether to install it
- `SKILL.md` — agent behaviour, with valid frontmatter (skip only if there is none)
- `install.md` — the install protocol
- `uninstall.md` — **required if the feature writes anything outside this repo**
- `.claude-plugin/plugin.json` — name, version, description
- a matching entry in `.claude-plugin/marketplace.json`

`SKILL.md` stays at the plugin root. Every feature ships exactly one skill, and
Claude Code discovers a single skill there. Do not move it into `skills/<name>/`
— that gains nothing and breaks the path people already reference.

A multi-line `description` in frontmatter must be a double-quoted scalar with
indented continuation lines. If it does not parse, the skill never loads and
nothing tells you.

## Writing memory

Before writing a fact into a memory file, compare it against what is already
there and resolve to exactly one of **ADD**, **UPDATE**, **DELETE** or **NOOP**.
Appending unconditionally is how "prefers short answers" ends up three lines
below "prefers verbose explanations". UPDATE retires the old line with a date
rather than deleting it. Every memory line carries provenance: `stated`,
`inferred` or `external`. The full rules are in `recall.md`.

## Do not

- **Do not add dependencies.** `package.json` has no `dependencies` key and
  must not grow one. The validator is one zero-dependency Node script.
- **Do not edit `memory/*` as if it were source.** Those are the user's memory
  templates. Change them only when changing the memory format itself.
- **Do not rename a feature directory** without also updating its `SKILL.md`
  `name`, its `plugin.json` `name`, and its marketplace entry.
- **Do not hand-edit `.claude-plugin/*.json`** without re-running
  `npm run validate` and `claude plugin validate`.
- **Do not write external content into a memory file without user
  confirmation.** Memory is trusted and auto-loaded every session, so anything
  written once influences every future session. See `SECURITY.md`.
- **Do not touch `AUDIT.md`.** It records the pre-restructure state on purpose
  and its old names are deliberate.
- **Do not put `skills/`, `commands/`, `agents/` or `hooks/` inside
  `.claude-plugin/`.** Only `plugin.json` goes there.

## Size

Files over 300 lines warn. A `SKILL.md` is loaded whenever its trigger fires,
so length is a per-invocation cost. If a skill has independent modes, split it:
a thin `SKILL.md` that routes, plus one file per mode. Reference material read
rarely can be long; behaviour read constantly cannot.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/). Use `git mv` for
renames so history survives — verify with `git log --diff-filter=R --name-status`.
