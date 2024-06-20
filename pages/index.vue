<template>
  <div class="flex flex-col min-h-screen">
    <DesktopMenu :items="menu.items" class="hidden lg:block" />
    <MobileMenu :items="menu.items" class="block lg:hidden" />
    <nuxt-child class="flex-grow"/>
    <SogFooter
      :items="footer.items"
      :social-icons="footer.socialIcons"
      :awards="footer.awards"
    />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const menu = await queryContent(locale.value, 'menu').findOne()
const footer = await queryContent(locale.value, 'footer').findOne()
</script>

<style></style>
