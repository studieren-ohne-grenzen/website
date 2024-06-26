export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },

  i18n: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    locales: [
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de.js',
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.js',
      },
      // Disabled locales without any translated content
      // {
      //   code: 'fr',
      //   iso: 'fr-FR',
      //   name: 'Français',
      //   file: 'fr.js',
      // },
      // {
      //   code: 'es',
      //   iso: 'es-ES',
      //   name: 'Español',
      //   file: 'es.js',
      // },
      // {
      //   code: 'ru',
      //   iso: 'ru-RU',
      //   name: 'Русский',
      //   file: 'ru.js',
      // },
    ],
    defaultLocale: 'de',
    noPrefixDefaultLocale: true,
    fallbackLocale: 'de',
    langDir: 'content/translations/',
    lazy: true,
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/i18n', '@nuxt/content'],

  dir: {
    static: 'content/static',
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
