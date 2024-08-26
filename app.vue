<template>
  <div class="flex flex-col min-h-screen">
    <DesktopMenu :items="menu.items" class="hidden md:block" />
    <MobileMenu :items="menu.items" class="block md:hidden" />
    <NuxtPage class="flex-grow"/>
    <SogFooter
      :items="footer.items"
      :social-icons="footer.socialIcons"
      :awards="footer.awards"
    />
  </div>
</template>

<script setup lang="ts">
import { useData } from '@/types/composables'

const { locale } = useI18n()

const i18nHead = useLocaleHead({ addSeoAttributes: true })

useHead({
  htmlAttrs: {
    lang: locale.value,
  },
  title: i18nHead.value.title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: i18nHead.value.description,
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})

const menu = await useData(`menu-${locale.value}`, () => queryContent(locale.value, 'menu').findOne(), {watch: [locale]})
const footer = await useData(`footer-${locale.value}`, () => queryContent(locale.value, 'footer').findOne(), {watch: [locale]})
</script>
