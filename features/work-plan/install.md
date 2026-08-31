# 📋 work-plan Installation Protocol
*Systematic plan execution setup for Recall companions*

## Purpose
Executed when "Load work-plan" command is used — creates a plan execution skill, configures plan storage and source paths, and integrates with your AI companion.

## Trigger Command
```
"Load work-plan"
```
*Automatically creates plan execution skill, configures paths, and registers with your AI*

## Prerequisites
- Core memory system installed (`recall.md` exists)
- Installing from the plugin marketplace gives auto-triggering (not required)
- git-commit optional but recommended for per-task commit discipline

## 6-Step Execution Process

### Step 1: Gather Configuration
- [ ] Ask user: **"What would you like to name your plan execution skill?"**
  - Default: `"work-plan"`
  - Examples: `"execute"`, `"planner"`, `"build"`, `"forge-plan"`
- [ ] Store chosen name as `[WORK_NAME]`
- [ ] Ask user: **"Where should the project plan file be stored?"**
  - Default: `"Project Resources"` (creates `[project-root]/Project Resources/project-plan.md`)
  - Examples: `"Plans"`, `".project"`, `"docs"`, `"resources"`
- [ ] Store as `[PLAN_LOCATION]`
- [ ] Ask user: **"Where does your AI save plan mode output?"**
  - Default (Windows): `C:\Users\[username]\.claude\plans\`
  - Default (macOS/Linux): `~/.claude/plans/`
  - This is where the AI's plan mode files are stored
- [ ] Store as `[PLAN_SOURCE_PATH]`
- [ ] Ask user: **"What is the maximum line limit for plan files?"**
  - Default: `1000`
  - When a plan file exceeds this limit during append, the old file is archived
- [ ] Store as `[LINE_LIMIT]`
- [ ] Ask user: **"What should the AI say for each command?"** (or use defaults)
  - Copy Plan message: default `"Copying plan to execution format..."`
  - Append Plan message: default `"Appending to existing plan..."`
  - Resume Plan message: default `"Resuming plan execution..."`
- [ ] Execute `Get-Date` (Windows) or `date` (macOS/Linux) for current timestamp

### Step 2: Verify Plugin System and git-commit
- [ ] Check if `plugins/` directory exists in the project
- [ ] Identify the plugin folder (look for `[ai-name]-skills/` or similar)
- [ ] If plugin system is found:
  - Continue to Step 3 (create as auto-triggered skill)
- [ ] If plugin system is NOT found:
  - Inform user: "This feature is not installed as a plugin. work-plan can still work as a manual protocol."
  - Offer two choices:
    1. "Install from the plugin marketplace first" (recommended)
    2. "Continue without auto-triggering" (protocol added to recall.md directly)
  - If continuing without plugin: skip Step 3, add protocol in Step 5
- [ ] Check if git-commit skill exists in the plugin:
  - If found: note `[COMMIT_CHAIN] = Yes` (per-task commits will be automatic)
  - If not found: note `[COMMIT_CHAIN] = No` (commits will be manual)
  - Inform user of the status:
    - If Yes: "git-commit detected! Each completed todo will trigger a structured commit."
    - If No: "git-commit not installed. Plan tracking will work, but commits will be manual. Consider installing git-commit for full per-task commit discipline."

### Step 3: Create work-plan Skill
- [ ] Create `plugins/[plugin-name]/skills/[WORK_NAME]/` directory
- [ ] Create `SKILL.md` inside with all placeholders replaced:
  - Replace `[WORK_NAME]` with chosen skill name
  - Replace `[PLAN_LOCATION]` with chosen plan storage path
  - Replace `[PLAN_SOURCE_PATH]` with chosen plan source path
  - Replace `[LINE_LIMIT]` with chosen line limit
  - Replace activation messages with user's chosen messages
- [ ] Verify SKILL.md has valid YAML frontmatter with `name` and `description`

### Step 4: Install Plan Format Template
- [ ] Copy `plan-format.md` to `[PLAN_LOCATION]/plan-format.md` (alongside project-plan.md)
- [ ] Inform user: "Plan format template saved in `[PLAN_LOCATION]/` — this is your permanent reference for plan file structure"

### Step 5: Update Index and Cleanup
- [ ] Add plan execution reference to `recall.md` Optional Components section:
  ```markdown
  ### [WORK_NAME]
  *Auto-triggers on: "copy plan", "append plan", "resume plan"*
  - Plan location: [PLAN_LOCATION]/project-plan.md
  - Plan source: [PLAN_SOURCE_PATH]
  - Line limit: [LINE_LIMIT] lines (auto-rotates)
  - Commit chain: [Yes/No — based on git-commit installation]
  ```
- [ ] Add plan commands to Simple Commands section:
  ```
  "copy plan" → Copy latest plan into execution format
  "append plan" → Add new plan steps to existing plan
  "resume plan" → Resume plan execution after context reset
  ```
- [ ] If git-commit is installed: add note about commit chain integration:
  ```markdown
  *Commit Chain: Each completed todo automatically triggers git-commit*
  ```

### Step 6: Test and Cleanup
- [ ] Verify `[PLAN_SOURCE_PATH]` is accessible (try listing the directory)
- [ ] Create `[PLAN_LOCATION]/` directory if it doesn't exist (or note it will be created on first use)
- [ ] Demonstrate the three commands:
  ```
  Available commands:
  • "copy plan"   → Copy latest plan into execution format (fresh)
  • "append plan" → Add new plan steps to existing plan
  • "resume plan" → Resume after context reset

  Commit chain: [Yes/No]
  Plan location: [PLAN_LOCATION]/project-plan.md
  Line limit: [LINE_LIMIT] lines
  ```
- [ ] Remove `features/work-plan/` folder (functionality installed)
- [ ] Display completion confirmation with timestamp:
  ```
  work-plan installed successfully!
  Skill: [WORK_NAME]
  Plan location: [PLAN_LOCATION]/project-plan.md
  Commit chain: [Yes/No]
  Installed at: [timestamp]
  ```

## Post-Installation Structure
```
[project]/
├── [PLAN_LOCATION]/
│   ├── project-plan.md                # Active plan file (created on first use)
│   └── plan-format.md                 # Permanent plan format reference
└── plugins/
    └── [plugin-name]/
        └── skills/
            └── [WORK_NAME]/
                └── SKILL.md           # Auto-triggered plan execution skill
