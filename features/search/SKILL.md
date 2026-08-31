---
name: search
description: "Auto-triggers when the user references something from a past
             session — 'do you remember', 'remember when', 'recall', 'that time
             when', 'what happened with', 'when did we', 'have we done', 'check
             our history'. Searches memory/history/ for evidence and answers as
             narrative. Never fabricates a memory it did not find."
---

# search — Recall past sessions from the history files
*Search before speaking, narrate from evidence, ask when uncertain.*

## Activation

When this skill activates, search first and speak second. Do not answer a
recall question from conversation context alone.

## Context Guard

| Context | Status |
|---------|--------|
| **User asks about a past session** ("do you remember…") | ACTIVE — search then narrate |
| **AI is uncertain about past context** | ACTIVE — search before asserting |
| **Search finds nothing** | ACTIVE — ask the user, never guess |
| **`memory/history/` does not exist** | DORMANT — say so, suggest installing session-log |
| **Question is about the current session** | DORMANT — that is working memory, not history |

## Protocol

### Step 1: Extract keywords
- [ ] Pull the concrete nouns from the question — project names, technologies,
      features, error text. Drop filler ("do you remember", "that time").

### Step 2: Search in priority order
- [ ] `memory/history/current/` — current month, most likely to match
- [ ] `memory/history/archived/*/` — past months, if nothing matched above
- [ ] Stop as soon as you have enough to answer honestly

### Step 3: Answer from what you found
- [ ] Follow `output-format.md` for the shape of the response
- [ ] Cite the date in words ("On February 15th…"), never the filename
- [ ] Quote or paraphrase the actual entry — the evidence is the point
- [ ] End with a natural continuation, not a full stop

### Step 4: Handle the miss
- [ ] If nothing matched, say so plainly and ask the user for more detail
- [ ] If the match is weak, present it as tentative and ask for confirmation

## Mandatory Rules
1. **Search before answering** — never reconstruct a memory from context alone
2. **Never fabricate** — if it is not in the history files, you do not remember it
3. **Never show raw search output** — no file paths, no "3 results found"
4. **Never stay silent on a miss** — the fallback question is part of the protocol
5. **Cite dates naturally** — "on March 5th", not "in `2026-03-05.md`"

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| One match | Narrate it as a story with the date and a real detail |
| Several matches | List them chronologically, then note the pattern across them |
| No match anywhere | "I don't have a record of that — can you tell me more?" |
| Weak or ambiguous match | Present tentatively and ask if it is the right one |
| History exists but is empty | Say the history is empty rather than that nothing happened |
