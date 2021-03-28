<template>
  <div class="flex flex-col min-h-screen">
    <Menu :items="menu.items" :subitems="submenu" class="hidden lg:block" />
    <Mobile-Menu
      :items="menu.items"
      :subitems="submenu"
      class="block lg:hidden"
    />
    <nuxt-child class="flex-grow"></nuxt-child>
    <Footer
      :items="footer.items"
      :social-icons="footer.socialIcons"
      :awards="footer.awards"
    ></Footer>
  </div>
</template>

<script>
import Menu from '~/components/menu'
import MobileMenu from '~/components/mobileMenu'
import Footer from '~/components/footer'

export default {
  components: {
    Menu,
    MobileMenu,
    Footer,
  },
  async asyncData({ $content, app }) {
    const menu = await $content(`${app.i18n.locale}`, 'menu').fetch()
    const footer = await $content(`${app.i18n.locale}`, 'footer').fetch()
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
    return { menu, submenu, footer }
  },
}
</script>

<style></style>
