<script setup lang="ts">
useSeoMeta({
  title: 'BitterGit — Agent-native source control',
  description:
    'BitterGit is agent-native source control. Every commit carries its run, its wake, and its receipt — tied to the loop that produced it and the verification that cleared it. Gets it done.',
})

const stream = [
  {
    runId: 'run_4f2a',
    wakeId: 'wake_0129',
    agent: 'factory-agent',
    status: 'verified',
    repos: 'bittergrid · factory · bitterpass',
    commits: [
      { hash: 'a1b4e9c', msg: 'wire deploy verifier to grid source path' },
      { hash: '9fe2c1d', msg: 'collapse two-phase mirror writer' },
      { hash: '7d301a3', msg: 'add regression test for wake lineage' },
    ],
  },
  {
    runId: 'run_4f29',
    wakeId: 'wake_0128',
    agent: 'goltmund-agent',
    status: 'verified',
    repos: 'bitterpass',
    commits: [
      { hash: '4c11ab7', msg: 'tighten Ed25519 envelope validation' },
    ],
  },
  {
    runId: 'run_4f28',
    wakeId: 'wake_0127',
    agent: 'factory-agent',
    status: 'reverted',
    repos: 'bittergrid',
    commits: [
      { hash: '6ab102f', msg: 'refactor runtime topology audit — reverted, probes failed' },
    ],
  },
  {
    runId: null,
    wakeId: null,
    agent: 'michael',
    status: 'human',
    repos: 'factory',
    commits: [
      { hash: 'e39a2b1', msg: 'fix oncall runbook typo' },
    ],
  },
]

const reasons = [
  {
    label: 'Run-linked by construction',
    body:
      'Every agent commit carries a signed Run-Id and Wake-Id trailer, stamped by the Bitter CLI at commit time. The chain from wake packet to diff to verification is a property of the commit itself — not a database the server has to keep in sync.',
  },
  {
    label: 'The run is the review unit',
    body:
      'A single run can produce one commit or forty, across one repo or three. Instead of forcing that into a pull request, BitterGit groups commits by the run that made them. Accept, revert, or supersede at the run level. PR theater, retired.',
  },
  {
    label: 'Boring git underneath',
    body:
      'Clone, push, pull, branch, tag, blame, log — they all work the way you already know. The provenance is a trailer on the commit, not a new protocol to learn. Any git client can read a BitterGit repo.',
  },
]

const flow = [
  {
    index: '01',
    title: 'Wake the agent.',
    body:
      'Goltmund issues a wake packet. The Bitter CLI spawns the run and holds the context — Run-Id, Wake-Id, run-scoped signing key — for the lifetime of the work.',
  },
  {
    index: '02',
    title: 'Capture the change.',
    body:
      '`bitter git commit` writes the trailer and signs it with the run key. The server-side receive hook rejects any push whose commits don\'t carry valid provenance. Agents can\'t forget, can\'t forge, can\'t drift.',
  },
  {
    index: '03',
    title: 'Review the run.',
    body:
      'Open the run, not a PR. See every commit, across every repo it touched. See the BitterGrid build, the test output, the probes, the logs. Accept or revert the whole blast radius in one decision.',
  },
]

const inside = [
  { label: 'Protocol', value: 'Standard git over HTTPS and SSH. Any client can clone, fetch, and pull.' },
  { label: 'Client', value: '`bitter git` — a thin wrapper over native git that stamps provenance at commit time.' },
  { label: 'Identity', value: 'Humans via SSH key or passkey. Agents via run-scoped ephemeral Ed25519 keypair.' },
  { label: 'Provenance', value: 'Signed Run-Id / Wake-Id trailers on every agent commit. Verified at receive.' },
  { label: 'Review unit', value: 'The run. Commits group automatically across repos; decisions operate on the run.' },
  { label: 'Verification', value: 'Wired to BitterGrid. Build, tests, probes attach before accept.' },
  { label: 'Audit', value: 'Every push and decision emits to BitterLog. Queryable substrate for future wake packets.' },
  { label: 'Hosting', value: 'Your own substrate. Sovereign over writes. Open over reads. Own failure domain.' },
]

const personas = [
  {
    eyebrow: 'Solo operator',
    title: 'More agents than PRs you could ever review.',
    body:
      'Your fleet produces hundreds of commits a day. You need to know which run made what, what got verified, what failed, and what to accept — without clicking through forty PR pages.',
  },
  {
    eyebrow: 'Small team',
    title: 'Humans and agents committing side by side.',
    body:
      'Human commits are human commits. Agent commits carry their run. The data tells you what it is — no bot-account fiction, no after-the-fact tagging.',
  },
  {
    eyebrow: 'Engineering lead',
    title: 'Auditing agent work at fleet scale.',
    body:
      'Every change links back to the wake that asked for it and the verification that cleared it. Reconstruct exactly what an agent did, when, and why — down to the signed commit trailer.',
  },
]

