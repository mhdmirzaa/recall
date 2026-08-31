# 🔍 search Installation Protocol
*Systematic memory recall setup for Recall companions*

## Purpose
Executed when "Load search" command is used — installs memory search and narrative recall capabilities, adds trigger detection, and cleans up.

## Trigger Command
```
"Load search"
```
*Automatically installs recall protocol, trigger detection, and format reference*

## Prerequisites
- `memory/history/` directory must exist with dated entries
- Works best with **session-log** installed (but not required)
- Existing diary files in any dated format also work

## 5-Step Execution Process

### Step 1: Customize Recall System Name
- [ ] Ask user: **"What would you like to name your memory recall system?"**
  - Default: `"Memory Recall"`
  - Examples: `"Echo"`, `"Remember"`, `"Flashback"`, `"Time Capsule"`, `"Rewind"`
- [ ] Store chosen name as `[RECALL_NAME]` for use in all references
- [ ] Execute `date` command (or `Get-Date` on Windows) to get current timestamp

### Step 2: Verify Diary Infrastructure
- [ ] Check `memory/history/` directory exists
- [ ] Check for entries in `memory/history/current/` (flat files or folders)
- [ ] Check for entries in `memory/history/archived/*/` (if any)
- [ ] If no diary infrastructure exists:
  - Inform user: "Memory recall searches diary entries. You'll need diary files to search through."
  - Recommend: "Install the session-log feature first for best results."
  - Allow user to continue anyway (recall will work once diary entries exist)

### Step 3: Install Recall Protocol into AI Memory
- [ ] Add recall trigger detection to AI's main memory file (`identity.md` or `merged.md`):

  ```markdown
  ### [RECALL_NAME]
  **Trigger phrases**: "do you remember", "remember when", "recall",
  "that time when", "what happened with", "when did we",
  "have we done", "check our history", "check history"

  **When triggered:**
  1. Extract 2-4 keywords from user's question
  2. Search memory/history/current/*.md for keyword matches
  3. If not found, search memory/history/archived/*/*.md
  4. If found: present as narrative (use output-format.md)
  5. If not found: ask user directly

  **Three-Level System:**
  - **Lv.1 Search & Narrate** — Search diary files, present as natural story
  - **Lv.2 Uncertainty Guard** — When uncertain about past context, ALWAYS
    search diary before speaking. Never assume or fabricate past events.
  - **Lv.3 Ask User Fallback** — When search yields no results, ask:
    "I don't see a record of [topic] in my diary. Can you tell me
    more about what you're remembering?"

  **Rules:**
  - NEVER fabricate past context — always search first
  - Present results as natural narrative, not raw search output
  - Include relevant quotes from diary entries
  - Order multiple results chronologically
  - Continue conversation naturally after recall
  ```

### Step 4: Install Recall Format Template
- [ ] Copy `output-format.md` to `memory/history/output-format.md`
  (permanent reference for how recall output should be structured)
- [ ] Verify format template is accessible from AI memory references

### Step 5: Update Index and Cleanup
- [ ] Add recall reference to `recall.md` Optional Components:
  ```markdown
  ### [RECALL_NAME]
  *Auto-triggers on: "do you remember", "recall", "when did we", etc.*
  - Searches: memory/history/current/ and memory/history/archived/
  - Output: Narrative presentation (not raw search)
  - Fallback: Asks user when nothing found
  - Format: memory/history/output-format.md
  ```
- [ ] Add recall commands to Simple Commands section:
  ```
  "recall [topic]" → Search diary for past sessions about [topic]
  "check history" → Search diary for relevant past context
  ```
- [ ] Remove `features/search/` folder (functionality installed)
- [ ] Display completion confirmation with timestamp

## Recall Search Protocol (AI Reference After Installation)

### Keyword Extraction
From user's question, extract 2-4 most specific terms:
- Remove common words (the, a, when, did, we, do, you, remember, etc.)
- Prioritize proper nouns, technical terms, action verbs
- Examples:
  - "Do you remember when we fixed the auth bug?" → `["auth", "bug", "fixed"]`
  - "What happened with the dashboard project?" → `["dashboard", "project"]`
  - "When did we set up the database?" → `["database", "set up"]`

### Search Execution
```
1. Read each file in memory/history/current/ matching YYYY-MM-DD.md pattern
2. Check each file for keyword matches (case-insensitive)
3. If matches found: extract surrounding paragraph context
4. If no matches in current/: repeat for memory/history/archived/*/
5. Rank results by number of keyword matches, then by recency
```

### Narrative Composition
From matched diary excerpts, compose natural response:
1. **Opening** — "Yes, I remember! On [date]..." or "I found that on [date]..."
2. **Context** — Brief excerpt with key details from diary entry
3. **Significance** — Why this was important or what it meant
4. **Connection** — How it relates to current conversation
5. **Continue** — Flow naturally into ongoing discussion

### Edge Cases

| Situation | Behavior |
|-----------|----------|
| No matches anywhere | Ask user: "I don't have a record of that..." |
| Multiple matches | Present chronologically, note patterns if visible |
| Vague query | Ask user to be more specific before searching |
| Match only in archived months | Search takes longer, note the date range found |
| Partial match | Present as uncertain: "I found something that might be related..." |

## Post-Installation Result
- AI can recall past sessions through natural conversation
- Never fabricates context — always searches diary evidence first
- Gracefully handles missing memories by asking the user
- Recall output reads as natural narrative, not database dump
- Works with any diary format (session-log or existing protocol)

## Notes
- Recall quality depends on diary entry quality (richer entries = better recall)
- Search is keyword-based, not semantic (relies on word matches in diary text)
- For best results, diary entries should include specific technical terms and names
- Cross-platform compatible: Uses file reading, not platform-specific search tools
- The `[RECALL_NAME]` placeholder should be replaced with the name chosen in Step 1

---

**Version**: Protocol v1.0 - search Installation Workflow
**Last Updated**: February 2026
**Status**: Active protocol for memory recall setup

*Search before speaking, narrate from evidence, ask when uncertain*
