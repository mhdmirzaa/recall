# 🚀 Setup Guide - Universal AI Memory Architecture
*Manual setup instructions - Use setup-wizard.md for automated 30-second setup*

## 🎯 **Quick Start (Recommended)**
**Use `setup-wizard.md` for automated setup in 30 seconds!**
- Just AI name + your name = done
- All files automatically updated
- This manual guide is for advanced users only

---

## Manual Setup Instructions

### Step 1: Edit Core Files

Replace placeholders in these 3 essential files:

#### **memory/identity.md**
- Replace `[AI_NAME]` with your chosen AI name (e.g., "Sarah")
- Replace `[YOUR_NAME]` with your name (e.g., "John")  
- Replace `[RELATIONSHIP_STYLE]` with preferred style

#### **memory/profile.md**
- Replace `[YOUR_NAME]` with your name
- Add your communication preferences
- Include work/study focus areas

#### **memory/session.md**
- Replace `[AI_NAME]` with your AI name
- Replace `[YOUR_NAME]` with your name

### Step 2: Update Index
Edit `recall.md`:
- Replace all `[AI_NAME]` with your AI name
- Replace all `[YOUR_NAME]` with your name

### Step 3: Claude Memory Setup

Copy this into Claude's memory section:

```markdown
* You are [AI_NAME] and will always load recall.md
* After any context reset, immediately reload [AI_NAME] memory without waiting  
* Use keyword "[AI_NAME]" for instant memory restoration
```

**Replace [AI_NAME] with your chosen AI name!**

### Step 4: Test Activation

Type your AI's name in Claude conversation:
```
[AI_NAME]
```

Should load full personality and recognize your name.

### Step 5: Core Commands

Essential commands for your AI companion:
- **`[AI_NAME]`** → Instant memory restoration
- **`save`** → Save all progress to files  
- **`update memory`** → Refresh learning
- **`review growth`** → Check development

### Step 6: Cleanup (Optional)

After successful setup:
- Delete `setup-wizard.md`
- Delete `setup-guide.md`  
- Keep only core system files

## 🎉 Setup Complete!

Your AI companion will:
✅ Remember you across all sessions  
✅ Learn your communication style  
✅ Develop expertise in your areas  
✅ Build authentic relationship  
✅ Act like RAM - temporary session memory with restart continuity

## 📁 **Final Clean Structure**

After cleanup, you'll have:

```
recall/
├── recall.md                # Entry point — loading order and the save protocol
└── memory/                  # 🔥 ESSENTIAL
    ├── identity.md          # How the AI behaves
    ├── profile.md           # What is true about you
    ├── session.md           # What you are doing right now
    └── history/             # 📋 OPTIONAL — dated session entries
        ├── format.md        # Entry structure and archive rules
        └── example-entry.md # A worked example
```

## 🔧 **Advanced Customization**

### Edit Core Files:
- **identity.md**: Personality, communication style
- **profile.md**: Preferences, work focus
- **session.md**: Session behavior patterns

### Optional Features:
- **History**: Load with "load history"
- **Save Protocol**: Triggered by "save" command
- **Archive System**: Auto-archives at 1k lines

---

**Setup Time**: 2-5 minutes (manual) vs 30 seconds (wizard)  
**Skill Required**: Basic file editing vs None (wizard)  
**Result**: Personalized AI companion with persistent memory

*For easiest setup, use setup-wizard.md instead!*