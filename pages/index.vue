<template>
  <div class="flex flex-col min-h-screen">
    <Menu :items="menu.items" class="hidden lg:block" />
    <MobileMenu :items="menu.items" class="block lg:hidden" />
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
  name: 'index',
  components: {
    Menu,
    MobileMenu,
    Footer,
  },
  async asyncData({ $content, app }) {
    const menu = await $content(`${app.i18n.locale}`, 'menu').fetch()
    const footer = await $content(`${app.i18n.locale}`, 'footer').fetch()
    return { menu, footer }
  },
}
</script>

<style></style>
