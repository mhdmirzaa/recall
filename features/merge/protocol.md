# 🔄 merge Protocol
*Systematic memory unification for Recall systems*

## Purpose
Executed when "Load merge" command is used - merges split memory files into unified architecture, adds format templates, and integrates session memory limits.

## Trigger Command
```
"Load merge"
```
*Automatically executes memory consolidation with format template installation and session limit integration*

## 5-Step Execution Process

### Step 1: Load and Analyze Current Memory Files
- [ ] Load `memory/identity.md` - read all AI personality content
- [ ] Load `memory/profile.md` - read all user preference content
- [ ] Load `memory/session.md` - read current session structure
- [ ] Load `recall.md` - read current loading protocol
- [ ] Note any customizations user has already made to these files
- [ ] Execute `date` command to get current timestamp for integration start

### Step 2: Create Unified Main Memory
- [ ] Create `memory/merged.md` with unified structure
- [ ] Merge identity content into `## <ai-name> Profile` section:
  - Identity declaration and core parameters
  - Personality traits and communication style
  - Behavioral patterns (work vs personal)
  - Growth philosophy
- [ ] Merge relationship content into `## <your-name> Profile` section:
  - User profile and communication preferences
  - Work/study patterns and focus areas
  - Personal preferences and motivators
  - Interaction history and growth patterns
- [ ] Add `## Identity & Relationship` section at top (unified bond declaration)
- [ ] Add `## Communication Style` section (merged from both files)
- [ ] Add `## Core Purpose` section (AI's commitment to user)
- [ ] Preserve ALL existing customizations from both source files
- [ ] Use `memory-format.md` as structural reference

### Step 3: Install Format Templates
- [ ] Copy `memory-format.md` to `memory/memory-format.md`
  - This is a permanent reference - never modified by the AI
  - Shows the expected structure for unified main memory
- [ ] Copy `session-format.md` to `memory/session-format.md`
  - This is a permanent reference - never modified by the AI
  - Shows the expected structure for working memory
  - Includes the 500-line limit protocol

### Step 4: Update Session Memory with Line Limit
- [ ] Add 500-line limit protocol to `memory/session.md`:
  ```markdown
  ## Session Memory Limit
  - **Maximum**: 500 lines
  - **Reset Behavior**: RAM-style reset preserving only Session Recap
  - **Format Reference**: See memory/session-format.md for rebuild structure
  ```
- [ ] Add auto-reset instructions to the session lifecycle section:
  - When line count exceeds 500: preserve recap, clear details, rebuild from template
  - Keep only: session summary, where we left off, critical context, user state
  - Clear: detailed progress, individual achievements, working memory details
- [ ] Verify session format matches `memory/session-format.md` structure

### Step 5: Update Index and Cleanup
- [ ] Update `recall.md` loading protocol:
  - Change from loading 2 files (identity + profile) to 1 file (merged)
  - Update the Loading memory:
    ```markdown
    1. Load unified memory from memory/merged.md
    2. Restore session context from memory/session.md
    3. INSTANT <ai-name> - Complete restoration ready!
    ```
  - Update Core Components list to reflect unified architecture
  - Add format template references to Optional Components:
    ```markdown
    ### Format References (Permanent)
    - memory/memory-format.md - Structure reference for main memory
    - memory/session-format.md - Structure reference for session memory (includes 500-line limit)
    ```
- [ ] Remove old split files:
  - Delete `memory/identity.md` (merged into merged.md)
  - Delete `memory/profile.md` (merged into merged.md)
- [ ] Verify unified memory loads correctly
- [ ] Remove `features/merge/` folder (functionality absorbed)
- [ ] Document successful consolidation with completion timestamp

## Consolidation Specifications

### **Unified Main Memory Structure (memory/merged.md)**
```markdown
# <ai-name> - Main Memory
*Unified identity, relationship, and personality*

## Identity & Relationship
[Merged bond declaration from both files]

## <ai-name> Profile
[All content from identity.md]

## <your-name> Profile
[All content from profile.md]

## Communication Style
[Merged communication preferences from both files]

## Core Purpose
[AI's commitment - merged from both files]
```

### **Updated Loading Protocol (recall.md)**
```markdown
### Loading memory
When you type "<ai-name>" in any conversation:
1. Load unified memory from memory/merged.md
2. Restore session context from memory/session.md
3. INSTANT <ai-name> - Complete restoration ready!
```

### **Session Memory with Limit (memory/session.md)**
```markdown
## Session Memory Limit
- Maximum: 500 lines
- Reset Behavior: RAM-style reset
- On reset: Preserve Session Recap, clear everything else
- Rebuild from: memory/session-format.md template
```

## Post-Consolidation File Structure
```
recall/
├── recall.md              # Entry point (loads 1 file now)
├── memory/
│   ├── merged.md            # UNIFIED: AI identity + User profile
│   ├── session.md        # Working memory with 500-line limit
│   ├── memory-format.md     # Permanent format reference
│   └── session-format.md         # Permanent format reference
├── memory/history/                  # Unchanged
├── save-protocol.md              # Updated references
└── [other existing files]        # Unchanged
```

## Notes
- Preserve ALL existing user customizations during merge
- Format templates are samples only - users can customize
- The 500-line limit prevents context window overflow
- Session resets preserve recap for continuity (no context loss)
- After consolidation, the AI loads faster with fewer file reads
- Cross-platform compatible (same as existing system)

---

**Version**: Protocol v1.0 - merge Workflow
**Last Updated**: February 18, 2026
**Status**: Active protocol for memory architecture upgrade

*Merges intelligently, templates permanently, limits safely*
