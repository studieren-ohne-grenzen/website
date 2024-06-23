<template>
  <article v-if="page" class="container mx-auto">
    <nuxt-content :document="page" />
  </article>
</template>

<script>
// This page only supports two levels content pages, e.g. /imprint or /our_work/sri_lanka
//
// Supporting arbitrary levels would require Unknown Dynamic Nested Routes
// (https://v2.nuxt.com/docs/features/file-system-routing/#unknown-dynamic-nested-routes)
// which are not supported by nuxt-i18n out of the box.
//
// If a page is not available that would not offer a switch to another locale.
export default {
  name: 'SlugPage',
  async asyncData({ $content, params, app, error }) {
    try {
      let path
      if (!params.slug)
        path = app.i18n.locale
      else if (!params.subslug)
        path = `${app.i18n.locale}/${params.slug}`
      else
        path = `${app.i18n.locale}/${params.slug}/${params.subslug}`

      const page = await $content(path, 'index').fetch()
      return { page }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found',
      })
    }
  },
  data: () => ({
    seo: {},
  }),
  async fetch() {
    this.seo = await this.$content(`${this.$i18n.locale}`, 'seo')
      .fetch()
      .then((jsonFile) => jsonFile)
  },
  head() {
    return {
      title: this.page.title
        ? `${this.page.title} – ${this.$t('sog')}`
        : this.$t('sog'),
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: this.page.description,
        },
        { hid: 'og-type', property: 'og:type', content: 'website' },
        {
          hid: 'og-title',
          property: 'og:title',
          content: this.page.title
            ? `${this.page.title} – ${this.$t('sog')}`
            : this.$t('sog'),
        },
        {
          hid: 'og-desc',
          property: 'og:description',
          content: `${
            this.page.description ? this.page.description : this.seo.description
          }`,
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: `${process.env.baseUrl}${
            this.page.image ? this.page.image : this.seo.image
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
          content: `${process.env.baseUrl}${this.$route.path}`,
        },
        {
          hid: 'twitter-card',
          name: 'twitter:card',
          content: 'summary',
        },
        {
          hid: 'twitter-title',
          name: 'twitter:title',
          content: this.page.title
            ? `${this.page.title} – ${this.$t('sog')}`
            : this.$t('sog'),
        },
        {
          hid: 'twitter-image',
          name: 'twitter:image',
          content: `${process.env.baseUrl}${
            this.page.image ? this.page.image : this.seo.image
          }`,
        },
        {
          hid: 'twitter-description',
          name: 'twitter:description',
          content: `${
            this.page.description ? this.page.description : this.seo.description
          }`,
        },
        {
          hid: 'twitter-url',
          name: 'twitter:url',
          content: `${process.env.baseUrl}${this.$route.path}`,
        },
      ],
    }
  },
}
</script>
