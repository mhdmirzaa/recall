---
name: postmortem
description: "MUST use when user says 'post-mortem', 'postmortem', 'log this
             failure', 'write a post-mortem', or 'what went wrong'. Also triggers
             passively when the AI detects a failure signal — a deployment
             crash, a test regression, an architecture reversal, hours lost to a
             dead end, an exposed secret, or data loss — at which point it asks
             whether the failure is worth recording before writing anything."
---
# 🔥 Post-Mortem

## Skill Name
postmortem

## Trigger Words
- `"post-mortem"`
- `"postmortem"`
- `"log this failure"`
- `"write a post-mortem"`
- `"what went wrong"`

## Auto-Detection Triggers (Passive — Always Active)
AI watches for these signals and prompts the user:

| Signal | Phrase Examples |
|--------|----------------|
| Deployment failure | "it crashed", "pod is failing", "image pull error", "rollback" |
| Test regression | "tests are broken", "was passing before", "something broke" |
| Architecture reversal | "undo this", "we need to revert", "this approach doesn't work" |
| Wasted time | "wasted hours", "dead end", "that didn't work at all" |
| Security incident | "exposed secret", "accidentally committed", "vulnerability" |
| Data loss | "data is gone", "migration failed", "backup didn't work" |

On detection, AI asks: *"That didn't go as planned. Worth a post-mortem?"*
User says yes → AI fills out the format from `protocol.md`.
User says no → move on, no log created.

## Manual Trigger
User says `"post-mortem"` or `"log this failure"` → AI immediately starts the post-mortem format.

## Behavior
1. Detect signal (passive) or receive explicit trigger (manual)
2. Ask: "Worth a post-mortem?" (skip if manual trigger — user already decided)
3. If yes: fill out format from `protocol.md`, ask clarifying questions as needed
4. Append entry to `memory/post-mortems.md`
5. Reference entry in future sessions when work touches the same domain

## Domain Reference Behavior
When starting work in a domain that has a past post-mortem:
- Check `memory/post-mortems.md` for relevant entries
- Flag: "⚠️ Reminder: [lesson] — see post-mortem [date]"

## Level History
- **Lv.1** — Base: manual trigger + append to log
- **Lv.2** — Auto-detection of failure signals + passive prompting
- **Lv.3** — Domain reference: flag relevant post-mortems at session start or task start
