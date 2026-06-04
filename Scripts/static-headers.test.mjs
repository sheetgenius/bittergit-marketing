import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const expectedHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

function parseRootHeaders(source) {
  const headers = new Map()
  let inRootRule = false

  for (const line of source.split(/\r?\n/)) {
    if (line.trim() === '/*') {
      inRootRule = true
      continue
    }

    if (!inRootRule) continue
    if (line && !line.startsWith(' ') && !line.startsWith('\t')) break

    const match = line.trim().match(/^([^:]+):\s*(.+)$/)
    if (match) headers.set(match[1], match[2])
  }

  return headers
}

test('BitterGit static headers mirror the current Radicchio edge baseline', () => {
  const headers = parseRootHeaders(readFileSync('public/_headers', 'utf8'))

  for (const [name, value] of Object.entries(expectedHeaders)) {
    assert.equal(headers.get(name), value)
  }
})
