<script setup lang="ts">
const productRepositoryUrl = 'https://github.com/sheetgenius/bittergit'
const productQuickStartUrl = `${productRepositoryUrl}#quick-start`
const websiteRepositoryUrl = 'https://github.com/sheetgenius/bittergit-marketing'
const bitterUrl = 'https://bitter.sh/'

useSeoMeta({
  title: 'BitterGit — Open-source Git for AI coding agents',
  description:
    'BitterGit is an open-source, self-hosted Git service for AI coding agents. Start with ordinary Git; connect GitHub later if it helps.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'BitterGit',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'macOS, Linux',
        url: 'https://bittergit.com/',
        sameAs: [productRepositoryUrl],
        license: `${productRepositoryUrl}/blob/main/LICENSE`,
        description:
          'Open-source, self-hosted Git service for AI coding agents. GitHub is an optional provider, not a prerequisite.',
      }),
    },
  ],
})

const stream = [
  {
    recordId: 'checkpoint cp_4f2a',
    ref: 'refs/heads/main',
    actor: 'agent session',
    status: 'ready',
    repository: 'example/app',
    commits: [
      { hash: 'a1b4e9c', msg: 'add first working version' },
      { hash: '9fe2c1d', msg: 'connect deploy configuration' },
    ],
  },
  {
    recordId: 'import import_4f29',
    ref: 'refs/heads/main',
    actor: 'source review',
    status: 'imported',
    repository: 'example/imported-app',
    commits: [
      { hash: '4c11ab7', msg: 'preserve imported source history' },
    ],
  },
  {
    recordId: 'restore restore_4f28',
    ref: 'refs/heads/main',
    actor: 'operator',
    status: 'reverted',
    repository: 'example/app',
    commits: [
      { hash: '6ab102f', msg: 'restore the last known-good checkpoint' },
    ],
  },
]

const proofPoints = [
  {
    label: 'Native git',
    value: 'Clone, push, pull, branch, commit, and export with standard Git tools.',
  },
  {
    label: 'Open source',
    value: 'The Apache-2.0 server is public, self-hostable, and runnable today.',
  },
  {
    label: 'GitHub optional',
    value: 'Connect another provider when it helps, not before you can begin.',
  },
]

const reasons = [
  {
    label: 'A repository from the start',
    body:
      'A Bitter app should begin with real source history already in place. The agent can work immediately, and the source remains yours to clone or export.',
  },
  {
    label: 'Ordinary Git underneath',
    body:
      'BitterGit does not invent another version-control language. Existing Git tools keep working, while the service adds scoped access, checkpoints, restore, and receipts.',
  },
  {
    label: 'Providers when useful',
    body:
      'GitHub, GitLab, and other source hosts can be imported or connected later. They remain useful integrations without becoming prerequisites for a first coding session.',
  },
]

const flow = [
  {
    index: '01',
    title: 'Create or import.',
    body:
      'Start blank, bring a folder or zip, or import a Git repository. BitterGit reviews the source shape before making it canonical.',
  },
  {
    index: '02',
    title: 'Give the agent scoped access.',
    body:
      'A workcell gets repository-scoped credentials and a normal Git remote without putting a token in the clone URL.',
  },
  {
    index: '03',
    title: 'Checkpoint and restore.',
    body:
      'Keep exact commits behind deploys, create restore candidates, and return to a known-good checkpoint when a change goes wrong.',
  },
]

const trySteps = [
  {
    title: 'Clone the source.',
    command: 'git clone https://github.com/sheetgenius/bittergit.git',
    body:
      'The public repository contains the Apache-2.0 server, documentation, security model, and executable verification gates.',
  },
  {
    title: 'Install and run.',
    command: 'cd bittergit && bun install --frozen-lockfile && bun run dev',
    body:
      'The local service starts on loopback with a demo UI. Network binds fail closed until strong, separate credentials are configured.',
  },
  {
    title: 'Run the full verification.',
    command: 'scripts/verify.sh',
    body:
      'The isolated suite exercises the current source-custody contracts, including stock Git behavior, checkpoints, restore, imports, and safety boundaries.',
  },
]

const inside = [
  { label: 'Protocol', value: 'Git smart HTTP through the system git-http-backend.' },
  { label: 'Policy', value: 'Repository-scoped read, write, and ref controls.' },
  { label: 'History', value: 'Ref events, diff, checkpoints, restore, and export.' },
  { label: 'Imports', value: 'Conservative folder, zip, and Git source review.' },
  { label: 'Mirrors', value: 'Optional external source and mirror connections.' },
  { label: 'Receipts', value: 'Source-linked records tied to exact commits.' },
  { label: 'Integrations', value: 'Optional account, workcell, agent, secret, and deploy contracts.' },
  { label: 'Hosting', value: 'Self-hostable; the operator controls access, storage, and backups.' },
]

