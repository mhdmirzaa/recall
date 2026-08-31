# 🧠 **Recall** - Universal AI Memory Architecture
*A simple template for creating persistent AI companions that remember you*

## 🎯 **What This Does**

**Recall** helps you create AI companions that maintain memory across conversations. Using simple `.md files` as a database, your AI can remember your preferences, learn your communication style, and provide consistent interactions.

## ✨ **Key Features**

- **Persistent Memory**: AI remembers conversations across sessions
- **Personal Learning**: Adapts to your communication style and preferences
- **Time Intelligence**: Dynamic greetings and behavior based on time of day
- **Simple Setup**: 30-second automated setup or manual customization
- **Markdown Database**: Human-readable `.md files` store all memory
- **Session Continuity**: Working memory for smooth conversation flow
- **Self-Maintaining**: Updates memory through natural conversation

## 📊 **System Specifications**

### **Architecture Overview**
- **Storage**: Markdown files (.md) as database
- **Memory Types**: Essential files + optional components + working memory
- **Setup**: 30 seconds automated or 2-5 minutes manual
- **Core Files**: 4 essential files + optional diary system
- **Updates**: Through natural conversation
- **Compatibility**: Claude and other AI systems with memory support

### **File Structure**
```
recall/
├── features/                 # Optional. Install only what you need.
│   ├── adventure/            # Visual-novel RPG sessions
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── code-audit/           # Four-tier code review: survey, investigate, refine, audit
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── decisions/            # Append-only log of decisions and their reasoning
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── git-commit/           # Structured commits with session context
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── hook-session-start/   # Loads memory automatically when Claude Code starts
│   │   ├── hooks/
│   │   │   ├── session-start.ps1.template
│   │   │   └── session-start.sh.template
│   │   ├── install.md
│   │   ├── README.md
│   │   └── uninstall.md
│   ├── hook-user-prompt/     # UserPromptSubmit hook framework the inject-* features plug into
│   │   ├── examples/
│   │   │   ├── example-timestamp-injector.ps1.template
│   │   │   └── example-timestamp-injector.sh.template
│   │   ├── master-hook/
│   │   │   ├── user-prompt-hook.ps1.template
│   │   │   └── user-prompt-hook.sh.template
│   │   ├── injector-format.md
│   │   ├── install.md
│   │   ├── README.md
│   │   └── uninstall.md
│   ├── image-gen/            # Render PNGs via the OpenAI image API — needs a key, costs money
│   │   ├── .env.example
│   │   ├── credential-setup.md
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── image-prompt/         # Write Midjourney / NijiJourney prompts
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── inject-mood/          # Adds MOOD: to every prompt — needs hook-user-prompt
│   │   ├── injectors/
│   │   │   ├── mood.ps1.template
│   │   │   └── mood.sh.template
│   │   ├── commands.md
│   │   ├── install.md
│   │   ├── README.md
│   │   └── uninstall.md
│   ├── inject-time/          # Adds a timestamp and period to every prompt — needs hook-user-prompt
│   │   ├── injectors/
│   │   │   ├── time.ps1.template
│   │   │   └── time.sh.template
│   │   ├── install.md
│   │   ├── README.md
│   │   └── uninstall.md
│   ├── inject-tone/          # Adds TONE: to every prompt — needs hook-user-prompt
│   │   ├── injectors/
│   │   │   ├── tone.ps1.template
│   │   │   └── tone.sh.template
│   │   ├── commands.md
│   │   ├── install.md
│   │   ├── README.md
│   │   └── uninstall.md
│   ├── learned-rules/        # Behavioural rules the AI accumulates from its own mistakes
│   │   ├── config.json
│   │   ├── install.md
│   │   ├── README.md
│   │   ├── rules-format.md
│   │   └── SKILL.md
│   ├── library/              # Reusable knowledge entries in eight fixed formats
│   │   ├── formats/          # One template per entry type
│   │   │   ├── architecture-format.md
│   │   │   ├── component-format.md
│   │   │   ├── database-format.md
│   │   │   ├── diagram-format.md
│   │   │   ├── integration-format.md
│   │   │   ├── security-format.md
│   │   │   ├── theme-format.md
│   │   │   └── workflow-format.md
│   │   ├── items/            # Ready-made entries you can install
│   │   │   ├── integration/
│   │   │   │   └── toyyibpay-payment-gateway.md
│   │   │   ├── security/
│   │   │   │   ├── security-headers.md
│   │   │   │   └── toyyibpay-webhook-verification.md
│   │   │   └── README.md
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── merge/                # Collapse identity + profile into one file for faster loading
│   │   ├── patches/          # Versioned fixes to memory files
│   │   │   ├── install.md
│   │   │   ├── PATCH-001.md
│   │   │   └── patch-format.md
│   │   ├── memory-format.md
│   │   ├── protocol.md
│   │   ├── README.md
│   │   └── session-format.md
│   ├── music/                # Turn an image into a concept album with Suno-ready lyrics
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── new-skill/            # The AI proposes new skills from patterns it notices
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── postmortem/           # Failure log — what broke and what prevents it next time
│   │   ├── install.md
│   │   ├── protocol.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── projects/             # Ten active project slots, least-recently-used archived
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── reminders/            # Follow-ups that survive across sessions
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── search/               # Search past sessions and answer in narrative
│   │   ├── install.md
│   │   ├── output-format.md
│   │   └── README.md
│   ├── session-brief/        # Context briefing delivered at session start
│   │   ├── install.md
│   │   ├── protocol.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── session-log/          # Write a dated entry into memory/history/
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── Skill-Plugin-System/  # Legacy manual skill installer — replaced by the marketplace
│   │   ├── install.md
│   │   ├── README.md
│   │   └── skill-format.md
│   ├── time-aware/           # Time-of-day awareness in greetings and behaviour
│   │   ├── protocol.md
│   │   └── README.md
│   ├── topic-notes/          # Subject-based notes that outlive the calendar
│   │   ├── index-format.md
│   │   ├── install.md
│   │   ├── README.md
│   │   ├── SKILL.md
│   │   └── topic-format.md
│   ├── trim/                 # Budget-aware compaction — summarise instead of delete
│   │   ├── install.md
│   │   ├── policy-format.md
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── video-gen/            # Render MP4 via the Seedance API — needs a key, costs money
│   │   ├── .env.example
│   │   ├── credential-setup.md
│   │   ├── install.md
│   │   ├── README.md
│   │   └── SKILL.md
│   └── work-plan/            # Plan-to-execution tracking with per-task commits
│       ├── install.md
│       ├── plan-format.md
│       ├── README.md
│       └── SKILL.md
├── memory/                   # The four memory files. This is the whole database.
│   ├── history/              # What happened — dated entries, archived monthly
│   │   ├── example-entry.md  # A worked example
│   │   └── format.md         # Entry structure and archive rules
│   ├── identity.md           # How the AI behaves — permanent
│   ├── profile.md            # What's true about you — grows over time
│   └── session.md            # What you are doing right now — resets each session
├── README.md                 # Start here
├── recall.md                 # Entry point — loading order and the save protocol
├── setup-guide.md            # Manual setup (2-5 min)
└── setup-wizard.md           # Guided setup (30 sec)
```

