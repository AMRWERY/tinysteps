// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/icon',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  i18n: {
    vueI18n: 'app/config/i18n/i18n.config.ts',
    restructureDir: '',
    langDir: 'app/config/i18n/locales',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'EN',
        dir: 'ltr',
      },
      {
        code: 'ar',
        iso: 'ar-EG',
        file: 'ar.json',
        name: 'ع',
        dir: 'rtl',
      },
    ],
    defaultLocale: 'ar',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'ar',
      redirectOn: 'root',
    },
    bundle: {},
  },
  nitro: {
    // Workaround for nuxt/nuxt#36467 (Windows path separators in Nitro externals)
    externals: {
      inline: [/[\\/]node_modules[\\/]nuxt[\\/]dist[\\/]/],
    },
  },
  vite: {
    optimizeDeps: {
      // Vite 8's dep scan can't resolve "#components" inside @nuxtjs/i18n
      noDiscovery: true,
      include: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
    },
  },
  css: ['~/assets/css/main.css'],
  components: [
    {
      path: 'components',
      pathPrefix: false,
    },
  ],
  app: {
    head: {
      title: "TinySteps — Baby Routine Tracker",
      script: [
        {
          // Apply the saved theme before first paint to avoid a light-theme flash on refresh
          innerHTML: `(function(){try{var t=localStorage.getItem('tinysteps-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})()`,
          tagPosition: 'head',
          tagPriority: 'critical',
        },
      ],
      noscript: [],
      link: [{}],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
})
