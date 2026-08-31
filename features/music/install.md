# music Installation Protocol
*Setup for AI-powered visual-to-musical storytelling*

## Purpose
Executed when "Load music" command is used -- enables your AI to create concept albums from images and single songs from descriptions, with Suno-ready style tags and full lyrics.

## Trigger Command
```
"Load music"
```
*Enables AI song creation with visual inspiration and story-driven albums*

## Prerequisites
- Core memory system installed (`memory/` directory with essential files)
- `recall.md` accessible for integration updates
- Installing from the plugin marketplace gives auto-triggering (optional but recommended)

## 3-Step Installation Process

### Step 1: Install music Skill
- [ ] If this feature is installed as a plugin:
  - Copy `SKILL.md` to `plugins/[plugin-name]/skills/song-creation/SKILL.md`
  - Inform user: "music skill installed -- auto-triggers on 'create album', 'create song', 'muse this'"
- [ ] If this feature is not installed as a plugin:
  - Inform user: "music integrated into the index. Install it from the plugin marketplace for auto-triggering."
  - Add song creation protocol reference to `recall.md`

### Step 2: Create Music Directory
- [ ] Create `music/` directory in project root for album storage:
  ```
  music/
  └── (albums will be saved here)
  ```
- [ ] Add to `recall.md`:
  ```markdown
  ### music
  *AI-powered visual-to-musical storytelling*
  - **Trigger**: "create album", "create song", "muse this", "write a song"
  - **What it does**: Creates concept albums from images or single songs from descriptions
  - **Output**: Suno-ready style tags + full structured lyrics
  - **Storage**: `music/[album-name]/` with story.md, songs.md, and audio/
  ```

### Step 3: Configure Preferences
- [ ] Ask user: "What language do you prefer for song titles and lyrics?"
  - Options: English (default), Japanese (漢字 + Romaji), or any language
  - Save preference to the index
- [ ] Ask user: "What's your default track count for albums?" (default: 7)
  - Options: 3, 5, 7, or 10
  - Save preference to the index

## Post-Installation
- [ ] Test Album Mode: Share an image and say "create an album from this"
- [ ] Test Single Song Mode: "create a song about [any topic]"
- [ ] Confirm lyrics are complete with proper sections ([Verse], [Chorus], etc.)
- [ ] Confirm style tags are Suno-compatible
- [ ] Delete this installation file: `rm install.md`

## Installation Complete
Your AI can now create concept albums from images and songs from descriptions. Albums are saved to `music/` with organized folders.
