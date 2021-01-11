<template>
  <div>
    <article v-if="index" class="container mx-auto">
      <nuxt-content :document="index" />
    </article>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, app }) {
    const index = await $content(
      `${app.i18n.locale}/landing_page`,
      'index'
    ).fetch()
    return { index }
  },
}
</script>

<style>
.nuxt-content {
  @apply text-gray-800 font-overpass font-light;
}

.nuxt-content h1 {
  @apply text-sogblue text-3xl font-semibold;
}
</style>
