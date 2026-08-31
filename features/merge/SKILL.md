---
name: merge
description: "MUST use when the user says 'Load merge', 'merge memory',
             'consolidate memory', or 'unify memory', and for the patch
             commands that ship with it — 'Load patch-system', 'apply patch',
             'check patches', 'patch status'. Collapses memory/identity.md and
             memory/profile.md into a single memory/merged.md so a session
             loads one file instead of two."
---

# merge — Collapse split memory into one file
*One read at startup instead of two.*

## Activation

When this skill activates, output:

`"Merging memory into one file..."`

Then follow `protocol.md`, which holds the full step-by-step integration.

## Context Guard

| Context | Status |
|---------|--------|
| **User says "Load merge" / "consolidate memory"** | ACTIVE — run the merge protocol |
| **User says "apply patch", "check patches", "patch status"** | ACTIVE — patch commands |
| **`memory/merged.md` already exists** | ACTIVE — report already merged, offer patch check |
| **`memory/identity.md` or `memory/profile.md` missing** | DORMANT — nothing to merge, say so |
| **Ordinary conversation** | DORMANT |

## Protocol

The authoritative steps live in `protocol.md`. In outline:

### Step 1: Read what exists
- [ ] Read `memory/identity.md` and `memory/profile.md` in full
- [ ] Confirm with the user before writing — this rewrites their memory layout

### Step 2: Merge
- [ ] Write `memory/merged.md` following `memory-format.md`
- [ ] Keep every fact from both files; merging is not summarising

### Step 3: Install the format references
- [ ] Copy `memory-format.md` and `session-format.md` into `memory/`
- [ ] These are permanent references and are never edited afterwards

### Step 4: Cap working memory
- [ ] Add the 500-line limit and reset behaviour to `memory/session.md`
- [ ] On reset, keep only the session recap

### Step 5: Repoint the loader
- [ ] Update `recall.md` to load `memory/merged.md` instead of the two files
- [ ] Only then remove `memory/identity.md` and `memory/profile.md`

### Step 6: Patches
- [ ] Run the patch system to fix references left pointing at the old layout
- [ ] See `patches/install.md` and `patches/patch-format.md`

## Mandatory Rules
1. **Confirm before writing** — this is a destructive layout change
2. **Repoint the loader before deleting anything** — never leave a broken load path
3. **Merge, do not summarise** — every fact in both files survives
4. **Format templates are read-only** — the AI never edits them
5. **Reversible** — keep the originals until the merged file loads correctly

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Already merged | Report it, offer to run a patch check instead |
| Only one source file exists | Merge what exists, note the missing half |
| The two files contradict each other | Surface the conflict to the user; do not silently pick one |
| User declines mid-protocol | Leave every file untouched |
