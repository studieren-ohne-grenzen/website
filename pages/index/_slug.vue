<template>
  <article v-if="page" class="container mx-auto">
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
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
      ],
    }
  },
}
</script>
