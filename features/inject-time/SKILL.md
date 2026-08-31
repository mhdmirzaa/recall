---
name: inject-time
description: "MUST use when the user says 'Load inject-time' or 'uninstall
             inject-time'. Installs an injector that adds `<timestamp> |
             <PERIOD>` to every prompt, and prepends `TIME PERIOD CHANGED: <FROM>
             to <TO> |` on the first prompt after the day register flips. Period
             boundaries are chosen at install time. Requires hook-user-prompt.
             Set-and-forget — it has no add/set/list commands."
---

# inject-time — Put the clock in every prompt
*The AI stops guessing what time it is.*

## Activation

Requires the **hook-user-prompt** framework. If it is not installed, install
that first — this feature only drops an injector script into its directory.

## Context Guard

| Context | Status |
|---------|--------|
| **User says "Load inject-time"** | ACTIVE — run `install.md` (asks for boundaries) |
| **User says "uninstall inject-time"** | ACTIVE — run `uninstall.md` |
| **User wants different period boundaries** | ACTIVE — re-run install, regenerating the script |
| **hook-user-prompt not installed** | DORMANT — say so and offer to install it |
| **Anything else** | DORMANT — there are no runtime commands |

## Protocol

### Install
- [ ] Verify `~/.claude/hooks/user-prompt-injectors/` exists (framework installed)
- [ ] Ask for the four period boundaries; defaults are 6 / 12 / 18 / 22
- [ ] Detect the OS, copy `injectors/time.ps1.template` or `.sh.template` in,
      baking the chosen boundaries into the script
- [ ] The script keeps its state in `~/.claude/user-prompt-injectors/time-period-last.txt`

### What the injector emits

Steady state:

```
Tuesday, April 28, 2026 12:43 PM | AFTERNOON
```

On a transition:

```
TIME PERIOD CHANGED: MORNING to AFTERNOON | Tuesday, April 28, 2026 12:00 PM | AFTERNOON
```

The `TIME PERIOD CHANGED:` prefix is a one-shot signal. Any personality or
memory feature that wants to react to the flip can detect that string.

### Uninstall
- [ ] Remove the injector script
- [ ] Remove the period state file

## Mandatory Rules
1. **Boundaries are chosen at install** — changing them means re-running install
2. **Emit one line** — the framework joins injector outputs; do not emit blocks
3. **Local computation only** — no network, no filesystem walks; this runs on every prompt
4. **The transition signal fires once** per flip, not on every prompt afterwards

## Security note

This injector runs on every message you send and its output is prepended to
your prompt. It is pure local clock arithmetic and reads no user content, but it
is still an executable script in your hooks directory. See
[SECURITY.md](../../SECURITY.md).

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| State file missing | Treat the current period as unchanged; write the file |
| Clock crosses two boundaries between prompts | Report the flip from last known to current |
| Boundaries overlap or are out of order | Reject at install time and re-ask |
| System clock unavailable | Emit nothing rather than a wrong timestamp |
