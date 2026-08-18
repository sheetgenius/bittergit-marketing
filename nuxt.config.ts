import tailwindcss from '@tailwindcss/vite'

const gaMeasurementId = 'G-P155YY6FGZ'
const gaConfigScript = `window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`

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
      title: 'BitterGit — Open-source Git for AI coding agents',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'BitterGit is an open-source, self-hosted Git service for AI coding agents. Start with ordinary Git; connect GitHub later if it helps.',
        },
        { property: 'og:title', content: 'BitterGit — Open-source Git for AI coding agents' },
        {
          property: 'og:description',
          content:
            'Every app can start with ordinary Git. No GitHub account is required, and the Apache-2.0 server is public today.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://bittergit.com/' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'BitterGit — Open-source Git for AI coding agents' },
        {
          name: 'twitter:description',
          content:
            'Open-source Git custody for AI coding agents. GitHub is an option, not a prerequisite.',
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
          key: 'ga4-loader',
          src: `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`,
          async: true,
          tagPosition: 'head',
        },
        {
          key: 'ga4-config',
          tagPosition: 'head',
          innerHTML: gaConfigScript,
        },
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
