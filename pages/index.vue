<template>
  <div>
    <article v-if="title">
      <nuxt-content class="text-gray-800" :document="title" />
    </article>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, app }) {
    const title = await $content(
      `${app.i18n.locale}/landing_page`,
      'title'
    ).fetch()
    return { title }
  },
}
</script>

<style></style>