### **Core Components**
1. **Index** - System entry point and command center
2. **Identity** - AI personality and communication style
3. **Profile** - User preferences and learning patterns
4. **Working memory** - What you are doing right now (resets each session)
5. **History** - Optional conversation history with auto-archiving

## 🚀 **Quick Start**

1. **Setup**: Run `setup-wizard.md` for automated setup (30 seconds)
2. **Configure**: Add the memory instructions to Claude
3. **Activate**: Type your AI's name to load personality
4. **Use**: Your AI learns and grows through conversation

## 📚 **Communication Protocols**

### **Basic Commands**
```
<ai-name>     → Load AI personality and memory
save          → Save current progress to files
update memory → Refresh AI's learning
review growth → Check AI's development
```

### **Creating Custom Protocols**

**Step 1: Define the Protocol**
Create a new `.md file` with your protocol rules:
```markdown
# My Custom Protocol
## When to Use: [trigger conditions]
## What It Does: [specific actions]
## How It Works: [step-by-step process]
```

**Step 2: Add to Index**
Edit `recall.md` and add your protocol to the "Optional Components" section:
```markdown
### My Custom Feature
*Load when you say: "load my feature"*
- [Brief description]
- [Usage instructions]
```

**Step 3: Train Your AI**
Tell your AI about the new protocol:
```
"I've created a new protocol in [filename]. When I say '[trigger phrase]', 
load that protocol and follow its instructions."
```

