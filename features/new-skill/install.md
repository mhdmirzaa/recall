# Forge Self-Improvement Installation Protocol
*Systematic setup for AI self-improvement through skill creation*

## Purpose
Executed when "Load new-skill" command is used -- enables your AI to detect improvement opportunities and propose new skills or level-ups to existing ones.

## Trigger Command
```
"Load new-skill"
```
*Enables AI self-improvement through pattern detection and skill forging*

## Prerequisites
- Core memory system installed (`memory/` directory with essential files)
- `recall.md` accessible for integration updates
- Installing from the plugin marketplace gives auto-triggering (optional but recommended)

## 3-Step Installation Process

### Step 1: Install Forge Skill
- [ ] If this feature is installed as a plugin:
  - Copy `SKILL.md` to `plugins/[plugin-name]/skills/forge-skill/SKILL.md`
  - Inform user: "Forge skill installed -- auto-triggers on pattern detection and 'create skill', 'level up'"
- [ ] If this feature is not installed as a plugin:
  - Inform user: "Forge integrated into the index. Install it from the plugin marketplace for auto-triggering."
  - Add forge protocol reference to `recall.md`

### Step 2: Update Memory System
- [ ] Add to `recall.md`:
  ```markdown
  ## Self-Improvement Commands
  - "create skill" / "new skill" / "forge this" - Propose a new skill
  - "level up [skill]" / "upgrade [skill]" - Propose improvement to existing skill
  - "self improve" - Review recent sessions for improvement opportunities

  AI also auto-detects opportunities:
  - Repeated patterns handled ad-hoc 3+ times
  - Mistakes that a permanent rule would prevent
  - Multi-step workflows that could be automated
  ```
- [ ] Add forge awareness to `memory/identity.md`:
  ```markdown
  ## Self-Improvement Awareness
  - Monitor for repeated patterns during conversation
  - Detect preventable mistakes and propose permanent fixes
  - Always propose improvements to user -- never create skills autonomously
  - Evidence-based: need 2+ concrete examples before proposing
  ```

### Step 3: Verify and Cleanup
- [ ] Verify forge skill is accessible (via plugin or the index)
- [ ] Test: user says "self improve" and AI acknowledges the command
- [ ] Remove `features/new-skill/` folder (functionality installed)
- [ ] Display completion message

## Installation Complete Message
```
Forge Self-Improvement Installed Successfully!

Your AI can now:
  Detect repeated patterns and propose new skills
  Identify preventable mistakes and suggest permanent rules
  Level-up existing skills with new capabilities
  Create properly formatted skill files automatically

Commands:
  create skill / new skill / forge this - Propose new skill
  level up [skill] / upgrade [skill] - Improve existing skill
  self improve - Review for improvement opportunities

Remember: AI always proposes, you always approve. Human-in-the-loop!
```

## What This System Does
1. **Pattern Detection** - AI recognizes repeated tasks it handles ad-hoc
2. **Mistake Prevention** - Errors become permanent rules so they never recur
3. **Skill Creation** - Properly formatted skills with trigger conditions and protocols
4. **Level-Up System** - Skills evolve through levels (Lv.1 -> Lv.2 -> Lv.3+)
5. **Human Control** - AI proposes, user approves. Never autonomous

## Notes
- Forge requires conversation context to detect patterns -- it does not run in the background
- All proposals need user approval before any files are created or modified
- Start with Lv.1 skills -- complexity is added organically through level-ups
- Works best with plugin marketplace for auto-triggering and proper skill folder structure
- Each forged skill follows a standard template for consistency

---

**Version**: Protocol v1.0 - Forge Self-Improvement System
**Last Updated**: March 2026
**Status**: Active protocol for AI self-improvement

*Your AI companion gets smarter with every session -- one skill at a time*
