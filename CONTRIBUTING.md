# Contributing to Recall

Recall is a markdown project. There is no runtime, no build step and no
dependencies — the "system" is a set of `.md` files an AI agent reads at the
start of a session and writes back to. Contributions are almost always prose.

That makes one thing matter more than usual: **a reader should understand what a
file or directory does from its name alone.** Plain words. No metaphors, no
jargon, no `-System` suffixes. `features/git-commit/install.md` — not
`Feature/Auto-Commit-System/install-auto-commit.md`.

---

## The feature contract

Every directory under `features/` must contain:

| File | Required | Purpose |
|------|----------|---------|
| `README.md` | always | What the feature does, why, and what it needs. Written for a human deciding whether to install it. |
| `SKILL.md` | if it has agent behaviour | The instructions the agent follows. Must have valid frontmatter. |
| `install.md` | if it changes anything | The step-by-step install protocol. |
| `uninstall.md` | **if it writes outside the repository** | How to fully reverse the install. |

The uninstall requirement is not optional and the validator enforces it. Any
feature whose name contains `hook` or `inject` writes into the user's
`~/.claude/` directory, and a feature that edits someone's machine without
shipping a way to undo it will not be merged.

Directory names are lowercase kebab-case. The `name` field in `SKILL.md` must
match the directory name exactly — this is the single rule most contributions
get wrong, and the validator fails the build on it.

### Writing SKILL.md

```markdown
---
name: my-feature
description: "MUST use when the user says 'phrase one', 'phrase two', or when
             <contextual condition>. Also triggers on 'alternative phrase'."
---

# my-feature — One-line title
*Tagline.*

## Activation
What the agent outputs when the skill fires.

## Context Guard
| Context | Status |
|---------|--------|
| **Trigger context** | ACTIVE — full protocol |
| **Non-trigger context** | DORMANT — do not activate |

## Protocol
### Step 1: First action
- [ ] Sub-task

## Mandatory Rules
1. Something the skill must always do.
2. Something it must never do.

## Edge Cases
| Situation | Behavior |
|-----------|----------|
| Edge case | How to handle it |
```

Two notes on the frontmatter, because both are load-bearing:

- **`description` is how the agent decides to fire the skill.** Write it from
  the trigger phrases a user would actually type. Do not describe the feature in
  the abstract — list the words.
- **A multi-line `description` must be a double-quoted scalar**, with
  continuation lines indented. An unquoted multi-line value will not parse, and
  a skill whose frontmatter does not parse never loads at all — silently.

The **Context Guard** table is worth the space. A skill that fires when it
should not is worse than one that never fires, and the DORMANT rows are what
prevent it.

---

## Testing locally

```bash
npm run validate
```

Zero dependencies — it is one Node script, so there is nothing to install
first. It checks the feature contract, frontmatter parsing, name/directory
agreement, duplicate skill names, broken relative links, unreplaced template
placeholders, and file size against the context budget. Errors fail; warnings
do not.

To test a feature end to end, install it into a real memory directory the way a
user would and run its trigger phrase. For anything that writes outside the
repository, **run the uninstall protocol too** and confirm it leaves no trace.

Marketplace manifests are checked separately:

```bash
claude plugin validate .
```

---

## Size and the context budget

Files over 300 lines produce a warning. This is not style — an always-loaded
file costs context on every single request, and a `SKILL.md` is pulled in
whenever its trigger fires. If a skill has independent modes, split them: a
thin `SKILL.md` that routes, plus one file per mode loaded on demand.

Reference material that is read rarely (format templates, library entries) can
be long. Behaviour that is read constantly should not be.

---

## Commits

[Conventional Commits](https://www.conventionalcommits.org/). The type prefix is
what generates the changelog, so pick it deliberately:

```
feat:     a new feature or capability
fix:      a bug fix — including docs that were factually wrong
docs:     documentation that was merely incomplete
refactor: renames and restructuring with no behaviour change
chore:    tooling, CI, licensing, repo furniture
```

Write the body for someone reading `git log` in a year with no memory of the
discussion. Say what changed and why it needed changing.

---

## Pull requests

Before opening one:

- [ ] `npm run validate` exits clean
- [ ] `claude plugin validate .` passes, if you touched a plugin or the marketplace
- [ ] Your feature has a README, and an uninstall protocol if it writes outside the repo
- [ ] `SKILL.md` `name` matches the directory name
- [ ] You installed and uninstalled the feature yourself at least once
- [ ] Commits follow Conventional Commits

Small PRs get reviewed. A rename plus a new feature plus a docs rewrite in one
branch does not.

---

## Security

Memory files are trusted and auto-loaded every session, so a line written into
one persists indefinitely and influences behaviour long after the session that
wrote it. If your feature ingests external content — fetched pages, imported
library entries, API responses — read [SECURITY.md](SECURITY.md) before you
design the write path. External content must be confirmed by the user before it
reaches a memory file.