### **Communication Tutorial**

**Effective AI Training:**
1. **Be Specific**: "I prefer short responses" vs "communicate better"
2. **Give Examples**: Show what you want, not just describe it
3. **Use Consistent Language**: Same terms for same concepts
4. **Provide Feedback**: "That was perfect" or "try a different approach"

**Memory Management:**
- Use `save` after important conversations
- Your AI updates files automatically during conversation
- Daily diary is optional but helpful for long-term memory

**Customization Tips:**
- Edit files gradually, test changes
- Start with small personality adjustments
- Add domain expertise through conversation
- Use the protocol system for specialized features

## 🎯 **Common Use Cases**

Your AI companion can specialize in:
- **Professional**: Business analysis, project management, strategic planning
- **Educational**: Tutoring, study assistance, curriculum development
- **Creative**: Writing support, brainstorming, artistic collaboration  
- **Personal**: Life coaching, goal tracking, decision support
- **Technical**: Code review, troubleshooting, system design

## 🛠️ **Advanced Features**

- **Auto-Archive**: Diary files automatically archive at 1k lines
- **Working memory**: Temporary memory that resets each conversation
- **Protocol System**: Create custom AI behaviors and responses
- **Self-Update**: AI modifies its own memory through conversation
- **Modular Design**: Add or remove features as needed

## 🌟 **Available Feature Extensions**

### 📖 Installation Guide

Features are organized into **tiers** based on dependencies. Install Tier 1 first, then work your way up. Within each tier, install in any order unless noted.

| Path | What You Get | Features |
|------|-------------|----------|
| **Minimal** (10 min) | Foundation only | merge + Skill Plugin |
| **Productive** (30 min) | Foundation + documentation + git | Tier 1 + session-log + git-commit + work-plan |
| **Complete** (1-2 hrs) | Full AI companion | All tiers, top to bottom |

> **New features from contributors** slot into the appropriate tier — no renumbering needed.

---

### 🏗️ Tier 1 — Foundation (Start Here)

| Feature | Description | Setup |
|---------|-------------|-------|
| 🔄 [merge](features/merge/) | Unified memory architecture — merge split files into one, faster loading | `"Load merge"` |
| 🔌 [Skill Plugin System](features/Skill-Plugin-System/) | Auto-triggered skills for Claude Code — drop a SKILL.md and it's live | `"Load skill-plugin"` |
| ⏰ [time-aware](features/time-aware/) | Time-intelligent greetings, energy-adapted behavior | `"Load time-aware"` |
| ⚡ [hook-session-start](features/hook-session-start/) | Auto-loads your AI on Claude Code startup — no manual name-typing | `"Load hook-session-start"` |
| 💬 [hook-user-prompt](features/hook-user-prompt/) | Generic UserPromptSubmit hook framework with plug-and-play injector pattern | `"Load hook-user-prompt"` |
| 🎭 [inject-tone](features/inject-tone/) | Injects `TONE: <description>` per prompt — registry in `memory/identity.md`, AI/user can switch — *requires hook-user-prompt* | `"Load inject-tone"` |
| 🌙 [inject-mood](features/inject-mood/) | Injects `MOOD: <description>` per prompt — registry in `memory/identity.md`, AI/user can switch — *requires hook-user-prompt* | `"Load inject-mood"` |
| ⏱️ [inject-time](features/inject-time/) | Injects `<timestamp> \| <PERIOD>` per prompt with transition signals on period flips — user-configurable boundaries — *requires hook-user-prompt* | `"Load inject-time"` |

---

### 📝 Tier 2 — Memory & Documentation

