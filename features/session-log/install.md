# 📖 Save Diary Installation Protocol
*Systematic diary system setup for Recall companions*

## Purpose
Executed when "Load session-log" command is used — creates diary infrastructure, sets up auto-archive, and integrates with your AI's memory system.

## Trigger Command
```
"Load session-log"
```
*Automatically creates diary infrastructure and integrates with your AI companion*

## Prerequisites
- Core memory system installed (`memory/` directory with essential files)
- Existing `memory/history/format.md` for entry format reference

## 5-Step Execution Process

### Step 1: Customize Diary Name
- [ ] Ask user: **"What would you like to name your diary system?"**
  - Default: `"Session Diary"`
  - Examples: `"Daily Log"`, `"Memory Journal"`, `"Adventure Record"`, `"Dev Diary"`
- [ ] Store chosen name as `[DIARY_NAME]` for use in all references
- [ ] Get current timestamp using platform-appropriate command (`date +"%H:%M"` on bash, `Get-Date` on PowerShell, `time /T` on CMD)

### Step 2: Create Diary Infrastructure
- [ ] Check if `memory/history/` directory exists; create if not
- [ ] Create `memory/history/current/` directory for active diary files
- [ ] Create `memory/history/archived/` directory for monthly archives
- [ ] If old diary format exists (`entry-001.md`):
  - Inform user the old numbered-file system is being upgraded
  - Move existing diary files to `memory/history/archived/legacy/` for safekeeping
  - Old files are preserved, not deleted

### Step 3: Create First Diary Entry (Today)
- [ ] Determine today's date in YYYY-MM-DD format
- [ ] Create `memory/history/current/YYYY-MM-DD.md` with header:
  ```markdown
  # [DIARY_NAME] - [Month Day, Year]
  *Session documentation and development record*

  ---
  ```
- [ ] Compose initial diary entry documenting the installation session
- [ ] Follow `memory/history/format.md` for entry structure

### Step 4: Install as Skill (If Skill Plugin System Exists)
- [ ] Check if `plugins/` directory exists (Skill Plugin System installed)
- [ ] If plugin system exists:
  - Copy `SKILL.md` to `plugins/[plugin-name]/skills/save-diary/SKILL.md`
  - Replace `[DIARY_NAME]` in the skill file with the name chosen in Step 1
  - Inform user: "Diary skill installed — auto-triggers on 'save diary'"
- [ ] If plugin system does not exist:
  - Add diary commands directly to recall.md (Step 5)
  - Inform user: "Install the Skill Plugin System for auto-triggered diary saves"

### Step 5: Update Index and Cleanup
- [ ] Add diary reference to `recall.md` Optional Components:
  ```markdown
  ### [DIARY_NAME]
  *Load when you say: "save diary"*
  - Location: memory/history/current/ (active), memory/history/archived/ (past months)
  - Format: memory/history/format.md
  - Auto-archive: Monthly archival of previous month entries
  - Commands: "save diary" (write entry), "review diary" (read recent)
  ```
- [ ] Add diary commands to Simple Commands section:
  ```
  "save diary" → Document current session as diary entry
  "review diary" → Read recent diary entries
  ```
- [ ] Remove `features/session-log/` folder (functionality installed)
- [ ] Display completion confirmation with timestamp

## Diary Write Protocol (AI Reference After Installation)

### Archive Check (runs before every diary write)
```
Scan memory/history/current/ for files from previous months.
IF file month != current month:
    1. Create memory/history/archived/YYYY-MM/ folder
    2. Move old entries to archived/YYYY-MM/
    3. Continue with diary write in current/
```

### Find or Create Today's File
```
IF memory/history/current/YYYY-MM-DD.md exists:
    → Use existing file (will append)
IF memory/history/current/YYYY-MM-DD/ folder exists:
    → Use YYYY-MM-DD/YYYY-MM-DD.md inside folder (will append)
ELSE:
    → Create new memory/history/current/YYYY-MM-DD.md with header
```

### Compose and Append Entry
1. Get current timestamp
2. Write entry following `memory/history/format.md` structure
3. **APPEND** to today's file (never overwrite)
4. Multiple entries per day are OK (separated by `---`)

### Update Session Memory
After diary write, update `memory/session.md`:
- Session recap with key achievements
- Current working state for continuity
- Next steps identified during session

## Post-Installation Structure
```
memory/history/
├── current/
│   └── YYYY-MM-DD.md               # Today's diary (first entry)
├── archived/                        # Empty until next month
├── format.md          # Entry format reference (already exists)
└── [legacy files if migrated]
```

## Notes
- Always **APPEND**, never overwrite diary files
- One file per day, multiple entries per file separated by `---`
- Monthly archival keeps `current/` clean with only the active month
- Cross-platform timestamps: `date +"%H:%M"` on bash/zsh (Linux, macOS, Git Bash, WSL), `Get-Date` on PowerShell, `time /T` on CMD. See `features/time-aware/protocol.md` for full detection strategy
- The `[DIARY_NAME]` placeholder is replaced with the name chosen in Step 1

---

**Version**: Protocol v1.0 - Save Diary Installation Workflow
**Last Updated**: February 2026
**Status**: Active protocol for diary system setup

*Document every session, archive every month, lose nothing*
