<template>
  <div class="flex flex-col min-h-screen">
    <DesktopMenu :items="menu.items" class="hidden lg:block" />
    <MobileMenu :items="menu.items" class="block lg:hidden" />
    <NuxtPage class="flex-grow"/>
    <SogFooter
      :items="footer.items"
      :social-icons="footer.socialIcons"
      :awards="footer.awards"
    />
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

const menu = await queryContent(locale.value, 'menu').findOne()
const footer = await queryContent(locale.value, 'footer').findOne()
</script>
