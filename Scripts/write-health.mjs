import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'

const gitSha = (() => {
  for (const key of ['EXPECTED_GIT_SHA', 'GIT_SHA', 'SOURCE_VERSION', 'COMMIT_SHA']) {
    if (process.env[key]) return process.env[key]
  }

  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
  } catch (_) {
    return 'unknown'
  }
})()

const payload = {
  ok: true,
  service: 'bittergit.com',
  app: 'BitterGit',
  git_sha: gitSha,
}

rmSync('public/up', { force: true, recursive: true })
mkdirSync('public/up', { recursive: true })
writeFileSync('public/up/index.html', `${JSON.stringify(payload)}\n`)
