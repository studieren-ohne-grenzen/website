<template>
  <article v-if="page" class="container mx-auto">
    <div v-if="fallback" class="bg-yellow-100 border rounded px-3 py-2 border-yellow-500 text-yellow-900">{{ t("error.language") }}</div>
    <ContentRenderer :value="page" class="nuxt-content" />
  </article>
</template>

<script setup lang="ts">
import { useData } from '@/types/composables'

const route = useRoute()
const { defaultLocale, locale, t } = useI18n()

const { data, error } = await useAsyncData(`page-${locale.value}-${[...route.params.slug].join("-")}`, async () => {
  let pages = await queryContent(locale.value, ...route.params.slug).where({ _path: ['', locale.value, ...route.params.slug].join('/')}).limit(1).find()
  let fallback = false
  if (pages.length === 0 && locale.value !== defaultLocale) {
    pages = await queryContent(defaultLocale, ...route.params.slug).where({ _path: ['', defaultLocale, ...route.params.slug].join('/')}).limit(1).find()
    fallback = true
  }
  if (pages.length === 0) {
    throw new Error("Could no find page " + [...route.params.slug].join("/"))
  }
  return { page: pages[0], fallback }
})

if (data.value === null || error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page could not be found',
  })
}

const { page, fallback } = data.value
const { value: seo } = await useData(`seo-${locale.value}`, () => queryContent(locale.value, 'seo').findOne())

useHead({
  htmlAttrs: {
    lang: fallback ? defaultLocale : locale.value,
  },
  title: page.title
    ? `${page.title} – ${t('sog')}`
    : t('sog'),
  meta: [
    {
      hid: `description`,
      name: 'description',
      content: page.description,
    },
    { hid: 'og-type', property: 'og:type', content: 'website' },
    {
      hid: 'og-title',
      property: 'og:title',
      content: page.title
        ? `${page.title} – ${t('sog')}`
        : t('sog'),
    },
    {
      hid: 'og-desc',
      property: 'og:description',
      content: `${
        page.description ? page.description : seo.description
      }`,
    },
    {
      hid: 'og-image',
      property: 'og:image',
      content: `${process.env.baseUrl}${
        page.image ? page.image : seo.image
      }`,
    },
    {
      hid: 'og-image-width',
      property: 'og:image:width',
      content: '1200',
    },
    {
      hid: 'og-image-height',
      property: 'og:image:height',
      content: '630',
    },
    {
      hid: 'og-url',
      property: 'og:url',
      content: `${process.env.baseUrl}${route.path}`,
    },
    {
      hid: 'twitter-card',
      name: 'twitter:card',
      content: 'summary',
    },
    {
      hid: 'twitter-title',
      name: 'twitter:title',
      content: page.title
        ? `${page.title} – ${t('sog')}`
        : t('sog'),
    },
    {
      hid: 'twitter-image',
      name: 'twitter:image',
      content: `${process.env.baseUrl}${
        page.image ? page.image : seo.image
      }`,
    },
    {
      hid: 'twitter-description',
      name: 'twitter:description',
      content: `${
        page.description ? page.description : seo.description
      }`,
    },
    {
      hid: 'twitter-url',
      name: 'twitter:url',
      content: `${process.env.baseUrl}${route.path}`,
    },
  ],
})
</script>
