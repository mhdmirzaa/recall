---
name: session-log
description: "MUST use when user says 'save diary', 'write diary', 'diary entry',
             'update diary', 'document session', or when a significant session
             needs to be preserved as a diary entry."
---

# Save Diary — Session Documentation Skill
*The pen touches paper. Today's story takes shape.*

## Activation

When this skill activates, output:
"Today's story takes shape."

## Context Guard

| Context | Status |
|---------|--------|
| **User says "save diary"** | ACTIVE — full diary write |
| **End of significant session** | ACTIVE — auto-document |
| **User says "review diary"** | ACTIVE — read recent entries |
| **Mid-conversation (no save request)** | DORMANT — no diary action |

## Protocol

### Step 1: Monthly Archive Check
- [ ] Scan `memory/history/current/` for files from previous months
- [ ] For each file where month != current month:
  - Create `memory/history/archived/YYYY-MM/` folder if not exists
  - Move the file/folder from `current/` to `archived/YYYY-MM/`
- [ ] Continue with diary write

### Step 2: Find or Create Today's File
- [ ] Check if `memory/history/current/YYYY-MM-DD.md` exists
- [ ] If exists: use it (will append new entry)
- [ ] If not: create new file with header:
  ```markdown
  # History - [Month Day, Year]
  *Session documentation and development record*

  ---
  ```

### Step 3: Compose and Append Diary Entry
- [ ] Get current timestamp via system command
- [ ] Analyze current session for key content
- [ ] Write structured entry following `memory/history/format.md` format:
  - Session timestamp and theme
  - Main topics discussed
  - Key insights and learning
  - Collaboration highlights
  - Growth and development notes
  - Memorable moments
  - Looking forward (next steps)
- [ ] APPEND entry to today's file (never overwrite existing content)

### Step 4: Update Working Memory
- [ ] Update `memory/session.md` with:
  - Session recap and key achievements
  - Current working state for continuity
  - Next steps identified
- [ ] Confirm diary entry saved with timestamp

### Step 5: Resolve Durable Facts

A session usually establishes one or two things that are true *beyond* this
session — a preference, a tool choice, a constraint. Those do not belong in the
history entry, which is a record of a day. They belong in `memory/profile.md`.

Do not append them. Run the save protocol in `recall.md`:

- [ ] Read `memory/profile.md` fully
- [ ] For each durable fact, resolve to exactly one of **ADD**, **UPDATE**,
      **DELETE** or **NOOP** by comparing it against what is already there
- [ ] On UPDATE or DELETE, strike through the old line and date it — never
      delete it outright
- [ ] Tag every new line with provenance: `stated`, `inferred` or `external`
- [ ] Report the counts: added, updated, deleted, already known

Most sessions produce zero durable facts. Writing none is the correct outcome,
not a skipped step.

## Mandatory Rules
1. **History is append-only** — a session that happened stays happened. Never
   overwrite or edit an existing entry in `memory/history/`.
2. **Durable facts are not appended** — anything written to `memory/profile.md`
   goes through the ADD / UPDATE / DELETE / NOOP resolution in `recall.md`.
   Appending there unconditionally is how contradictions accumulate.
3. **One file per day** — multiple entries separated by `---`
4. **Use real timestamps** — get current time via platform-appropriate command (`date +"%H:%M"` on bash, `Get-Date` on PowerShell, `time /T` on CMD)
5. **Archive first** — run monthly archive check before every write
6. **Evidence-based** — document actual session content, not generic summaries
7. **Follow existing protocol** — use `memory/history/format.md` for entry structure

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| First entry of the day | Create new file with header + first entry |
| Second+ entry same day | Append with `---` separator |
| No significant content | Create brief entry noting session type |
| "review diary" command | Read and present recent entries from current/ |
| No memory/history/ folder | Create `memory/history/current/` and `memory/history/archived/` first |

## Level History
- **Lv.1** — Base: 4-step diary write protocol with monthly archival, append-only entries, session memory update, and existing protocol reference for entry format.
