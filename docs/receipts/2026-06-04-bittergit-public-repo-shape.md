# BitterGit Public Repo Shape Receipt - 2026-06-04

## Status

- Local repo: `/Users/c3po/co/bittergit-marketing`
- Status: `source-shaped`
- Branch: `main`
- Starting source SHA: `a99511f197ef2b44cb2572daa3a706410782fa9a`
- Remote `origin/main` at preflight:
  `a99511f197ef2b44cb2572daa3a706410782fa9a`
- Active live SHA at preflight:
  `a99511f197ef2b44cb2572daa3a706410782fa9a`
- Final source commit: the commit containing this receipt

This pass does not claim `live-verified`. Live is current for the starting SHA,
but the public-shape changes in this commit still need Grid source reconciliation
and live route/header verification after deployment.

## Deploy Executor And Service Boundary

- Grid service id: `30`
- service key: `bittergit.com`
- service name: `BitterGit`
- host: `bittergrid-01`
- state: `running`
- health: `healthy`
- deploy status: `ready`
- verification status: `passed`
- health path: `/up`
- health URL: `https://bittergit.com/up`
- source repo: `git@github.com:sheetgenius/bittergit-marketing.git`
- deploy root: `/opt/factory/repos/bittergit-marketing`
- deployment path: GitHub source event -> BitterGrid build/deploy ->
  Radicchio/static site
- Radicchio site id: `102`
- Radicchio hostname: `bittergit.com`

Known caveats:

- GitHub reports `sheetgenius/bittergit-marketing` as private.
- Grid app ownership is missing/verified `no`.
- Grid edge binding is untracked even though the deployment verifies.
- Live root and `/up` headers differ from checked-in `_headers`; header parity
  must be verified after deploy before claiming it.
- The public `bittergit.com` root is not the product Git remote/API endpoint.

## Live Routes Checked Before This Pass

| Route | Status |
| --- | --- |
| `/` | 200 |
| `/up` | 200, release identity matched starting SHA |
| `/robots.txt` | 200 |
| `/sitemap.xml` | 404 |
| `/llms.txt` | 404 |
| `/llms-full.txt` | 404 |
| `/index.md` | 404 |

## Story Gate

- Product sentence: BitterGit is Git-compatible source custody for agent runs,
  with signed run provenance, run-level review, and BitterGrid verification
  receipts.
- User and job: operators with agents committing across multiple repos need to
  know which run made what, what verified, what failed, and what can be accepted
  or reverted without bot-account fiction or pull-request sprawl.
- Object loop:

```text
WakePacket -> AgentRun -> Commit -> RunTrailers -> RunBundle -> GridReceipt -> Accept/RevertDecision -> SourceHistory
```

- Bitter role: source custody and source-linked workflow metadata for Bitter
  apps and workcells.
- Boundary: not a GitHub clone, project tracker, social network, CI system,
  deploy executor, account/billing layer, or secret-value store.
- Live proof: root page, `/up` release identity, Grid ready/passed deployment,
  and starting SHA parity.
- Claim ledger:
  - live-proven before this pass: public root, `/up`, active deployed SHA,
    request-access CTA, Grid ready/passed state.
  - source-proven in this pass: README, AGENTS, changelog, public Markdown,
    llms files, sitemap, canonical/alternate metadata, smoke coverage.
  - private/restricted: GitHub repository visibility, app ownership proof,
    Radicchio token status, private product implementation.
  - future/remove/soften: public Git remote/API at `bittergit.com`, SSH Git,
    public repo browsing, live header parity until deployed and verified.
- CTA truth: request access only; Bitter fleet is tenant zero.

## Copy Improvement

Old weak claim:

```text
BitterGit is git hosting for agent fleets and agent-run work loops.
```

Sharper claim:

```text
BitterGit is Git-compatible source custody for agent runs.
```

The page now keeps the run-provenance story but adds tenant-zero status and
avoids implying the public marketing root is already the Git remote/API
endpoint.

