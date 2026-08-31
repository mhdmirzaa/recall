---
name: inject-mood
description: "MUST use when the user says 'Load inject-mood' or 'uninstall
             inject-mood', and for the three runtime commands it installs:
             'add mood' / 'register mood' / 'new mood', 'set mood' /
             'switch mood' / 'change mood', 'feel <name>', and 'list moods' /
             'show moods' / 'what moods' / 'available moods'. Injects
             `MOOD: <description>` into every prompt. Requires hook-user-prompt."
---

# inject-mood — Put the current mood in every prompt
*A registry in memory, one line in every prompt.*

## Activation

Requires the **hook-user-prompt** framework. If it is not installed, install
that first — this feature only drops an injector script into its directory.

## Context Guard

| Context | Status |
|---------|--------|
| **User says "Load inject-mood"** | ACTIVE — run `install.md` |
| **User says "uninstall inject-mood"** | ACTIVE — run `uninstall.md` |
| **User says "add/set/list mood"** | ACTIVE — run the command from `commands.md` |
| **AI senses a genuine mood shift** | ACTIVE — may auto-set, but must announce it |
| **hook-user-prompt not installed** | DORMANT — say so and offer to install it |

## Protocol

### Install
- [ ] Verify `~/.claude/hooks/user-prompt-injectors/` exists (framework installed)
- [ ] Detect the OS, copy `injectors/mood.ps1.template` or `.sh.template` in
- [ ] Create the `## Moods` registry table in the memory file
- [ ] Seed a starting mood and write it to `mood-current.txt`

### Runtime commands
Full behaviour is in `commands.md`. All three read the memory file, detected
once as `memory/merged.md` if it exists, otherwise `memory/identity.md`.

| Command | Effect |
|---------|--------|
| `add mood <name>: <description>` | Append a row to the `## Moods` table |
| `set mood <name>` | Write that row's **description** to `mood-current.txt` |
| `list moods` | Show the registry table and the active mood |

### Uninstall
- [ ] Remove the injector script from the injectors directory
- [ ] Leave the `## Moods` registry in memory unless the user asks to remove it

## Mandatory Rules
1. **Write the description, not the name**, to `mood-current.txt` — the injector
   emits it verbatim so the AI sees the full context
2. **Only set moods that exist in the registry** — add first, then set
3. **Announce every auto-switch** — silent changes are confusing
4. **Do not switch on every message** — only on a genuine shift
5. **Never edit the framework's master hook** — this feature owns one file

## Security note

The injector script runs on every message you send and its output is prepended
to your prompt. Treat the registry in your memory file as trusted input: text
placed there reaches the model on every turn. See
[SECURITY.md](../../SECURITY.md).

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| `## Moods` section missing | Say the injector may not be installed; offer "Load inject-mood" |
| `mood-current.txt` missing on set | Create it |
| Name not found in registry | Suggest the closest match and list what exists |
| Duplicate rows with the same name | Use the first and warn about the duplicate |
