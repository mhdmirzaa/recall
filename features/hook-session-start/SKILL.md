---
name: hook-session-start
description: "MUST use when the user says 'Load hook-session-start', 'install
             auto-load hook', or 'uninstall hook-session-start'. Installs a
             SessionStart hook into ~/.claude/settings.json so memory loads the
             moment Claude Code opens, without the user typing the AI's name.
             Writes outside the repository, so it backs up settings.json first
             and ships a full uninstall path."
---

# hook-session-start — Load memory automatically at startup
*One step instead of two.*

## Activation

This skill writes into the user's `~/.claude/` directory. Confirm before every
write and never modify `settings.json` without a backup.

## Context Guard

| Context | Status |
|---------|--------|
| **User says "Load hook-session-start"** | ACTIVE — run `install.md` |
| **User says "uninstall hook-session-start"** | ACTIVE — run `uninstall.md` |
| **User asks whether auto-load is installed** | ACTIVE — inspect settings.json and report |
| **Anything else** | DORMANT — never touch settings.json unprompted |

## Protocol

`install.md` and `uninstall.md` are authoritative. In outline:

### Install
- [ ] Detect the AI's name from `memory/merged.md`, else `memory/identity.md`
- [ ] Confirm the detected name with the user, or take their override
- [ ] Detect the OS and pick `hooks/session-start.ps1.template` or `.sh.template`
- [ ] Generate `~/.claude/hooks/<ai-name>-session-start.{ps1|sh}` with the name
      and memory path baked in
- [ ] **Back up** `~/.claude/settings.json` to `settings.json.backup-pre-autoload`
- [ ] Merge the `SessionStart` entry in, preserving every existing hook
- [ ] Record the install in `recall.md` so the uninstall path is findable later

### Uninstall
- [ ] Remove only this AI's `SessionStart` entry, leaving other hooks intact
- [ ] Delete the generated hook script
- [ ] Leave the backup in place

## Mandatory Rules
1. **Back up `settings.json` before every modification** — no exceptions
2. **Merge, never overwrite** — other hooks in settings.json must survive
3. **Confirm the AI name** with the user before baking it into a script
4. **Never install silently** — this changes behaviour outside the repository
5. **The feature folder stays** after install, so other tools can read the protocol

## Security note

This feature writes an executable script into `~/.claude/hooks/` and edits
`~/.claude/settings.json`. That script runs automatically at every Claude Code
startup. Read the generated script before installing, keep the backup, and see
[SECURITY.md](../../SECURITY.md).

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| `settings.json` does not exist | Create it with only this hook entry |
| `settings.json` is malformed | Stop, report, change nothing |
| A SessionStart hook already exists | Merge alongside it; never replace |
| Two AIs auto-load | Uninstall removes only the named one |
