export default defineNuxtConfig({
  compatibilityDate: '2024-08-26',

  nitro: {
    prerender: {
      // Without this limit, prerendering fails on GitHub Actions for random pages
      concurrency: 1,
    }
  },

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

  content: {
    ignores: [
      '^\\/content\\/static\\/',
      '^\\/content\\/translations\\/',
    ],
    markdown: {
      anchorLinks: false
    },
  },

  i18n: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    locales: [
      {
        code: 'de',
        language: 'de-DE',
        name: 'Deutsch',
        file: 'de.js',
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.js',
      },
      // Disabled locales without any translated content
      //{
      //  code: 'fr',
      //  language: 'fr-FR',
      //  name: 'Français',
      //  file: 'fr.js',
      //},
      //{
      //  code: 'es',
      //  language: 'es-ES',
      //  name: 'Español',
      //  file: 'es.js',
      //},
      //{
      //  code: 'ru',
      //  language: 'ru-RU',
      //  name: 'Русский',
      //  file: 'ru.js',
      //},
    ],
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    langDir: '../content/translations/',
    lazy: true,
  },
})