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
      // TODO: provide links to page in different languages, if available
      error({
        statusCode: 404,
        message: 'Page could not be found',
      })
    }
  },
}
</script>

<style>
.nuxt-content {
  @apply text-gray-800 font-overpass font-light;
}

.nuxt-content * {
  @apply mb-2;
}

.nuxt-content > h1,
.nuxt-content > h2,
.nuxt-content > h3,
.nuxt-content > h4 {
  @apply text-sogblue font-semibold;
}

.nuxt-content h1 {
  @apply text-3xl;
}

.nuxt-content h2 {
  @apply text-2xl;
}

.nuxt-content h3 {
  @apply text-lg;
}
</style>
