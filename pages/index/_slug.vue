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
          content: `${process.env.baseUrl}/Logo.png`,
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

<style lang="postcss">
.nuxt-content {
  @apply text-gray-800 font-overpass;
}

.nuxt-content h1,
.nuxt-content h2,
.nuxt-content h3,
.nuxt-content h4 {
  @apply text-sogblue font-light mt-6 mb-3;
}

.nuxt-content h1 {
  @apply text-4xl;
}
.nuxt-content h2 {
  @apply text-2xl;
}
.nuxt-content h3 {
  @apply text-xl;
}
</style>
