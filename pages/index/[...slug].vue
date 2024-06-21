<template>
  <article v-if="page" class="container mx-auto">
    <ContentRenderer :value="page" />
  </article>
</template>

<script setup lang="ts">
// This page only supports two levels content pages, e.g. /imprint or /our_work/sri_lanka
//
// Supporting arbitrary levels would require Unknown Dynamic Nested Routes
// (https://v2.nuxt.com/docs/features/file-system-routing/#unknown-dynamic-nested-routes)
// which are not supported by nuxt-i18n out of the box.
//
// If a page is not available that would not offer a switch to another locale.
const route = useRoute()
const { locale, t } = useI18n()

const page = await queryContent(`${locale.value}/${route.params.slug}`, 'index').findOne().catch(() => {
  throw createError({
    statusCode: 404,
    message: 'Page could not be found',
  })
})

const seo = await queryContent(locale.value, 'seo').findOne()

useHead({
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
