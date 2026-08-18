# BitterGit

[BitterGit](https://bittergit.com/) is Git-compatible source custody for AI
coding agents. It gives each Bitter app a real repository without making a
GitHub account part of the setup.

It keeps the Git semantics developers already trust. The broader
[Bitter](https://bitter.sh/) product is designed to connect each change to the
agent run, verification, and decision around it. People who already use GitHub
or another provider can connect it when useful; people who do not can start
without one.

## Why It Exists

Bitter is meant to remove the obstacles between an idea and a capable coding
agent getting to work. For someone who does not already use GitHub, leaving
that flow to create another account and connect it before the first repository
exists is an avoidable setup step.

BitterGit makes the repository part of the prepared environment. In hosted
Bitter, an app is designed to start with ordinary Git, recoverable history, and
scoped agent access in place. Its source remains cloneable and exportable with
standard tools, while GitHub and other providers stay available as optional
external sources or mirrors rather than prerequisites.

## Place In Bitter

[Bitter](https://bitter.sh/) is a prepared workspace and CLI for agentic coding.
It gives AI agents a place where repositories, credentials, hosting, tests,
deploys, logs, customer channels, and work history are connected. The CLI can
be used locally without an account. The integrated product can be experienced
at [bitter.sh](https://bitter.sh/).

At full integration, the components have these roles:

- `BitterGit` gives the app a Git-compatible source home and preserves its
  history, commit provenance, and source-linked workflow metadata.
- `Bitter CLI` stamps and signs run provenance around ordinary Git operations.
- `BitterGrid` builds, deploys, verifies, and records runtime receipts.
- `BitterLog` is the evidence surface that can carry source-custody events into
  future wake packets.

BitterGit is not a GitHub clone, project tracker, social network, CI system,
deploy executor, account/billing layer, or secret-value store.

The [open-source BitterGit service](https://github.com/sheetgenius/bittergit)
is the Apache-2.0 alpha that can be run today. It provides ordinary Git smart
HTTP, scoped access, history, checkpoints, restore and export, imports, mirrors,
and source-linked receipts. The wider account, workspace, provenance,
verification, and operations model described below is the hosted Bitter
direction, not a claim that every component ships in the open-source server.

## Hosted Product Direction

The setup path is deliberately short:

```text
Idea -> Bitter app -> BitterGit repository -> Agent workspace -> First commit
```

Once agents are working, the intended source-custody loop is:

```text
WakePacket -> AgentRun -> Commit -> RunTrailers -> RunBundle -> GridReceipt -> Accept/RevertDecision -> SourceHistory
```

The design is for the run, not the bot account or pull request, to become the
review unit. A single agent run may touch one repository or several. BitterGit
keeps the ordinary Git semantics while attaching enough provenance and receipt
context for a human or agent to inspect the whole run.

Current public status:

- The Apache-2.0 BitterGit alpha is public and can be run locally today.
- Bitter is proving the hosted integration on its own services first.
- The Bitter CLI can be installed and used locally without an account.
- The integrated Bitter product can be experienced at
  [bitter.sh](https://bitter.sh/).
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
in the separate
[BitterGit service repository](https://github.com/sheetgenius/bittergit).

## Links

- Experience BitterGit in Bitter: [bitter.sh](https://bitter.sh/)
- BitterGit website: [bittergit.com](https://bittergit.com/)
- Open-source BitterGit service:
  [github.com/sheetgenius/bittergit](https://github.com/sheetgenius/bittergit)
- This website's source:
  [github.com/sheetgenius/bittergit-marketing](https://github.com/sheetgenius/bittergit-marketing)
- Health/release identity: [bittergit.com/up](https://bittergit.com/up)
- Markdown page mirror: [index.md](https://bittergit.com/index.md)
- AI crawler entry points:
  [llms.txt](https://bittergit.com/llms.txt),
  [llms-full.txt](https://bittergit.com/llms-full.txt)
- Public change history: [CHANGELOG.md](CHANGELOG.md)
- Contribution guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Security and public boundary: [SECURITY.md](SECURITY.md)
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

Use a Nuxt-supported Node release: Node 22.19+, 24.11+, or 26+.

```bash
npm ci
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
