import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    preset: 'static',
    prerender: {
      autoSubfolderIndex: false,
      routes: ['/up'],
    },
  },

  app: {
    head: {
      title: 'BitterGit — Agent-native source control',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'BitterGit is Git-compatible source custody for agent runs, with signed run provenance, run-level review, and BitterGrid verification receipts.',
        },
        { property: 'og:title', content: 'BitterGit — Agent-native source control' },
        {
          property: 'og:description',
          content:
            'Ordinary Git semantics underneath; signed run provenance and verification receipts around agent work.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://bittergit.com/' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'BitterGit — Agent-native source control' },
        {
          name: 'twitter:description',
          content:
            'Git-compatible source custody for agent runs, with signed provenance and Grid receipts.',
        },
        { name: 'color-scheme', content: 'light dark' },
        { name: 'theme-color', content: '#f7f7fb', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#080909', media: '(prefers-color-scheme: dark)' },
      ],
      link: [
        { rel: 'canonical', href: 'https://bittergit.com/' },
        { rel: 'alternate', type: 'text/markdown', href: 'https://bittergit.com/index.md' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      script: [
        {
          key: 'theme-init',
          tagPosition: 'head',
          innerHTML:
            "(function(){try{var url=new URL(window.location.href);var qp=url.searchParams.get('theme');if(qp==='light'||qp==='dark'){document.documentElement.dataset.theme=qp;return;}var stored=window.localStorage.getItem('bittergit-theme');if(stored==='light'||stored==='dark'){document.documentElement.dataset.theme=stored;}else{document.documentElement.dataset.theme='dark';}}catch(_){document.documentElement.dataset.theme='dark';}})();",
        },
      ],
    },
  },
})
