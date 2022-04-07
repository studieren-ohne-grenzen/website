<template>
  <div class="flex flex-col min-h-screen">
    <Menu-Component :items="menu.items" class="hidden lg:block" />
    <Mobile-Menu-Component :items="menu.items" class="block lg:hidden" />
    <nuxt-child class="flex-grow"></nuxt-child>
    <Footer-Component
      :items="footer.items"
      :social-icons="footer.socialIcons"
      :awards="footer.awards"
    ></Footer-Component>
  </div>
</template>

<script>
import MenuComponent from '~/components/menu'
import MobileMenuComponent from '~/components/mobileMenu'
import FooterComponent from '~/components/footer'

export default {
  name: 'IndexPage',
  components: {
    MenuComponent,
    MobileMenuComponent,
    FooterComponent,
  },
  async asyncData({ $content, app }) {
    const menu = await $content(`${app.i18n.locale}`, 'menu').fetch()
    const footer = await $content(`${app.i18n.locale}`, 'footer').fetch()
    return { menu, footer }
  },
}
</script>

<style></style>