```

## Manual Usage (without the plugin)
If you are not using the plugin, add these instructions directly to `recall.md`:

```markdown
### Plan Execution
When user says "copy plan", "append plan", or "resume plan":
1. Read the plan execution protocol from [PLAN_LOCATION]/plan-format.md
2. Execute the corresponding command (copy/append/resume)
3. Track progress using [ ] and [x] checkboxes
4. Commit after each completed task (if using git)
```

## Pairing with git-commit

When both git-commit and work-plan are installed, they chain together:

```
Execute task → git-commit fires → [x] marked → next task
```

**The result:** Your git history maps directly to your project plan. Each commit corresponds to a specific todo item, making it easy to trace what was built, when, and why.

**Without git-commit:** Work still tracks progress with checkboxes and checkpoint saves — you just commit manually when ready.

## Notes
- Plan files (`project-plan*.md`) are never committed — they are the AI's working reference
- All code changes from executing plan tasks ARE committed (via git-commit or manually)
- The plan file is the single source of truth for recovery after context resets
- Diagrams and architecture notes from the original plan are preserved in the plan file
- Works with any project type, any programming language, any workflow

---

**Version**: Protocol v1.0 - work-plan Installation Workflow
**Last Updated**: February 2026
**Status**: Active protocol for plan execution setup

*Plan it once, execute it forever — every reset, every context loss, the plan survives.*
