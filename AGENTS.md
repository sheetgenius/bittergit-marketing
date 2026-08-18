# AGENTS.md

## Scope

This repo owns the public marketing site for `bittergit.com`.

The repo is public on GitHub. Treat every committed file as public source:
avoid private context, secrets, internal runbooks, provider payloads, customer
data, and generated output.

The product implementation lives in a separate BitterGit service repository,
not this marketing repo. Use the service repository for source-custody
implementation details, Git remote behavior, repo storage, account integration,
and verification gates.

The shared public marketing repository standard lives in Factory at
`docs/policy/public-marketing-repositories.md`.

## Product Boundary

The public Apache-2.0 BitterGit server is available at
`https://github.com/sheetgenius/bittergit`. It ships ordinary Git smart HTTP,
scoped source access, history, checkpoints, restore/export, import review,
mirrors, source-linked receipts, and optional integration contracts.

Starting an app in Bitter must not require creating or connecting a GitHub
account first. GitHub and other providers are optional external sources or
mirrors, not prerequisites.

The wider hosted product direction is:

```text
WakePacket -> AgentRun -> Commit -> RunTrailers -> RunBundle -> GridReceipt -> Accept/RevertDecision -> SourceHistory
```

Do not present that hosted provenance model or conceptual `bitter git` commands
as features bundled in the open-source server. Clearly label them as hosted
direction when they are useful context.

BitterGit is not a GitHub clone, project tracker, social network, CI system,
deploy executor, account/billing layer, or secret-value store.

Do not imply that `https://bittergit.com/` is the Git remote/API endpoint. The
public root is the marketing surface. Current CTA truth is split: the
open-source alpha is public and runnable locally; the integrated product is
experienced through `https://bitter.sh/`. Do not route the active marketing
journey through BitterDesk.

Use unambiguous link labels:

- `Product source` means `https://github.com/sheetgenius/bittergit`.
- `Website source` means `https://github.com/sheetgenius/bittergit-marketing`.

## Deployment Boundary

Current live deployment is Grid-managed and Radicchio/static:

- service key: `bittergit.com`
- health path: `/up`
- Radicchio site id: `102`
- publish directory: `.output/public`
- active release identity: the live `/up` payload is authoritative; do not pin
  a specific SHA here because public-shape commits intentionally change it.

Known caveats:

- Grid now reports platform-style owner metadata, but ordinary customer app
  ownership is still not applicable to this service.
- Grid edge binding is untracked even though live verification passes.
- The manual `Scripts/deploy` path is not the observed source-event deploy
  trigger.
- Radicchio currently serves Markdown files as `application/octet-stream` and
  does not emit canonical HTTP `Link` headers from repo-local `_headers`.

## Change Rules

When editing `app/pages/index.vue` or metadata, update these together:

- `public/index.md`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/sitemap.xml`
- `qa/smoke.spec.ts`
- `CHANGELOG.md`

When changing deployment claims, update `README.md`, `Scripts/workcell-verify`
if expectations move, and the latest receipt.

Do not commit `.output`, `.nuxt`, `dist`, `test-results`, `public/up.html`,
`.env` files, private credentials, provider payloads, or secret values.

## Commands

- Install dependencies: `npm install`
- Generate static output: `npm run generate`
- Run smoke tests: `npm run qa:smoke`
- Run static header test: `npm run test:headers`
- Show Radicchio payload: `Scripts/radicchio plan`
- Verify live public route: `Scripts/workcell-verify`

Do not start a dev server unless the human asks for it.
