# Contributing

This repository owns the public marketing site for `https://bittergit.com/`.

## Change Checklist

Before opening or merging a change, verify:

- README still explains BitterGit, its Bitter role, and this repo's boundary.
- Page copy changed in `app/pages/index.vue` and `public/index.md` together.
- `public/llms.txt`, `public/llms-full.txt`, `public/sitemap.xml`, and
  `public/robots.txt` are current.
- Page metadata includes canonical URL, description, Open Graph, Twitter, and a
  Markdown alternate.
- Smoke tests cover the changed public claim or route.
- Changelog records meaningful product-context, website, deployment, repository
  metadata, or public-hygiene changes.
- No private credentials, provider payloads, private Git data, customer data,
  operation logs, or generated output are included.

## Local Verification

```bash
npm install
npm run generate
npm run qa:smoke
npm run test:headers
```

`npm run qa:smoke` starts its own local static server when no
`PLAYWRIGHT_BASE_URL` is supplied.

## Deployment Notes

Current live deployment is Grid-managed and Radicchio/static. The manual
`Scripts/deploy` path requires `RADICCHIO_API_TOKEN`, but the observed current
deployment path is GitHub source event into BitterGrid build/deploy.

State whether a change is `source-shaped`, `deployed`, or `live-verified`, and
cite the source SHA plus Grid/live evidence when available.
