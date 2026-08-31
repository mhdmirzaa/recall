# ⚡ Auto-Load Hook System
*Auto-loads your AI companion on Claude Code startup — no manual name-typing*

## What This Feature Does

Wires a `SessionStart` hook into your Claude Code `~/.claude/settings.json` so that **the moment you open Claude Code, your AI companion's memory loads automatically** — without typing its name first.

- **Auto-fires** on `startup`, `resume`, `clear`, and `compact` lifecycle events
- **Detects your AI's name** from existing memory files, then asks you to confirm or override
- **Cross-platform**: ships both Windows (PowerShell) and Unix (Bash) script templates
- **Safely reversible**: backs up your `settings.json` before any modification — clean uninstall path included
- **Tool-agnostic**: feature folder stays in the repo after install so users on other AI coding tools (Codex, etc.) can read and run the same install/uninstall protocols

## Why Auto-Load?

### Before (Manual Bootstrap)
```
You: claude
Claude Code: Hello! How can I help you today?
You: [ai-name]
Claude: [now loads memory, becomes your AI]
```
**Problem**: Every single session starts with a manual two-step dance. Easy to forget the name. Easy to start working before the AI knows who it's supposed to be.

### After (Auto-Load Hook Installed)
```
You: claude
Claude Code → SessionStart hook fires → injects "You are <ai-name>, read memory now"
Claude: [reads memory file, becomes your AI, greets you immediately]
```
**Benefit**: One step. The AI is already itself the moment you open the terminal.

## Quick Integration
```
"Load hook-session-start"
```

## What Happens During Integration

1. **Detect** your AI's name by scanning `memory/merged.md` (or `memory/identity.md` if pre-consolidation)
2. **Confirm** the detected name with you, or accept your override
3. **Detect OS** — pick the right script template (`.ps1` for Windows, `.sh` for Unix)
4. **Generate** a personalized hook script in `~/.claude/hooks/<ai-name>-session-start.{ps1|sh}` with your AI name and memory path baked in
5. **Backup** your current `~/.claude/settings.json` to `settings.json.backup-pre-autoload`
6. **Merge** the new `SessionStart` entry into `settings.json` (preserving any existing hooks)
7. **Record** the install in `recall.md` Optional Components so the AI knows where to find the uninstall protocol later

## Post-Integration Result

After running the integration protocol:
- Every Claude Code startup auto-loads your AI's full memory
- No need to type the AI's name first — restoration happens before you say a word
- Your `settings.json` is backed up so you can revert anytime
- The Feature folder stays in the repo for cross-tool reference and re-install

## How the Hook Works

The generated script does exactly two things:

**1. Drains stdin** (required by the Claude Code hook protocol):
```powershell
[Console]::In.ReadToEnd() | Out-Null   # PowerShell
```
```bash
cat > /dev/null                         # Bash
```

**2. Writes a context line** that Claude Code injects into the AI's session:
```
AUTOLOAD: You are <ai-name>. Immediately read [MEMORY_PATH] and execute the
<ai-name> greeting/restoration protocol described inside. Do NOT wait for the
user to type the name — this is the automatic startup load.
```

That's it. No simulated typing, no fake user input — just clean context injection that tells Claude to load itself.

## Hook Configuration

Once installed, your `~/.claude/settings.json` will contain (merged into existing config):

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume|clear|compact",
        "hooks": [
          {
            "type": "command",
            "command": "<platform-specific path to hook script>",
            "timeout": 15,
            "async": true
          }
        ]
      }
    ]
  }
}
```

- **`async: true`** — hook runs in background, never freezes Claude Code startup
- **`timeout: 15`** — generous window for memory file reads (default would be too tight)
- **`matcher`** — fires on all four session lifecycle events so the AI re-loads after `/clear` and `/compact` too

## Uninstalling

After install, type:
```
"uninstall hook-session-start"
```

Your AI reads `features/hook-session-start/uninstall.md` and:
1. Restores `settings.json` from backup
2. Deletes the hook script from `~/.claude/hooks/`
3. Removes the install record from `recall.md`

Result: byte-identical revert. Your AI goes back to requiring manual name-typing on startup.

## Compatibility

- **Pre-consolidation**: Works — detects name from `memory/identity.md`, points hook at `recall.md`
- **Post-consolidation**: Works — detects name from `memory/merged.md`, points hook at the unified file
- **Windows**: PowerShell hook, `-ExecutionPolicy Bypass`, no execution-policy setup needed
- **macOS / Linux / Git Bash on Windows**: Bash hook, made executable via `chmod +x`

## Tier

This feature lives in **Tier 1 — Foundation** alongside merge and time-aware. It has no dependencies and can be installed first, last, or anywhere in between.

---

*Type `"Load hook-session-start"` to never type your AI's name on startup again.*

## ⚠️ Security note

This feature writes an executable script into `~/.claude/hooks/` and edits
`~/.claude/settings.json`. That script runs automatically **every time Claude
Code starts**, before you type anything, and its output is injected into the
session.

- Read the generated script before you let it run. It is short — it drains
  stdin and echoes one instruction line.
- The install backs up `settings.json`; keep the backup.
- Anything able to write to `~/.claude/hooks/` can influence every session you
  start. Treat that directory as sensitive.

See [SECURITY.md](../../SECURITY.md).