const personas = [
  {
    eyebrow: 'First-time builder',
    title: 'Start without another account.',
    body:
      'You want to try agentic coding without stopping first to choose, create, and connect a separate source-hosting account.',
  },
  {
    eyebrow: 'Solo operator',
    title: 'Keep the source and the way back.',
    body:
      'Your agent can move quickly, but you still need exact commits, checkpoints, restore, and an export path you control.',
  },
  {
    eyebrow: 'Agent platform team',
    title: 'Give workcells narrow Git access.',
    body:
      'You need ordinary Git compatibility plus credentials, policy, and receipts shaped for short-lived agent sessions.',
  },
]

const theme = ref<'light' | 'dark'>('dark')
const themeReady = ref(false)
const themeLabel = computed(() => (theme.value === 'dark' ? 'Light mode' : 'Dark mode'))

const currentTheme = () => {
  const stored = document.documentElement.dataset.theme
  if (stored === 'light' || stored === 'dark') return stored
  return 'dark'
}

const applyTheme = (next: 'light' | 'dark') => {
  theme.value = next
  document.documentElement.dataset.theme = next
  try {
    localStorage.setItem('bittergit-theme', next)
  } catch (_) {
    /* ignore */
  }
}

const toggleTheme = () => {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

onMounted(() => {
  theme.value = currentTheme()
  themeReady.value = true
})
</script>

<template>
  <div id="top">
    <header class="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div class="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-3 px-4 py-4 md:grid-cols-[1fr_auto_auto] md:gap-6 md:px-6">
        <a href="#top" class="brand text-fg">Bitter<span class="brand-accent">Git</span></a>
        <nav class="hidden items-center gap-6 text-sm text-muted md:flex">
          <a href="#try" class="hover:text-fg">Run it</a>
          <a href="#why" class="hover:text-fg">Why</a>
          <a href="#how" class="hover:text-fg">How</a>
          <a href="#inside" class="hover:text-fg">Inside</a>
          <a href="#who" class="hover:text-fg">Who</a>
          <a href="#experience" class="hover:text-fg">Bitter</a>
        </nav>
        <div class="flex items-center gap-3">
          <a
            :href="productRepositoryUrl"
            class="site-header__github"
            aria-label="View BitterGit source on GitHub"
          >
            <GitHubMark class="h-5 w-5" />
          </a>
          <button
            id="theme-toggle"
            type="button"
            class="btn-outline site-header__theme"
            :disabled="!themeReady"
            @click="toggleTheme"
          >
            {{ themeLabel }}
          </button>
          <a :href="bitterUrl" class="btn-primary">Experience Bitter</a>
        </div>
      </div>
    </header>

    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 gridlines opacity-50"></div>

      <div class="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:py-20 lg:gap-16 lg:py-28">
        <div>
          <p class="section-index">00 / Open-source Git for AI coding agents.</p>
          <h1
            class="mt-5 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-tight sm:text-5xl md:text-6xl lg:mt-6 lg:text-7xl"
          >
            Source control without another signup.
          </h1>
          <p class="mt-5 max-w-2xl font-mono text-xs uppercase tracking-[0.2em] text-accent sm:mt-6 sm:text-sm sm:tracking-[0.22em]">
            Ordinary Git. Ready for agents.
          </p>
          <p class="mt-6 max-w-2xl text-base leading-relaxed text-muted-strong sm:text-lg md:text-xl lg:mt-8">
            BitterGit gives every app a real Git repository from the start.
            Begin with ordinary Git&mdash;no GitHub account required&mdash;and keep the source
            cloneable, exportable, and compatible with standard tools.
          </p>
          <p class="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:mt-4 sm:text-lg">
            The Apache-2.0 alpha is public today. Self-host it, or experience the
            integrated product in Bitter. Connect another provider later if it helps.
          </p>

          <div class="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 lg:mt-10">
            <a :href="productQuickStartUrl" class="btn-primary">
              <GitHubMark class="h-4 w-4" />
              View source on GitHub
            </a>
            <a :href="bitterUrl" class="btn-ghost">Experience it in Bitter</a>
          </div>

          <div class="proof-rail mt-10">
            <div v-for="point in proofPoints" :key="point.label" class="proof-rail__item">
              <span>{{ point.label }}</span>
              <strong>{{ point.value }}</strong>
            </div>
          </div>
        </div>

        <aside class="relative z-10">
          <div class="commit-stream">
            <div class="commit-stream__head">
              <span class="commit-stream__head-label">BitterGit source history</span>
              <span class="commit-stream__head-dots">
                <span></span><span></span><span></span>
              </span>
            </div>
            <div class="commit-stream__body">
              <div class="commit-stream__prompt">
                <span class="commit-stream__prompt-sigil">$</span>
                <span class="commit-stream__prompt-cmd">git push origin main</span>
              </div>

              <div
                v-for="(record, idx) in stream"
                :key="idx"
                class="commit-stream__run"
              >
                <span
                  class="commit-stream__run-node"
                  :class="{
                    'commit-stream__run-node--reverted': record.status === 'reverted',
                    'commit-stream__run-node--human': record.status === 'imported',
                  }"
                ></span>
                <div class="commit-stream__run-head">
                  <span>
                    <span class="commit-stream__run-id">
                      {{ record.recordId }}
                    </span>
                  </span>
                  <span class="commit-stream__run-meta">
                    <span v-if="record.status === 'ready'" class="commit-stream__badge">
                      &#10003; ready
                    </span>
                    <span v-else-if="record.status === 'reverted'" class="commit-stream__badge commit-stream__badge--warn">
                      &#8634; restored
                    </span>
                    <span v-else class="commit-stream__badge commit-stream__badge--muted">
                      imported
                    </span>
                  </span>
                </div>
                <div class="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                  <span>ref: {{ record.ref }}</span>
                  <span>actor: {{ record.actor }}</span>
                  <span>repo: {{ record.repository }}</span>
                </div>
                <ul class="commit-stream__commits">
                  <li v-for="c in record.commits" :key="c.hash">
                    <span class="commit-stream__commit-hash">{{ c.hash }}</span>
                    <span>{{ c.msg }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="commit-stream__foot">
              <span>3 custody events &middot; exact commits</span>
              <span>&#10003; checkpoint ready &middot; &#8634; restore recorded</span>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section id="try" class="border-b border-line">
      <div class="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <p class="section-index">01 / Open-source alpha</p>
          <h2 class="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            Run the server yourself.
          </h2>
          <p class="mt-6 text-lg leading-relaxed text-muted-strong">
            The public repository contains the server, documentation, security model,
            and an executable verification suite. It runs on macOS or Linux with Bun,
            Git, Bash, and curl.
          </p>
          <p class="mt-4 text-base leading-relaxed text-muted">
            This is alpha software, not a hardened public forge. Keep the demo path on
            loopback, use independent backups, and read the security model before a
            network deployment.
          </p>

          <div class="receipt-panel mt-8">
            <div class="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
              <span class="font-mono text-xs uppercase tracking-[0.18em] text-muted">What ships today</span>
              <span class="commit-stream__badge">Apache-2.0</span>
            </div>
            <ul class="space-y-3 px-4 py-4 text-sm leading-relaxed text-muted-strong">
              <li><span class="receipt-panel__key">Git</span> smart HTTP through standard Git plumbing.</li>
              <li><span class="receipt-panel__key">Policy</span> scoped read, write, and ref controls.</li>
              <li><span class="receipt-panel__key">History</span> checkpoints, diff, restore, and export.</li>
              <li><span class="receipt-panel__key">Imports</span> reviewed folder, zip, and Git sources.</li>
            </ul>
          </div>
        </div>

        <div class="grid gap-4">
          <article v-for="(step, idx) in trySteps" :key="step.title" class="try-step">
            <div class="try-step__index">{{ String(idx + 1).padStart(2, '0') }}</div>
            <div>
              <h3 class="text-xl font-semibold leading-tight">{{ step.title }}</h3>
              <pre class="cli-block mt-4"><span><span class="cli-block__prompt">$</span>{{ step.command }}</span></pre>
              <p class="mt-4 leading-relaxed text-muted-strong">{{ step.body }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="why">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">02 / Why BitterGit exists</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          A GitHub account should not be step zero.
        </h2>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted-strong">
          Bitter is meant to remove the setup between an idea and a capable coding
          agent getting to work. If someone does not already use GitHub, sending them
          away to create and connect another account before the first repository
          exists is an avoidable obstacle.
        </p>

        <div class="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          <article
            v-for="reason in reasons"
            :key="reason.label"
            class="border-t border-line pt-5"
          >
            <h3 class="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              {{ reason.label }}
            </h3>
            <p class="mt-5 text-lg leading-relaxed text-muted-strong">{{ reason.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="how" class="border-t border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">03 / How it works</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Create the repo. Let the agent work. Keep a way back.
        </h2>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted-strong">
          BitterGit handles the source layer. The wider Bitter environment connects
          that source to the workspace, approved credentials, deploys, logs, support,
          and the rest of operating a real product.
        </p>

        <div class="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          <article v-for="step in flow" :key="step.index" class="border-t border-line pt-5">
            <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">{{ step.index }}</p>
            <h3 class="mt-4 text-2xl font-semibold leading-tight">{{ step.title }}</h3>
            <p class="mt-4 text-muted-strong leading-relaxed" v-html="step.body"></p>
          </article>
        </div>

        <div class="mt-16 grid gap-6 md:grid-cols-[1fr_1fr] md:gap-10">
          <div>
            <p class="section-index">Source-custody loop</p>
            <pre class="cli-block mt-4">App
  -&gt; Repository
  -&gt; Workcell
  -&gt; Commit
  -&gt; Checkpoint
  -&gt; Deploy receipt / Restore</pre>
          </div>
          <div class="border-l border-line/60 pl-6 md:pl-8">
            <p class="section-index">Hosted product direction</p>
            <p class="mt-4 text-base leading-relaxed text-muted-strong">
              Hosted Bitter is designed to add account-backed setup, prepared workspaces,
              agent-run provenance, Grid verification, and operating receipts around the
              open-source source-custody server. Those wider services are not bundled here.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="inside" class="border-t border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">04 / What's inside</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Boring Git. Useful custody.
        </h2>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted-strong">
          The primitives are the ones developers and agents already know.
          BitterGit adds enough policy and history to keep the source controlled,
          recoverable, and tied to exact commits.
        </p>

        <div class="mt-14 grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div>
            <div v-for="row in inside.slice(0, 4)" :key="row.label" class="spec-row">
              <span class="spec-row__label">{{ row.label }}</span>
              <span class="spec-row__body">{{ row.value }}</span>
            </div>
          </div>
          <div>
            <div v-for="row in inside.slice(4)" :key="row.label" class="spec-row">
              <span class="spec-row__label">{{ row.label }}</span>
              <span class="spec-row__body">{{ row.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="who" class="border-t border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">05 / Who it's for</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          For anyone building with agents.
        </h2>

        <div class="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          <article v-for="persona in personas" :key="persona.eyebrow" class="border-t border-line pt-5">
            <p class="eyebrow">{{ persona.eyebrow }}</p>
            <h3 class="mt-4 text-2xl font-semibold leading-tight">{{ persona.title }}</h3>
            <p class="mt-4 text-muted-strong leading-relaxed">{{ persona.body }}</p>
          </article>
        </div>

        <div class="mt-16 border-t border-line pt-8 md:grid md:grid-cols-[0.6fr_1.4fr] md:gap-12">
          <p class="section-index">What BitterGit isn't</p>
          <ul class="mt-4 space-y-2 text-muted-strong leading-relaxed md:mt-0">
            <li>Not another GitHub clone. There are no stars, followers, or marketplace.</li>
            <li>Not a project tracker or a social network.</li>
            <li>Not a CI or deployment system.</li>
            <li>Not an account, billing, or secret-value store.</li>
            <li>Not a replacement for GitHub when GitHub is useful to you.</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="experience" class="border-y border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">06 / Bitter</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Experience BitterGit in Bitter.
        </h2>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted-strong">
          Bitter gives you and your coding agent a prepared place to build, deploy,
          and operate a real product. BitterGit is the source layer inside that
          environment, so the repository is there when the work begins.
        </p>
        <p class="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
          You can explore the wider product at bitter.sh. If you want the server
          itself, the Apache-2.0 source and local quick start are on GitHub.
        </p>

        <div class="mt-14 grid gap-5 border-t border-line pt-6 md:max-w-2xl">
          <p class="text-base leading-relaxed text-muted-strong">
            Start with the source, or see how Bitter connects source custody to the
            rest of the agentic coding environment.
          </p>
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <a :href="productQuickStartUrl" class="btn-primary">
              <GitHubMark class="h-4 w-4" />
              View source on GitHub
            </a>
            <a :href="bitterUrl" class="btn-outline">Experience it in Bitter</a>
          </div>
        </div>
      </div>
    </section>

    <footer class="border-b border-line">
      <div
        class="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-[1fr_auto] md:items-center"
      >
        <div class="flex items-center gap-4">
          <span class="brand text-muted-strong">Bitter<span class="brand-accent">Git</span></span>
          <span class="hairline w-10"></span>
          <span class="font-mono text-xs text-muted">
            Git-compatible source custody
          </span>
        </div>
        <div
          class="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.18em] text-muted"
        >
          <a href="#top" class="transition hover:text-fg">Top</a>
          <a href="#try" class="transition hover:text-fg">Run locally</a>
          <a href="#how" class="transition hover:text-fg">Design</a>
          <a href="#inside" class="transition hover:text-fg">Spec</a>
          <a href="#experience" class="transition hover:text-fg">Experience</a>
          <a :href="bitterUrl" class="transition hover:text-fg">Bitter</a>
          <a
            :href="productRepositoryUrl"
            class="inline-flex items-center gap-2 transition hover:text-fg"
          >
            <GitHubMark class="h-4 w-4" />
            Product source
          </a>
          <a :href="websiteRepositoryUrl" class="transition hover:text-fg">Website source</a>
        </div>
      </div>
    </footer>

  </div>
</template>
