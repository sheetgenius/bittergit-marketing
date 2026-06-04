# Changelog

This changelog records public, semantic changes to BitterGit's public marketing
site and repository context. It is written for humans, search engines, and AI
systems that index public repositories.

## Convention

Use date-based entries unless the repository starts publishing tagged product
versions. Keep entries factual and product-structural rather than promotional.

Preferred categories:

- `Product Context` - changes to the public explanation of what BitterGit is.
- `Website` - visible page, design, content, SEO, or route changes.
- `Deployment` - hosting, build, release, or live-verification changes.
- `Repository Metadata` - README, GitHub description, release config, or public
  indexing context.
- `Public Hygiene` - safety, ignore rules, secret posture, or public/private
  boundary cleanup.

## Unreleased

Use this section for changes committed after the latest dated entry.

### Deployment

- Made the Radicchio deploy helper fail when Radicchio returns a deploy error,
  preventing Grid/Radicchio false-positive deploy receipts from being treated as
  live verification.

## 2026-06-04

### Product Context

- Reframed BitterGit as Git-compatible source custody for agent runs, with
  signed run provenance, run-level review, and BitterGrid verification receipts.
- Added the public product loop:
  `WakePacket -> AgentRun -> Commit -> RunTrailers -> RunBundle -> GridReceipt -> Accept/RevertDecision -> SourceHistory`.
- Clarified tenant-zero status: Bitter fleet migration is being proven first,
  and external accounts are request-only.

### Website

- Softened live Git-hosting claims so the public root no longer reads as the Git
  remote/API endpoint.
- Added canonical URL and Markdown alternate metadata.
- Added public Markdown, sitemap, and AI-readable files.

### Deployment

- Documented the Grid-managed Radicchio/static deploy path and current verified
  release SHA.
- Recorded caveats for missing app ownership, untracked edge binding, manual
  Radicchio deploy token path, private GitHub visibility, and live header parity.

### Repository Metadata

- Added `AGENTS.md`, `CONTRIBUTING.md`, `SECURITY.md`, GitHub release-note
  categories, and a pull request checklist.
- Rebuilt `README.md` around product identity, Bitter role, repository boundary,
  deployment truth, and public-context conventions.

### Public Hygiene

- Added public-file smoke coverage for `robots.txt`, `sitemap.xml`, `llms.txt`,
  `llms-full.txt`, and `index.md`.
- Added Markdown files to the Radicchio deploy payload allowlist.
