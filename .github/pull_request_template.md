## What this changes

<!-- One or two sentences. What is different after this PR? -->

## Why

<!-- What was wrong or missing. Link the issue if there is one. -->

## Checklist

- [ ] `npm run validate` exits clean
- [ ] `claude plugin validate .` passes (if this touches a plugin or the marketplace)
- [ ] Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] File and directory names are plain words a first-time reader would understand

### If this adds or changes a feature

- [ ] It has a `README.md` written for someone deciding whether to install it
- [ ] `SKILL.md` has valid frontmatter and its `name` matches the directory name
- [ ] The `description` lists real trigger phrases, not an abstract summary
- [ ] It has an `install.md`
- [ ] If it writes outside the repository, it has an `uninstall.md` — and I ran it
- [ ] I installed and used the feature myself, not just read the protocol

### If this touches memory writes or ingests external content

- [ ] External content is confirmed by the user before it reaches a memory file
- [ ] New memory lines carry provenance (`stated` / `inferred` / `external`)
- [ ] I read [SECURITY.md](../SECURITY.md)
