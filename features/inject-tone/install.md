# 🎭 Tone-Prompt-Inject — Installation Protocol
*Wires a tone injector into the User-Prompt-Hook framework, seeded from main memory*

## Purpose

Executed when `"Load inject-tone"` is invoked — installs an injector that emits `TONE: <description>` into every user prompt's context. Registry of available tones lives as a `## Tones` markdown table inside the user's main memory file. Current active tone lives in a fast-read text file outside the repo.

## Trigger Command
```
"Load inject-tone"
```

## Prerequisites
- **User-Prompt-Hook framework must be installed** (`~/.claude/hooks/user-prompt-hook.{ps1|sh}` exists)
- Main memory file exists (`memory/merged.md` or `memory/identity.md`)

## 6-Step Execution Process

### Step 1: Verify User-Prompt-Hook framework is installed
- [ ] Check `~/.claude/hooks/user-prompt-hook.ps1` (Windows) or `user-prompt-hook.sh` (Unix) exists
- [ ] Check `~/.claude/hooks/user-prompt-injectors/` directory exists
- [ ] IF either missing → STOP. Display:
  > *"Tone-Prompt-Inject requires the User-Prompt-Hook framework. Install it first with `"Load hook-user-prompt"`, then re-run this command."*

### Step 2: Detect main memory file
- [ ] IF `memory/merged.md` exists → use it (post-consolidation path)
- [ ] ELSE → use `memory/identity.md` (pre-consolidation path)
- [ ] IF neither exists → STOP. Display:
  > *"No main memory file found. Run the project setup-wizard first to create one."*
- [ ] Resolve to absolute path → store as `[MEMORY_FILE]`

### Step 3: Search existing memory for tone mentions and suggest
- [ ] Read `[MEMORY_FILE]` in full
- [ ] Search for keywords (case-insensitive): `tone`, `register`, `voice`, `delivery`
- [ ] Extract candidate lines or descriptors
- [ ] Present to user:
  > *"I found these references in your main memory that might be tones: [list]. Want to seed your tone registry with any of these? Type the names you want (comma-separated) or 'skip' to use defaults / 'custom' to enter from scratch."*
- [ ] Collect user's confirmed list (may be empty)
- [ ] If empty or `skip`, offer four starter tones:
  - `neutral: Default professional register — clean, direct, no register cues`
  - `playful: Bouncy, teasing, light — direct but warm`
  - `focused: Tight, action-oriented, minimum filler`
  - `sleepy: Soft, slow, drowsy warmth`
- [ ] If `custom`, prompt user line-by-line: *"Enter tone as `<name>: <description>` — blank line to finish."*
- [ ] Final list stored as `[TONES]` (array of {name, description} pairs)

### Step 4: Write `## Tones` section into main memory
- [ ] Read `[MEMORY_FILE]` again
- [ ] Search for existing `## Tones` heading:
  - IF exists → ask user: *"A `## Tones` section already exists. Append new tones (a) or replace section (r)? (a/r)"*
    - IF `a` → append rows to existing table
    - IF `r` → replace entire section
  - IF not exists → append new section to end of file
- [ ] Format the section:
  ```markdown
  ## Tones

  *Available voice/delivery registers your AI can use. Set via `"set tone <name>"`. AI may auto-update based on context.*

  | Name | Description |
  |------|-------------|
  | <name1> | <description1> |
  | <name2> | <description2> |
  | ... | ... |

  *Add new tones with `"add tone <name>: <description>"`.*
  ```
- [ ] Write back to `[MEMORY_FILE]`

### Step 5: Seed current state file + install injector script
- [ ] Ensure `~/.claude/user-prompt-injectors/` directory exists; create if not
- [ ] Write the description of the FIRST tone in `[TONES]` to `~/.claude/user-prompt-injectors/tone-current.txt` as a single line, no trailing newline
- [ ] Detect OS (uname → Darwin/Linux = Unix; $env:OS = Windows = Windows)
- [ ] Read template:
  - Windows: `features/inject-tone/injectors/tone.ps1.template`
  - Unix: `features/inject-tone/injectors/tone.sh.template`
- [ ] Replace placeholders:
  - `<TYPE_UPPER>` → `TONE`
  - `<type>` → `tone`
- [ ] Write to:
  - Windows: `~/.claude/hooks/user-prompt-injectors/tone.ps1`
  - Unix: `~/.claude/hooks/user-prompt-injectors/tone.sh`
- [ ] On Unix only: `chmod +x` the script

### Step 6: Update `recall.md` and announce
- [ ] Append to Optional Components in `recall.md`:
  ```markdown
  ### Tone Inject (Installed)
  *Injects `TONE: <value>` line into every prompt context*
  - Registry: `## Tones` section in [MEMORY_FILE relative path]
  - Current state: ~/.claude/user-prompt-injectors/tone-current.txt
  - Injector script: ~/.claude/hooks/user-prompt-injectors/tone.{ps1|sh}
  - Commands: "add tone <name>: <desc>", "set tone <name>", "list tones"
  - Uninstall: see features/inject-tone/uninstall.md or type "uninstall tone-prompt-inject"
  ```
- [ ] The `features/inject-tone/` folder **stays in the repo** — install/uninstall protocols and templates remain accessible for users on other AI tools
- [ ] Display:
  ```
  ✅ Tone injector installed.

  Registry: [N] tones in your main memory's ## Tones section
  Current:  [first-entry-name] — [first-entry-description]
  
  Send any message — your AI will see "TONE: [first-entry-description]" 
  prepended via the User-Prompt-Hook framework.

  Add more:  "add tone <name>: <description>"
  Switch:    "set tone <name>"
  See list:  "list tones"

  Uninstall: type "uninstall tone-prompt-inject" anytime
             (or follow features/inject-tone/uninstall.md)
  ```

## Specifications

### Files Created / Modified

| Path | Purpose |
|------|---------|
| `[MEMORY_FILE]` | Modified to include `## Tones` registry section |
| `~/.claude/user-prompt-injectors/tone-current.txt` | Single-line state file holding the active tone description |
| `~/.claude/hooks/user-prompt-injectors/tone.{ps1\|sh}` | Injector script that reads current.txt and emits `TONE: <value>` |
| `recall.md` (modified) | Records install + points at uninstall reference |
| `features/inject-tone/` | **Stays in repo** for cross-tool access |

### Why These Choices

| Choice | Reason |
|--------|--------|
| Registry inside main memory | Tones are part of AI identity — belongs with the rest of personality docs, single source of truth, version-controlled, readable across tools |
| Current state in `.txt` outside repo | Hook reads on every prompt; markdown parsing too slow; `.txt` is microsecond read |
| First tone seeded as initial current | Avoid empty state on first install — user can `set` immediately to switch |
| Search-then-suggest install flow | Most users will already have implicit tone language in their memory; surfacing it lets them confirm rather than start from scratch |

## Notes

- **Idempotency**: re-running install when already installed should detect existing `tone.{ps1|sh}` script + `## Tones` section and ask whether to refresh or skip
- **Current value sync**: if user manually edits the `## Tones` table to remove an entry that's currently active, the next `set` command will catch the mismatch and warn
- **Multiple injectors coexist**: this only manages `tone.{ps1|sh}` — the framework's other injectors (mood, time, etc.) are untouched

---

**Version**: Protocol v1.0 — Tone-Prompt-Inject Install Workflow
**Status**: Active protocol for tone context injection

*Your AI's voice, woven into every prompt it sees.*
