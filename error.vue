<template>
  <div class="flex flex-col min-h-screen">
    <DesktopMenu :items="menu.items" class="hidden lg:block" />
    <MobileMenu :items="menu.items" class="block lg:hidden" />
    <div class="container mt-20 text-4xl font-overpass font-light flex-grow">
      <div v-if="error.statusCode === 404" class="text-sogblue">
        {{ t('error.404') }}
        <div class="text-lg text-gray-800 mt-2">
          <NuxtLink
            :to="localePath('/')"
            class="hover:text-sogblue-dark transition-colors duration-100"
          >
            {{ t('error.backHome') }}
          </NuxtLink>
        </div>
      </div>
      <div v-else>{{ t('error.default') }}</div>
    </div>
    <SogFooter
      :items="footer.items"
      :social-icons="footer.socialIcons"
      :awards="footer.awards"
    />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
import { useData } from '@/types/composables'

defineProps<{ error: NuxtError }>()

const { locale, t } = useI18n()

const localePath = useLocalePath()

useHead({
  title: t('sog'),
})

const menu = await useData(`menu-${locale.value}`, () => queryContent(locale.value, 'menu').findOne(), {watch: [locale]})
const footer = await useData(`footer-${locale.value}`, () => queryContent(locale.value, 'footer').findOne(), {watch: [locale]})
</script>
