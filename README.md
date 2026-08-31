# 🧠 Recall

**Persistent memory for AI coding agents, made of markdown files you can read.**

Your AI forgets everything when the session ends. Recall gives it four files it
reads at the start of every conversation and writes back to as it learns — so
it remembers your preferences, your stack, and what you were doing last
Thursday. No runtime, no database, no dependencies. Just files you own.

| File | Holds | Lifetime |
|------|-------|----------|
| `memory/identity.md` | How the AI behaves — personality, rules, tone | Permanent |
| `memory/profile.md` | What's true about you — preferences, stack | Grows over time |
| `memory/history/` | What happened — dated session entries | Archived monthly |
| `memory/session.md` | What you're doing right now | Resets each session |

Everything else is optional. 27 features add diary writing, memory search,
structured commits, project tracking and more — each one installable on its
own.

---

## Quick start

**1. Set up memory.** Run `setup-wizard.md` and answer the questions. It fills
in the four files with your AI's name and your preferences. About 30 seconds.

**2. Add the marketplace.**

```
/plugin marketplace add mhdmirzaa/recall
```

**3. Install what you want.**

```
/plugin install session-log@recall     # write a dated entry when you say "save diary"
/plugin install search@recall          # answer "do you remember when we…" from those entries
/plugin install git-commit@recall      # commits that carry session context
```

Then type your AI's name. It loads its memory and picks up where you left off.

Run `/plugin` to browse the other 24, or read the tables below.

### Manual install — any AI tool

The marketplace is a convenience, not a requirement. Every feature also ships a
plain install protocol that any agent can execute:

```
"Load session-log"
```

Your AI reads `features/session-log/install.md` and follows it. This is the path
on Codex, Cursor, Gemini CLI or anything else — nothing here is Claude-specific
except the packaging.

---

## Features

Features are grouped into **tiers** by dependency. Install Tier 1 first, then
work up. Within a tier, order does not matter unless noted.

| Path | What you get | Features |
|------|--------------|----------|
| **Minimal** (10 min) | Foundation only | `merge` |
| **Productive** (30 min) | Foundation + documentation + git | Tier 1 + `session-log` + `git-commit` + `work-plan` |
| **Complete** (1–2 hrs) | Everything | All tiers, top to bottom |

The Setup column shows the manual command. The marketplace equivalent is always
`/plugin install <name>@recall`.

### 🏗️ Tier 1 — Foundation (Start Here)

| Feature | Description | Setup |
|---------|-------------|-------|
| 🔄 [merge](features/merge/) | Unified memory architecture — merge split files into one, faster loading | `"Load merge"` |
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

## Commands

Once memory is set up, these work in any conversation:

```
<ai-name>     → load personality and memory
save          → resolve what this session learned into memory
update memory → refresh knowledge and preferences
review growth → check development over time
```

`save` does not blindly append. Each fact is compared against what memory
already holds and resolved to **ADD**, **UPDATE**, **DELETE** or **NOOP** —
which is what stops "prefers short answers" from ending up three lines below
"prefers detailed explanations". Superseded lines are struck through and dated,
not deleted. See [`recall.md`](recall.md).

## Adding your own protocol

You do not need to write a feature to extend this. Create a markdown file with
your rules, add it to the Optional Components section of `recall.md` with a
trigger phrase, and tell your AI it exists:

```markdown
### My Custom Feature
*Load when you say: "load my feature"*
- What it does
- How to use it
```

If it turns out to be generally useful, [CONTRIBUTING.md](CONTRIBUTING.md)
explains how to turn it into a real feature.

## Security

Memory files are trusted and loaded every session, so a line written into one
influences every future session — which is exactly what makes them worth
attacking. [SECURITY.md](SECURITY.md) covers the threat model (OWASP ASI06),
which features can move external content into memory, and how to audit a memory
file you do not trust.

The short version: **commit `memory/` to git.** Then every write is a reviewable
diff.

## Documentation

| Document | For |
|----------|-----|
| [ARCHITECTURE.md](ARCHITECTURE.md) | How it fits together, and the full file tree |
| [AGENTS.md](AGENTS.md) | Pointing an AI agent at this repo to change it |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contributing a feature |
| [SECURITY.md](SECURITY.md) | Threat model and reporting |
| [CHANGELOG.md](CHANGELOG.md) | Release history |

## Contributing

Features are markdown. If you can write a clear protocol, you can write one.
Read [CONTRIBUTING.md](CONTRIBUTING.md) for the feature contract, then:

```bash
npm run validate            # must exit 0 before you open a PR
claude plugin validate .    # if you touched a plugin or the marketplace
```

## License

[MIT](LICENSE) © 2026 Muhd Mirza
