export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      title: i18nHead.title,
      description: i18nHead.description,
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          hid: 'description',
          name: 'description',
          content: i18nHead.description,
        },
        ,
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://image.nuxtjs.org/
    '@nuxt/image',
  ],

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },

  i18n: {
    baseUrl: 'http://localhost:3000/',
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
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        file: 'fr.js',
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
        file: 'es.js',
      },
      {
        code: 'ru',
        iso: 'ru-RU',
        name: 'Русский',
        file: 'ru.js',
      },
    ],
    defaultLocale: 'de',
    noPrefixDefaultLocale: true,
    fallbackLocale: 'de',
    langDir: 'content/translations/',
    lazy: true,
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/i18n',
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