## Public Files Added Or Updated

- `README.md`
- `AGENTS.md`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `.github/release.yml`
- `.github/pull_request_template.md`
- `app/pages/index.vue`
- `nuxt.config.ts`
- `public/index.md`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/sitemap.xml`
- `public/robots.txt`
- `qa/smoke.spec.ts`
- `Scripts/radicchio`
- `public/_headers`
- `Scripts/postdeploy-verify`

## Verification

Passed locally:

```bash
npm run qa:smoke
npm run test:headers
Scripts/radicchio plan
```

`Scripts/radicchio plan` produced a 21-file static payload including:

- `index.html`
- `index.md`
- `llms.txt`
- `llms-full.txt`
- `robots.txt`
- `sitemap.xml`
- `up.html`

Warnings:

- `Scripts/radicchio plan` emitted Node engine warnings because this shell used
  Node `v25.8.1`, while Nuxt/Nitro packages request `^22.12.0 || ^24.11.0 ||
  >=26.0.0`. The install and generate steps still completed.

Live/deploy blocker:

```bash
Scripts/workcell-verify
```

Failed before deploy in `postdeploy_verify` because the live root is still the
old deployed surface and currently lacks the checked-in CSP header:

```text
Unexpected Content-Security-Policy at https://bittergit.com/
Observed: <missing>
```

The public Markdown/LLM routes also remain live `404` until the new source is
deployed through Grid.

## Follow-Up Deploy Attempt

After the source-shaped commit was pushed, Grid accepted
`sheetgenius/bittergit-marketing@2a194884ac5ce569ff7eca23d714942278e64509`:

- build operation `13202` succeeded;
- deployment operation `13204` completed;
- deployment `2530` reported `ready`;
- Grid verification reported `passed`;
- `bitter grid services source check bittergit.com` reported remote, desired,
  and release all at `2a194884ac5ce569ff7eca23d714942278e64509`.

That was not enough to call the site live-current. The operation log for
`13204` showed the Radicchio deploy response contained:

```text
File extension not allowed: .md (index.md)
```

The public edge still served the old `/up` release identity
`a99511f197ef2b44cb2572daa3a706410782fa9a`, and `/sitemap.xml`, `/llms.txt`,
`/llms-full.txt`, and `/index.md` still returned 404. Treat this as a
Radicchio publish rejection plus false-positive Grid/Radicchio receipt, not as
a live-verified deployment.

The repo-local deploy helper now aborts when Radicchio returns a deploy error,
so future deploy attempts fail loudly instead of wrapping the error in a
`status: deployed` payload.

Remaining deployment dependency:

- Radicchio backend must support `.md` static deploy files and be live before
  this site can publish the BitterClip-style Markdown twin.

## Reviews Used

X-High deploy/boundary reviewer:

- Confirmed Grid service `bittergit.com` is ready/passed at the starting SHA.
- Confirmed runtime shape is Grid-managed Radicchio/static.
- Flagged missing app ownership, untracked edge binding, private GitHub repo
  visibility, live header mismatch, and public-root-not-Git-remote caveats.

X-High story/copy reviewer:

- Confirmed the strongest story is ordinary Git commits grouped by the run that
  produced them, with signed provenance and Grid receipts.
- Flagged overcomplete live-product language around receive hooks, BitterLog
  emission, SSH, public remotes, and "any client" claims.
- Recommended a tenant-zero/request-only status line.

Opus 4.8 Max grounding review:

- Attempted through local Claude CLI with a compact grounding packet.
- Blocked: the command produced no output for more than a minute and was killed;
  the process exited with code `143`.

## Next-Repo Lesson

For ordinary Grid-managed satellites, live SHA parity is not enough. Public
source shape still needs GitHub visibility, Markdown/LLM routes, canonical
metadata, route smoke, deploy-source reconciliation, and live header verification
before the repo can be called `live-verified`.
