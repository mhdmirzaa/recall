---
name: session-brief
description: "Auto-triggers at the start of every session, before the first
             response, to deliver a short context brief. Also triggers on
             'brief', 'session brief', 'what did we do last time', and 'where
             did we leave off'. Suppressed for the current session by 'skip
             brief'."
---
# 📋 Session Briefing

## Skill Name
session-brief

## Trigger Words
- Session start (automatic — fires before first response)
- `"brief"`
- `"session brief"`
- `"what did we do last time"`
- `"where did we leave off"`

## Suppress Trigger
- `"skip brief"` — suppresses for this session only

## Activation Condition
Fires automatically at the start of every new conversation session, before processing the user's first message.

## Behavior
1. Read `memory/session.md` — extract last session recap (1–2 lines)
2. Read `memory/reminders.md` — count open items (skip section if none)
3. Read project list — identify active project + 🔴/🟡 health flags (if projects is installed)
4. Check current time — determine time period (if time-aware is installed)
5. Compose and deliver brief (max 12 lines) before responding to user

## Output Rules
- Maximum 12 lines total
- Maximum 3 attention flags — show most critical first
- Skip any section that has nothing to report
- Deliver before processing the user's first request

## Companion Skills
- time-aware → time period + work suggestion
- projects → active project + health flags
- reminders → open reminder items

## Level History
- **Lv.1** — Base: session recap + time suggestion
- **Lv.2** — Reminders integration (requires reminders)
- **Lv.3** — Project health flags (requires projects)
