<template>
  <div>
    <Menu :items="menu.items" class="hidden lg:block" />
    <Mobile-Menu :items="menu.items" class="block lg:hidden" />
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
import Menu from '~/components/menu'
import MobileMenu from '~/components/mobileMenu'

export default {
  components: {
    Menu,
    MobileMenu,
  },

  async asyncData({ $content, app }) {
    const menu = await $content(`${app.i18n.locale}`, 'menu').fetch()
    return { menu }
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
