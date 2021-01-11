<template>
  <div class="container mx-auto">
    <Menu :items="menu.items" />
    <article v-if="index">
      <nuxt-content :document="index" />
    </article>
  </div>
</template>

<script>
import Menu from '~/components/menu'

export default {
  components: {
    Menu,
  },

  async asyncData({ $content, app }) {
    const index = await $content(
      `${app.i18n.locale}/landing_page`,
      'index'
    ).fetch()
    const menu = await $content(`${app.i18n.locale}`, 'menu').fetch()
    return { index, menu }
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
