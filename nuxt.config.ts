export default defineNuxtConfig({

  runtimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
  ],

  dir: {
    public: 'content/static',
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
    strategy: 'prefix_except_default',
    langDir: 'content/translations/',
    lazy: true,
  },

})
