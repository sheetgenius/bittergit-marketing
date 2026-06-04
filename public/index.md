# BitterGit

BitterGit is Git-compatible source custody for agent runs, with signed run
provenance, run-level review, and BitterGrid verification receipts.

## What It Is

BitterGit keeps ordinary Git semantics while attaching source-custody context
around agent work. The run, not the bot account or pull request, becomes the
review unit.

The public product loop is:

```text
WakePacket -> AgentRun -> Commit -> RunTrailers -> RunBundle -> GridReceipt -> Accept/RevertDecision -> SourceHistory
```

## User And Job

BitterGit is built for operators and teams whose agents commit across multiple
repositories. They need to know which run made what, what verified, what failed,
and what can be accepted or reverted without clicking through a pile of pull
requests or trusting a generic bot identity.

## Place In Bitter

Bitter CLI stamps and signs run provenance around ordinary Git operations.
BitterGit preserves repositories, source history, commit provenance, and
source-linked workflow metadata. BitterGrid builds, deploys, verifies, and
records runtime receipts. BitterLog can preserve the source-custody evidence for
future wake packets.

## Boundary

BitterGit is not a GitHub clone, project tracker, social network, CI system,
deploy executor, account/billing layer, or secret-value store.

The public `bittergit.com` root is a marketing surface, not the Git remote or
product API endpoint.

## Current Status

Bitter's own fleet is tenant zero. External accounts are request-only. The
public marketing site is live and Grid-verified at the release reported by
`https://bittergit.com/up`.

## Public Links

- Website: https://bittergit.com/
- Health/release identity: https://bittergit.com/up
- AI index: https://bittergit.com/llms.txt
- Full AI context: https://bittergit.com/llms-full.txt
- Bitter: https://bitter.sh/
- BitterGrid: https://bittergrid.com/

The GitHub repository for this marketing site is still private. Do not cite it
as a public repository until visibility changes intentionally.
