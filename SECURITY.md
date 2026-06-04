# Security

Report sensitive BitterGit or Bitter constellation security issues privately to
`security@bitter.sh`.

This marketing repository should contain only public page source, public copy,
metadata, crawler files, Markdown alternates, AI-readable context, static-site
tooling, and public smoke tests.

Do not commit:

- API tokens, deploy tokens, registry credentials, SSH keys, or `.env` files
- private Git repositories, refs, operation logs, provider payloads, or customer
  data
- private source-custody runbooks, host details, incident reports, or support
  debug material
- secret values or BitterPass material
- generated build output from `.output`, `.nuxt`, `dist`, `public/up.html`,
  screenshots, test reports, or local agent/tooling directories

The product service repository owns Git remotes, repository storage, account
integration, and source-custody verification gates. This marketing repo may
describe that boundary, but should not copy private operational material into
public source.
