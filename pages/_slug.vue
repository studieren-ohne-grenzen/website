<template>
  <div class="container mx-auto">
    <Menu :items="menu.items" highlight="support" />
    <article>Hello World!</article>
  </div>
</template>

<script>
import Menu from '~/components/menu'

export default {
  components: {
    Menu,
  },

  async asyncData({ $content, app }) {
    const menu = await $content(`${app.i18n.locale}`, 'menu').fetch()
    return { menu }
  },
}
</script>

<style></style>
