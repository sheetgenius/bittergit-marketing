import { execSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const service = 'bittergit'
const gitSha =
  process.env.BITTERGRID_RELEASE_SHA ||
  process.env.VERSION ||
  process.env.GIT_SHA ||
  currentGitSha() ||
  'dev'

mkdirSync(resolve(root, 'public'), { recursive: true })
writeFileSync(
  resolve(root, 'public/up.html'),
  JSON.stringify({ ok: true, status: 'ok', service, git_sha: gitSha }) + '\n',
)

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
