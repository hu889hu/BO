// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',

    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate']
      }
    ],
    '@nuxtjs/i18n'
  ],
  build: {
    transpile: ['@fortawesome/vue-fontawesome']
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/public/uikit/uikit.min.css',
    'animate.css/animate.css'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/assets/sass/main.sass"'
        }
      }
    }
  },
  plugins: [`~/plugins/v-trim-input.js`],
  elementPlus: {
    /** Options */
  },
  imports: {
    dirs: ['stores']
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport:
        'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no',
      meta: [
        {
          name: 'format-detection',
          content: 'telephone=no,email=no,adress=no'
        }, // telling iphone detection no transfer these contents
        { name: 'apple-touch-fullscreen', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.2/css/boxicons.min.css'
        }
      ],
      style: [],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/js/all.min.js',
          async: true,
          tagPosition: 'head' // head | bodyOpen | bodyClose
        },
        {
          src: 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js',
          async: true,
          tagPosition: 'head' // head | bodyOpen | bodyClose
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js',
          type: 'text/javascript'
        },
        {
          src: '/uikit/uikit.min.js',
          tagPosition: 'bodyClose'
        },
        {
          src: '/uikit/uikit-icons.min.js',
          tagPosition: 'bodyClose'
        }
      ],
      noscript: []
    }
  },
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'zh_TW',
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: 'root' // recommended
    },
    locales: [
      { code: 'en_US', file: './language/en-US.json' },
      { code: 'zh_TW', file: './language/zh-TW.json' },
      { code: 'zh_CN', file: './language/zh-CN.json' },
      { code: 'ja_JP', file: './language/ja-JP.json' }
    ]
  },
  nitro: {},
  runtimeConfig: {
    public: {
      SOCKETBASE: 'wss://bpsocket2.comethike.com:8443',
      POWERSOCKETURL: 'wss://socket.adminpanela.com:8443',
      APIBASE: 'https://api.adminpanela.com',
      // siteId: '657fef28c02bc92e35075322'
      siteId: '68e2736323825dd0dda6ecfd'
    }
  },
  devServer: {
    port: 3005
  },
  compatibilityDate: '2025-02-13'
})
