---
name: hook-user-prompt
description: "MUST use when the user says 'Load hook-user-prompt', 'install
             user prompt hook', or 'uninstall hook-user-prompt'. Installs one
             UserPromptSubmit master hook into ~/.claude/settings.json that runs
             every script in the injectors directory and prepends their combined
             output to each prompt. This is the framework the inject-tone,
             inject-mood and inject-time features plug into."
---

# hook-user-prompt — One hook, many injectors
*Install the framework once; layer injectors on top.*

## Activation

This skill writes into the user's `~/.claude/` directory. Confirm before every
write and never modify `settings.json` without a backup.

## Context Guard

| Context | Status |
|---------|--------|
| **User says "Load hook-user-prompt"** | ACTIVE — run `install.md` |
| **User says "uninstall hook-user-prompt"** | ACTIVE — run `uninstall.md` |
| **An inject-* feature is being installed and the framework is missing** | ACTIVE — install this first |
| **User asks what is being injected** | ACTIVE — list the injectors directory |
| **Anything else** | DORMANT |

## Protocol

`install.md` and `uninstall.md` are authoritative. In outline:

### Install
- [ ] Detect the OS and pick `master-hook/user-prompt-hook.ps1.template` or `.sh.template`
- [ ] Write the master script to `~/.claude/hooks/user-prompt-hook.{ps1|sh}`
- [ ] Create the empty injectors directory `~/.claude/hooks/user-prompt-injectors/`
- [ ] **Back up** `~/.claude/settings.json` before touching it
- [ ] Merge a single `UserPromptSubmit` entry in, preserving existing hooks
- [ ] Record the install in `recall.md`

### What the master script does on every prompt
1. Drain stdin (required by the hook protocol)
2. Enumerate the injectors directory
3. Run each injector, collecting stdout
4. Join the outputs with newlines
5. Emit the result, which is prepended to the prompt context

Failure in one injector is caught so the others still run.

### Uninstall
- [ ] Remove the `UserPromptSubmit` entry from `settings.json`
- [ ] Delete the master script; ask before deleting installed injectors

## Mandatory Rules
1. **Back up `settings.json` before every modification**
2. **One entry only** — the whole point is a single hook for N injectors
3. **Fail-isolated** — a broken injector must never block the prompt
4. **Never install silently**
5. **Injectors are separate features** — this skill installs the framework, not behaviours

## Security note

Every script in `~/.claude/hooks/user-prompt-injectors/` runs on **every**
message you send, and its output is prepended to your prompt. Anything that can
write into that directory can influence the AI on every turn. Only install
injectors you have read. See [SECURITY.md](../../SECURITY.md).

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Framework already installed | Report it; do not add a second entry |
| Injectors directory missing at runtime | Master emits nothing and exits cleanly |
| An injector hangs | Master must not block the prompt indefinitely |
| Uninstall with injectors still present | Ask whether to remove them too |
