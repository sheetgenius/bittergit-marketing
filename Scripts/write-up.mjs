import { execSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const service = 'bittergit.com'
const hostname = 'bittergit.com'
const release = releaseSha()

mkdirSync(resolve(root, 'public'), { recursive: true })
writeFileSync(
  resolve(root, 'public/up.html'),
  JSON.stringify({
    ok: true,
    status: 'ok',
    service,
    hostname,
    app: 'BitterGit',
    git_sha: release,
    release,
    secret_material_returned: false,
  }) + '\n',
)

function releaseSha() {
  const sha =
    process.env.BITTERGIT_MARKETING_RELEASE_SHA ||
    process.env.RADICCHIO_RELEASE_SHA ||
    process.env.BITTERGRID_RELEASE_SHA ||
    process.env.BITTER_RELEASE ||
    process.env.VERSION ||
    process.env.GIT_SHA ||
    currentGitSha() ||
    'dev'

  return /^[0-9a-f]{40}$/i.test(sha) ? sha.toLowerCase() : sha
}

function currentGitSha() {
  try {
    return execSync('git rev-parse HEAD', {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    return ''
  }
}
