const gitSha = () => {
  for (const key of [
    'BITTERGIT_MARKETING_RELEASE_SHA',
    'RADICCHIO_RELEASE_SHA',
    'BITTERGRID_RELEASE_SHA',
    'BITTER_RELEASE',
    'EXPECTED_GIT_SHA',
    'GIT_SHA',
    'SOURCE_VERSION',
    'COMMIT_SHA',
  ]) {
    if (process.env[key]) return process.env[key]
  }

  return 'unknown'
}

export default defineEventHandler(() => {
  const release = gitSha()

  return {
    ok: true,
    status: 'ok',
    service: 'bittergit.com',
    hostname: 'bittergit.com',
    app: 'BitterGit',
    git_sha: release,
    release,
    secret_material_returned: false,
  }
})
