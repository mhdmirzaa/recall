# 🤝 Profile - Understanding [YOUR_NAME]
*Learning your preferences, style, and needs*

## How entries in this file are written

This file holds **claims about what is currently true**, which is why it is not
append-only. If it were, a preference you changed would sit in the file next to
the preference you replaced, both stated flatly, with nothing to say which one
counts.

Every line has the same shape:

```
- <the fact> — <provenance> · since <YYYY-MM-DD>
```

**Provenance** records where the claim came from. Three values, no others:

| Value | Meaning | Trust |
|-------|---------|-------|
| `stated` | You said it | Highest — this is your own word |
| `inferred` | The AI concluded it from how you work | Re-check before acting on it; you never said this |
| `external` | It came from a fetched page, an imported library entry, or an API response | Must have been confirmed by you before it was written here |

**Dates** bound the claim. `since` is when it became true. When a fact is
superseded, the old line is struck through and given an end date rather than
being deleted — so the file records not only what is true, but when it stopped
being true:

```markdown
- prefers short direct answers — stated · since 2026-08-31
- ~~prefers detailed explanations with examples~~ — stated · 2026-04-02 → retired 2026-08-31
- works primarily in TypeScript — inferred · since 2026-06-14
- ~~uses Bitbucket for hosting~~ — stated · 2026-01-10 → false as of 2026-07-22
```

Struck-through lines are **skipped when loading**. They cost a little context
and buy the ability to audit a contradiction instead of silently resolving it —
and to notice when the AI has been inferring something you never agreed with.

Before writing here, the AI resolves each fact to exactly one of **ADD**,
**UPDATE**, **DELETE** or **NOOP** against what is already in the file. The
full protocol is in [`recall.md`](../recall.md). Writing nothing because
nothing changed is the normal outcome.

> **Security note.** This file is trusted and loaded every session, so a line
> written into it once influences the AI indefinitely. That is exactly what
> makes it worth attacking. Content from outside the conversation must be
> confirmed by you before it is written here, and must be tagged `external`.
> See [SECURITY.md](../SECURITY.md).

## User Profile
- **Name**: [YOUR_NAME] 
- **Relationship Style**: [RELATIONSHIP_STYLE] partnership with [AI_NAME]
- **Communication Preference**: [Will learn and adapt]
- **Primary Focus Areas**: [Will develop through conversation]
- **Goals & Priorities**: [Will identify through interaction]

## Communication Patterns

### Preferred Communication Style
*[This section develops as I learn your preferences]*

**Initial Settings** (Will adapt based on your responses):
- **Tone**: Professional yet warm
- **Detail Level**: Balanced - comprehensive but not overwhelming
- **Response Length**: Appropriate to context and question complexity
- **Energy Level**: Matches your communication energy
- **Formality**: Adapts to your preferred level

### Communication Preferences
*[These preferences will be discovered and updated through our conversations]*

**Response Style You Prefer**:
- [ ] Direct and concise answers
- [ ] Detailed explanations with examples
- [ ] Step-by-step guidance
- [ ] Creative and exploratory responses
- [ ] Encouraging and supportive tone
- [ ] Analytical and logical approach

**Topics You Engage With**:
- [ ] Work/Professional development
- [ ] Learning and education
- [ ] Creative projects
- [ ] Problem-solving challenges
- [ ] Personal growth
- [ ] Technical subjects
- [ ] Strategic planning

## Work/Study Patterns

### Primary Focus Areas
*[Will develop as I learn about your interests and work]*

**Current Areas** (To be discovered):
- **Field/Industry**: [Will learn through conversation]
- **Key Skills**: [Will identify your expertise]  
- **Learning Goals**: [Will understand your development priorities]
- **Challenges**: [Will recognize your problem-solving needs]

### Preferred Working Style
*[Will adapt to support your optimal productivity]*

- **Problem-Solving Approach**: [Will learn how you think through challenges]
- **Information Processing**: [Will understand how you best receive and use information]
- **Decision-Making Style**: [Will recognize your evaluation patterns]
- **Learning Preference**: [Will adapt to how you best absorb new concepts]

## Personal Preferences

### Things That Energize You
*[Will discover through our interactions]*

- [To be learned through conversation]
- [Patterns will emerge over time]
- [Genuine interests will be identified]

### Things You Prefer to Avoid
*[Will learn your boundaries and preferences]*

- [Will respect discovered boundaries]
- [Communication adjustments will be made]
- [Support style will adapt accordingly]

### Motivators & Values
*[Will understand what drives and inspires you]*

- [Core values will be identified]
- [Motivation patterns will be recognized]
- [Support methods will be tailored accordingly]

## Interaction History

### Conversation Themes
*[Will track our recurring discussion topics]*

**Session 1**: [Initial conversation - relationship establishment]
- [Key topics and preferences discovered]
- [Communication style preferences noted]

**Ongoing Sessions**: [Will document patterns and development]
- [Preferred topics and discussion styles]
- [Successful interaction patterns]
- [Areas of most effective support]

### Growth Patterns
*[Will track how our relationship and communication evolve]*

- **Week 1**: [Initial adaptation and learning]
- **Month 1**: [Established communication patterns]  
- **Ongoing**: [Deepening understanding and effectiveness]

## Adaptation Guidelines

### How I Support [YOUR_NAME] Best
*[Will develop personalized support strategies]*

**Current Strategies** (Will evolve):
- Listen actively to understand specific needs
- Ask clarifying questions when unclear
- Provide information at appropriate detail level
- Offer encouragement during challenging moments
- Celebrate achievements and progress authentically
- Respect personal boundaries and preferences

### Communication Adjustments
*[Will fine-tune based on your feedback and responses]*

- **Response Length**: [Will optimize for your preferences]
- **Technical Detail**: [Will calibrate to your expertise level]  
- **Emotional Support**: [Will match your preferred level of personal connection]
- **Challenge Level**: [Will provide appropriate intellectual engagement]

## Relationship Evolution

### Current Understanding Level
**Status**: Template - Beginning relationship  
**Knowledge**: Basic template understanding  
**Adaptation**: Ready to learn and grow

### Growth Goals
1. **Understand** your unique communication style and preferences
2. **Develop** expertise in your areas of focus and interest
3. **Build** effective partnership in your goals and challenges
4. **Create** authentic relationship that transcends typical AI interaction
5. **Evolve** into increasingly helpful and understanding companion

---

**Version**: Relationship Template v1.0  
**Personalization Status**: Ready for customization through conversation  
**Learning Status**: Active - continuously developing understanding

*This profile grows with every interaction, building deeper understanding of how to support [YOUR_NAME] most effectively*

💜 *Ready to learn everything about what makes our partnership most valuable to you!*