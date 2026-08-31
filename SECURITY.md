# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅ |

Recall is a markdown project with no runtime and no dependencies, so there is
no patch stream in the usual sense. Fixes land on `main` and ship in the next
release.

## Reporting a vulnerability

Report privately through GitHub's **[private vulnerability
reporting](https://github.com/mhdmirzaaa/recall/security/advisories/new)** —
the Security tab on the repository. Please do not open a public issue for
anything exploitable.

Include what you would want to receive: which file, what an attacker can cause,
and the smallest sequence of steps that demonstrates it.

You should get an acknowledgement within a week. If a report is valid, the fix
and the advisory go out together.

## Scope

The interesting attack surface here is not code execution — it is what gets
written into memory files and what runs from `~/.claude/hooks/`. In particular:

- Content that reaches a memory file from outside the conversation
- Anything installed into the user's hooks directory
- Credentials handled by the features that call paid APIs

A full threat model, including how memory poisoning works against a system like
this one and how to audit a memory file you do not trust, is documented below
the fold in this file as the project matures.
