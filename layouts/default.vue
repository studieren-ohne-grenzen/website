<template>
  <div class="canvas">
    <slot />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const i18nHead = useLocaleHead({ addSeoAttributes: true })

useHead({
  htmlAttrs: {
    lang: locale,
  },
  title: i18nHead.value.title,
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      hid: 'description',
      name: 'description',
      content: i18nHead.value.description,
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})
</script>