| Feature | Description | Setup |
|---------|-------------|-------|
| 📖 [session-log](features/session-log/) | Daily session documentation with monthly auto-archival | `"Load session-log"` |
| 🗂️ [topic-notes](features/topic-notes/) | Topic-based memory journals for discoveries, fixes, and lessons across sessions — *pairs well with session-log + search* | `"Load topic-notes"` |
| 🗜️ [trim](features/trim/) | Budget-aware compression — summarizes old entries into a dense history block instead of deleting them, with reversible snapshots — *complements merge* | `"Load trim"` |
| 🔍 [search](features/search/) | Search past sessions with narrative context — *requires session-log* | `"Load search"` |
| 🔔 [reminders](features/reminders/) | Persistent cross-session reminders with deadline tracking | `"Load reminders"` |
| 📋 [decisions](features/decisions/) | Append-only record of decisions and their reasoning | `"Load decisions"` |

---

### ⚙️ Tier 3 — Project & Code Management

| Feature | Description | Setup |
|---------|-------------|-------|
| 📦 [projects](features/projects/) | Smart project tracking with auto-archival (10 active slots) | `"Load projects"` |
| 🔒 [git-commit](features/git-commit/) | Structured git commits with session context and vigilant mode | `"Load git-commit"` |
| 📋 [work-plan](features/work-plan/) | Plan-to-execution tracking with per-task commits — *best with git-commit* | `"Load work-plan"` |
| 📚 [library](features/library/) | Reusable knowledge library with 8 format templates — *best with git-commit* | `"Load library"` |

---

### 🧠 Tier 4 — Intelligence & Awareness

| Feature | Description | Setup |
|---------|-------------|-------|
| 🔨 [new-skill](features/new-skill/) | AI creates new skills through pattern detection (human-in-the-loop) | `"Load new-skill"` |
| 📋 [session-brief](features/session-brief/) | Auto-delivers context brief at session start — *enhanced by time-aware + projects + reminders* | `"Load session-brief"` |
| 🔥 [postmortem](features/postmortem/) | Failure learning log — auto-detects mistakes, records prevention actions | `"Load postmortem"` |
| 👁️ [code-audit](features/code-audit/) | 4-tier code awareness — Survey, Investigate, Refine, Audit | `"Load code-audit"` |
| 🎨 [image-prompt](features/image-prompt/) | Composition-aware Midjourney/NijiJourney prompt generation | `"Load image-prompt"` |
| 🖼️ [image-gen](features/image-gen/) | Render descriptions into real PNGs via the OpenAI gpt-image API — built from your input, cost-confirmed — *pairs with image-prompt* | `"Load image-gen"` |
| 🎬 [video-gen](features/video-gen/) | Render descriptions into MP4 video via the Seedance API (text & image-to-video, async, cost-gated) — *pairs with image-gen* | `"Load video-gen"` |
| 🎵 [music](features/music/) | Visual-to-musical storytelling — image to concept album with Suno-ready output | `"Load music"` |
| 🎮 [adventure](features/adventure/) | Visual Novel RPG — duo/solo, OP/balanced, 7 world types, cinematic combat | `"Load adventure"` |
| 👁️ [learned-rules](features/learned-rules/) | Instinct-based behavioral learning — passive hook observation + persistent rules | `npx continuous-improvement install` |

> Each feature has a detailed README inside its folder. Click the feature name to learn more.

---

## 🤝 Contributors

| # | Contributor | Features |
|---|------------|----------|
| 1 | [Faiz Khairi](https://github.com/faizkhairi) | Reminders System, Decision Log System |
| 2 | [logando-al](https://github.com/logando-al) | Session Briefing System, Post-Mortem System |
| 3 | [SherlockianAsh](https://github.com/SherlockianAsh) | Observation System |
| 4 | [naimkatiman](https://github.com/naimkatiman) | Mulahazah System |

> Want to contribute? Fork the repo, create a feature in `features/[Your-Feature]/`, and submit a PR!

---

**Version**: 4.2 - Compact feature tables with contributor credits
**Created by**: Kiyoraka Ken & Alice
**License**: Open Source Community Project
**Last Updated**: April 8, 2026
**Purpose**: Simple, effective AI memory for everyone

*Transform basic AI conversations into meaningful, growing relationships*
