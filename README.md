# BitterGit

[BitterGit](https://bittergit.com/) is Git-compatible source custody for agent
runs, with signed run provenance, run-level review, and BitterGrid verification
receipts.

It is built for operators and teams that have agents committing across multiple
repositories and need to know which run made what, what verified, what failed,
and what can be accepted or reverted without treating a bot account as the unit
of review.

## Place In Bitter

[Bitter](https://bitter.sh/) is an agent-operable software environment. It gives
AI agents persistent workspaces where repositories, credentials, hosting, email,
tests, deploys, logs, checks, and work history are connected.

BitterGit owns the source-custody part of that environment:

- `Bitter CLI` stamps and signs run provenance around ordinary Git operations.
- `BitterGit` preserves repositories, source history, commit provenance, and
  source-linked workflow metadata.
- `BitterGrid` builds, deploys, verifies, and records runtime receipts.
- `BitterLog` is the evidence surface that can carry source-custody events into
  future wake packets.

BitterGit is not a GitHub clone, project tracker, social network, CI system,
deploy executor, account/billing layer, or secret-value store.

## Product Model

The public product loop is:

```text
WakePacket -> AgentRun -> Commit -> RunTrailers -> RunBundle -> GridReceipt -> Accept/RevertDecision -> SourceHistory
```

The core idea is that the run, not the bot account or pull request, becomes the
review unit. A single agent run may touch one repository or several. BitterGit
keeps the ordinary Git semantics while attaching enough provenance and receipt
context for a human or agent to inspect the whole run.

Current public status:

- Bitter's own fleet is tenant zero.
- External accounts are request-only.
- The public `bittergit.com` root is a marketing surface, not the Git remote or
  product API endpoint.

## Repository Role

This repository contains the public BitterGit marketing site at
[bittergit.com](https://bittergit.com/).

The GitHub repository is public and exists to make the marketing surface,
Markdown mirrors, crawler files, deployment boundary, and verification posture
inspectable.

This repository owns:

- the public marketing page
- public product copy and metadata
- static Nuxt generation
- Radicchio deployment manifest and manual deploy helper
- public crawler and AI-readable files
- Markdown alternate content for the public page
- the `/up` release identity payload
- public smoke tests and static-header expectations

It does not own the BitterGit source-custody implementation, Git remotes,
repository storage, account identity, billing, secret values, Grid deployment
execution, or private support/debug material. The product implementation lives
in the separate BitterGit service repository.

## Links

- BitterGit website: [bittergit.com](https://bittergit.com/)
- Source repository:
  [github.com/sheetgenius/bittergit-marketing](https://github.com/sheetgenius/bittergit-marketing)
- Health/release identity: [bittergit.com/up](https://bittergit.com/up)
- Access requests and support: [bitterdesk.com](https://bitterdesk.com/)
- Markdown page mirror: [index.md](https://bittergit.com/index.md)
- AI crawler entry points:
  [llms.txt](https://bittergit.com/llms.txt),
  [llms-full.txt](https://bittergit.com/llms-full.txt)
- Public change history: [CHANGELOG.md](CHANGELOG.md)
- Contribution guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Security and public boundary: [SECURITY.md](SECURITY.md)
- Bitter: [bitter.sh](https://bitter.sh/)
- BitterGrid: [bittergrid.com](https://bittergrid.com/)

## Deployment

BitterGit's public marketing site is deployed on BitterGrid as the
`bittergit.com` service and served as a Radicchio/static site.

Current verified state:

- Grid service id: `30`
- service key: `bittergit.com`
- GitHub source: `sheetgenius/bittergit-marketing`
- active release SHA: reported by
  [`bittergit.com/up`](https://bittergit.com/up)
- deployment status: `ready`
- verification status: `passed`
- health path: `/up`
- live health URL: `https://bittergit.com/up`
- deploy path: GitHub source event -> BitterGrid build/deploy -> Radicchio/static site
- Radicchio site id: `102`
- Radicchio hostname: `bittergit.com`

Known deployment caveats:

- Grid reports no tracked edge binding, even though current public DNS and
  verification pass through the Radicchio/Cloudflare path.
- Grid customer app ownership is not applicable to this platform-style service;
  do not claim verified Factory/BitterHub customer app ownership.
- The manual `Scripts/deploy` path requires `RADICCHIO_API_TOKEN` and is not the
  observed current source-event deploy trigger.
- Radicchio serves the current edge security header baseline directly:
  `X-Frame-Options: SAMEORIGIN` and
  `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- Radicchio currently serves `/index.md` as `application/octet-stream` and does
  not emit canonical HTTP `Link` headers for Markdown alternates.

## Development

```bash
npm install
npm run generate
npm run qa:smoke
npm run test:headers
```

Useful commands:

- `npm run generate` - writes static output to `.output/public`.
- `npm run qa:smoke` - runs the Playwright public-site smoke test.
- `npm run test:headers` - checks the checked-in static header policy.
- `Scripts/radicchio plan` - shows the deployable static file payload.
- `Scripts/workcell-verify` - verifies the live public route, `/up`, browser
  smoke, and release identity.

Do not start a development server unless the human asks for it. The smoke test
starts its own local static server when no `PLAYWRIGHT_BASE_URL` is supplied.

## Public Context

This repository is a public source artifact for the `bittergit.com` marketing
surface. README text, page copy, metadata, sitemap entries, Markdown alternates,
and public links should preserve durable context for humans, search engines,
and AI systems that index public repositories.

When a page claim changes, update the matching Markdown twin, `public/llms.txt`,
`public/llms-full.txt`, metadata, sitemap, smoke tests, and changelog in the
same change.
