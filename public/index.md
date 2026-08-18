# BitterGit

BitterGit is an open-source, self-hosted Git service for AI coding agents. It
gives every app an ordinary Git repository from the beginning without making a
GitHub account part of setup.

## Why It Exists

Bitter is meant to remove the setup between an idea and a capable coding agent
getting to work. For someone who does not already use GitHub, creating and
connecting another account before the first repository exists is an avoidable
obstacle.

BitterGit makes the repository part of the prepared environment. Source stays
cloneable and exportable with standard Git tools. GitHub and other providers
can still be connected later as external sources or mirrors; they are options,
not prerequisites.

## What Ships Today

The public Apache-2.0 alpha provides:

- Git smart HTTP through standard Git plumbing
- repository-scoped read, write, and ref policy
- ref events, diff, checkpoints, restore, and export
- conservative folder, zip, and Git import review
- optional external mirrors
- source-linked records tied to exact commits
- optional account, workcell, agent, secret, and deploy integration contracts

The server is alpha software. Keep the demo path on loopback, use independent
backups, and read the security model before a network deployment.

## Place In Bitter

[Bitter](https://bitter.sh/) is a prepared workspace and CLI for agentic coding.
BitterGit owns the source-custody layer: the repository, scoped agent access,
recoverable history, and exact commit behind later work.

The wider hosted product is designed to connect that source to account-backed
setup, prepared workspaces, agent-run provenance, BitterGrid verification,
deploys, logs, support, and project history. Those services are not bundled in
the open-source BitterGit server.

## Boundary

BitterGit is not a GitHub clone, project tracker, social network, CI system,
deploy executor, account/billing layer, or secret-value store. The public
`bittergit.com` root is a marketing surface, not the Git remote or product API
endpoint.

## Current Status

The open-source BitterGit alpha is public and can be run locally today. The
integrated product can be experienced at https://bitter.sh/.

## Public Links

- Website: https://bittergit.com/
- Open-source BitterGit service: https://github.com/sheetgenius/bittergit
- Quick start: https://github.com/sheetgenius/bittergit#quick-start
- Website source: https://github.com/sheetgenius/bittergit-marketing
- Experience BitterGit in Bitter: https://bitter.sh/
- Health/release identity: https://bittergit.com/up
- AI index: https://bittergit.com/llms.txt
- Full AI context: https://bittergit.com/llms-full.txt
