export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'sog-website',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
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
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'es',
            iso: 'es-ES',
            name: 'Español',
          },
          {
            code: 'en',
            iso: 'en-US',
            name: 'English',
          },
          {
            code: 'fr',
            iso: 'fr-FR',
            name: 'Français',
          },
          {
            code: 'de',
            iso: 'de-DE',
            name: 'Deutsch',
          },
          {
            code: 'ru',
            iso: 'ru-RU',
            name: 'Русский',
          },
        ],
        defaultLocale: 'de',
        noPrefixDefaultLocale: true,
        fallbackLocale: 'de',
      },
    ],
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
