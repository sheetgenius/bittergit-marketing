import { execFileSync } from 'node:child_process'

const gitSha = () => {
  for (const key of ['EXPECTED_GIT_SHA', 'GIT_SHA', 'SOURCE_VERSION', 'COMMIT_SHA']) {
    if (process.env[key]) return process.env[key]
  }

  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
  } catch (_) {
    return 'unknown'
  }
}

export default defineEventHandler(() => ({
  ok: true,
  service: 'bittergit.com',
  app: 'BitterGit',
  git_sha: gitSha(),
}))