onMounted(() => {
  const button = document.getElementById('theme-toggle') as HTMLButtonElement | null
  if (!button) return
  const root = document.documentElement
  const currentTheme = () =>
    root.dataset.theme ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const applyLabel = () => {
    button.textContent = currentTheme() === 'dark' ? 'Light mode' : 'Dark mode'
  }
  button.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark'
    root.dataset.theme = next
    try {
      localStorage.setItem('bittergit-theme', next)
    } catch (_) {
      /* ignore */
    }
    applyLabel()
  })
  applyLabel()
})
</script>

<template>
  <div id="top">
    <header class="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div class="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-6 px-6 py-4 md:grid-cols-[1fr_auto_auto]">
        <a href="#top" class="brand text-fg">BitterGit</a>
        <nav class="hidden items-center gap-6 text-sm text-muted md:flex">
          <a href="#why" class="hover:text-fg">Why</a>
          <a href="#how" class="hover:text-fg">How</a>
          <a href="#inside" class="hover:text-fg">Inside</a>
          <a href="#who" class="hover:text-fg">Who</a>
          <a href="#access" class="hover:text-fg">Access</a>
        </nav>
        <div class="flex items-center gap-3">
          <button id="theme-toggle" type="button" class="btn-outline">Theme</button>
          <a href="#access" class="btn-primary">Request access</a>
        </div>
      </div>
    </header>

    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 gridlines opacity-50"></div>
      <div class="absolute left-[-12%] top-[-14%] h-72 w-72 rounded-full hero-orb hero-orb-a blur-3xl"></div>
      <div class="absolute bottom-[-14%] right-[-8%] h-80 w-80 rounded-full hero-orb hero-orb-b blur-3xl"></div>

      <div class="relative mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-[1.15fr_0.85fr] md:py-32">
        <div>
          <p class="section-index">00 / Source control for agents.</p>
          <h1
            class="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl"
          >
            Agent-native source control.
          </h1>
          <p class="mt-6 max-w-2xl font-mono text-sm uppercase tracking-[0.22em] text-accent">
            Gets it done.
          </p>
          <p class="mt-8 max-w-2xl text-lg leading-relaxed text-muted-strong md:text-xl">
            BitterGit turns every agent commit into a verified change.
            Each commit carries its run, its wake, and its receipt &mdash;
            tied to the loop that produced it and the verification that cleared it.
          </p>
          <p class="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Git works the way you already use it. The provenance just shows up.
          </p>

          <div class="mt-10 flex flex-wrap items-center gap-3">
            <a href="#access" class="btn-primary">Request early access</a>
            <a href="#how" class="btn-ghost">See the design &rarr;</a>
          </div>

          <div class="mt-10 flex items-center gap-3">
            <span class="seal-stamp">RUN</span>
            <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Every change has a run, a reason, and a receipt.
            </span>
          </div>
        </div>

        <aside class="relative z-10">
          <div class="commit-stream">
            <div class="commit-stream__head">
              <span class="commit-stream__head-label">bitter git log --run</span>
              <span class="commit-stream__head-dots">
                <span></span><span></span><span></span>
              </span>
            </div>
            <div class="commit-stream__body">
              <div class="commit-stream__prompt">
                <span class="commit-stream__prompt-sigil">$</span>
                <span class="commit-stream__prompt-cmd">bitter git log --run --limit 4</span>
              </div>

              <div
                v-for="(run, idx) in stream"
                :key="idx"
                class="commit-stream__run"
              >
                <span
                  class="commit-stream__run-node"
                  :class="{
                    'commit-stream__run-node--reverted': run.status === 'reverted',
                    'commit-stream__run-node--human': run.status === 'human',
                  }"
                ></span>
                <div class="commit-stream__run-head">
                  <span>
                    <span class="commit-stream__run-id">
                      {{ run.runId ? run.runId : 'no run · human commit' }}
                    </span>
                  </span>
                  <span class="commit-stream__run-meta">
                    <span v-if="run.status === 'verified'" class="commit-stream__badge">
                      &#10003; verified
                    </span>
                    <span v-else-if="run.status === 'reverted'" class="commit-stream__badge commit-stream__badge--warn">
                      &#8634; reverted
                    </span>
                    <span v-else class="commit-stream__badge commit-stream__badge--muted">
                      human
                    </span>
                  </span>
                </div>
                <div class="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                  <span v-if="run.wakeId">wake: {{ run.wakeId }}</span>
                  <span>agent: {{ run.agent }}</span>
                  <span>repos: {{ run.repos }}</span>
                </div>
                <ul class="commit-stream__commits">
                  <li v-for="c in run.commits" :key="c.hash">
                    <span class="commit-stream__commit-hash">{{ c.hash }}</span>
                    <span>{{ c.msg }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="commit-stream__foot">
              <span>4 runs &middot; 6 commits</span>
              <span>&#10003; 2 verified &middot; &#8634; 1 reverted &middot; 1 human</span>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section id="why">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">01 / Why BitterGit exists</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          GitHub was built for human teams. Agent work has a different shape.
        </h2>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted-strong">
          A human team produces pull requests &mdash; artifacts to discuss, review, approve, merge.
          An agent fleet produces commits by the hundred, grouped by the run that made them.
          The atomic unit shifts. BitterGit is shaped for that.
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
        <p class="section-index">02 / How it works</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Wake the agent. Capture the change. Review the run.
        </h2>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted-strong">
          The plaintext of the work lives between the wake packet that asked for it and the run
          that produced it. Everything in between is signed, verified, and visible.
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
            <p class="section-index">From the Bitter CLI</p>
            <pre class="cli-block mt-4"><span><span class="cli-block__prompt">$</span>bitter git runs</span>
<span><span class="cli-block__prompt">$</span>bitter git run show run_4f2a</span>
<span><span class="cli-block__prompt">$</span>bitter git diff run_4f2a</span>
<span><span class="cli-block__prompt">$</span>bitter grid verify --run run_4f2a</span>
<span><span class="cli-block__prompt">$</span>bitter git accept run_4f2a --if-verified</span>
<span class="cli-block__comment"># or, to undo the whole blast radius:</span>
<span><span class="cli-block__prompt">$</span>bitter git revert run_4f2a</span></pre>
          </div>
          <div class="border-l border-line/60 pl-6 md:pl-8">
            <p class="section-index">What gets stamped</p>
            <pre class="cli-block mt-4"><span class="cli-block__comment"># every agent commit carries these trailers,</span>
<span class="cli-block__comment"># signed with the run's ephemeral key.</span>

Run-Id: run_4f2a
Wake-Id: wake_0129
Agent: factory-agent
Verified-By: bittergrid_build_8821
Signature: ed25519:<span class="cli-block__comment">…</span></pre>
          </div>
        </div>
      </div>
    </section>

    <section id="inside" class="border-t border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">03 / What's inside</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Boring git. Sharper edges.
        </h2>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted-strong">
          The primitives are the ones you already use every day.
          What BitterGit adds is the provenance substrate around them.
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
        <p class="section-index">04 / Who it's for</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          For teams that ship with agents.
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
            <li>Not another GitHub clone. No stars, followers, trending, marketplace.</li>
            <li>Not a project tracker. Wake packets live in Goltmund.</li>
            <li>Not a CI system. Builds, tests, and probes live in BitterGrid.</li>
            <li>Not a social network. Your reputation is your signed change history.</li>
            <li>Not PR-first. The run is the review unit.</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="access" class="border-y border-line">
      <div class="mx-auto max-w-6xl px-6 py-24">
        <p class="section-index">05 / Access</p>
        <h2
          class="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
        >
          Request early access.
        </h2>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted-strong">
          BitterGit is migrating off GitHub first &mdash; the Bitter fleet itself is tenant zero.
          Tell us what you'd want to host here, and which loop you'd point at it.
        </p>
        <p class="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
          Invitations go out in waves. Replies come from a human.
        </p>

        <form
          method="POST"
          action="/__submit"
          class="mt-14 grid gap-4 border-t border-line pt-6 md:max-w-2xl"
        >
          <input type="hidden" name="product" value="bittergit-early-access" />

          <label class="grid gap-2">
            <span class="font-mono text-xs uppercase tracking-[0.18em] text-muted">Email</span>
            <input
              type="email"
              name="email"
              required
              autocomplete="email"
              class="field-input"
              placeholder="you@company.com"
            />
          </label>

          <label class="grid gap-2">
            <span class="font-mono text-xs uppercase tracking-[0.18em] text-muted"
              >What would you host on BitterGit?</span
            >
            <textarea
              name="context"
              rows="4"
              class="field-input"
              placeholder="Example: We run a small agent fleet that commits across four repos a day. We want to audit what each run did without clicking through forty PRs."
            ></textarea>
          </label>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <button type="submit" class="btn-primary">Request access</button>
            <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Every change has a run, a reason, and a receipt.
            </span>
          </div>
        </form>
      </div>
    </section>

    <footer class="border-b border-line">
      <div
        class="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-[1fr_auto] md:items-center"
      >
        <div class="flex items-center gap-4">
          <span class="brand text-muted-strong">BitterGit</span>
          <span class="hairline w-10"></span>
          <span class="font-mono text-xs text-muted">
            agent-native source control
          </span>
        </div>
        <div
          class="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.18em] text-muted"
        >
          <a href="#top" class="transition hover:text-fg">Top</a>
          <a href="#how" class="transition hover:text-fg">Design</a>
          <a href="#inside" class="transition hover:text-fg">Spec</a>
          <a href="#access" class="transition hover:text-fg">Request access</a>
        </div>
      </div>
    </footer>

  </div>
</template>
