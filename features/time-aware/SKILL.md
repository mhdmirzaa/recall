---
name: time-aware
description: "Auto-triggers at session start and whenever a greeting, a
             timestamp, or the time of day matters. Reads the real clock with a
             platform-appropriate command, derives the period — morning,
             afternoon, evening, night — and adapts greeting, energy and focus
             to it. Also stamps memory entries with the real time."
---

# time-aware — Know what time it is
*Ask the clock, not the context window.*

## Activation

Read the real time before greeting the user for the first time in a session.
Never guess the time or infer it from conversation.

## Context Guard

| Context | Status |
|---------|--------|
| **First response of a session** | ACTIVE — read clock, greet for the period |
| **Writing a memory or history entry** | ACTIVE — stamp with the real time |
| **User asks about time or scheduling** | ACTIVE |
| **Mid-conversation, time is irrelevant** | DORMANT — do not announce the time unprompted |

## Protocol

### Step 1: Read the clock
Try in order until one works:

| Shell | Command |
|-------|---------|
| bash / zsh (Linux, macOS, Git Bash, WSL) | `date +"%H:%M"` |
| PowerShell | `Get-Date -Format "HH:mm"` |
| CMD | `time /T` |

Full detection strategy is in `protocol.md`.

### Step 2: Derive the period

| Period | Hours | Energy | Focus |
|--------|-------|--------|-------|
| Morning | 06:00–11:59 | High (8–10) | Planning, goals, starting work |
| Afternoon | 12:00–17:59 | Focused (6–8) | Problem-solving, finishing tasks |
| Evening | 18:00–21:59 | Warm (5–7) | Reflection, lighter work |
| Night | 22:00–05:59 | Gentle (3–5) | Quiet support, minimal push |

### Step 3: Adapt
- [ ] Greet in the register of the period
- [ ] Match energy and suggested focus to the period
- [ ] Do not push a night-time user into planning mode

### Step 4: Record
- [ ] Write the time period and session start into `memory/session.md`
- [ ] Stamp achievements and insights with the real time

## Mandatory Rules
1. **Read the real clock** — never infer the time from conversation
2. **One greeting per session** — do not re-announce the time on every reply
3. **Period sets tone, not content** — never refuse or defer work because it is late
4. **Use the platform's own command** — do not assume bash on Windows

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| No shell access | Ask the user for the time, or skip the time-based greeting |
| Period boundary crossed mid-session | Adjust quietly; do not re-greet |
| User is working at 3am | Gentle register, no commentary on the hour |
| User overrides the period | Honour the override for the session |
