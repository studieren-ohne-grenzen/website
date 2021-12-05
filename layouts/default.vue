<template>
  <div>
    <Nuxt />
  </div>
</template>
<script>
export default {
  name: 'default',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head() {
    if (this.$nuxtI18nHead === null) return
    console.log(this.$nuxtI18nHead)
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      title: i18nHead.title,
      description: i18nHead.description,
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          hid: 'description',
          name: 'description',
          content: i18nHead.description,
        },
        ,
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
}
</script>

<style></style>
