<template>
  <div>
    <Menu :items="menu.items" :subitems="submenu" class="hidden lg:block" />
    <Mobile-Menu
      :items="menu.items"
      :subitems="submenu"
      class="block lg:hidden"
    />
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
    const submenu = []
    for (const i in menu.items) {
      try {
        const item = await $content(
          `${app.i18n.locale}/${menu.items[i]}`,
          'index'
        ).fetch()
        submenu.push(item.toc)
      } catch {
        submenu.push([])
      }
    }
    return { menu, submenu }
  },
}
</script>

<style></style>
