<template>
  <article v-if="page" class="container mx-auto">
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  name: 'slug_',
  async asyncData({ $content, params, app, error }) {
    try {
      const slug = params.slug || 'landing_page'
      const page = await $content(`${app.i18n.locale}/${slug}`, 'index').fetch()
      return { page }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found',
      })
    }
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
          content: this.page.description,
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: `${process.env.baseUrl}${
            this.page.image ? this.page.image : '/Logo.png'
          }`,
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: `${process.env.baseUrl}${this.$route.path}`,
        },
      ],
    }
  },
}
</script>
