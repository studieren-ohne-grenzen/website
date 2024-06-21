<template>
  <div class="flex flex-col min-h-screen">
    <DesktopMenu :items="menu.items" class="hidden lg:block" />
    <MobileMenu :items="menu.items" class="block lg:hidden" />
    <div class="container mt-20 text-4xl font-overpass font-light flex-grow">
      <div
        v-if="
          error.statusCode === 404 &&
          availableLocales &&
          availableLocales.length > 0
        "
        class="text-sogblue"
      >
        {{ $t('error.language') }}
        <div class="text-lg text-gray-800 mt-2 font-normal">
          {{ $t('error.availableIn') }}
          <nuxt-link
            v-for="availableLocale in availableLocales"
            :key="availableLocale.code"
            :to="switchLocalePath(availableLocale.code)"
            class="hover:text-sogblue-dark transition-colors duration-100"
          >
            {{ availableLocale.name }}
          </nuxt-link>
        </div>
      </div>
      <div v-else-if="error.statusCode === 404" class="text-sogblue">
        {{ $t('error.404') }}
        <div class="text-lg text-gray-800 mt-2">
          <NuxtLink
            :to="localePath('/')"
            class="hover:text-sogblue-dark transition-colors duration-100"
          >
            {{ $t('error.backHome') }}
          </NuxtLink>
        </div>
      </div>
      <div v-else>{{ $t('error.default') }}</div>
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
import type { LocaleObject } from '@nuxtjs/i18n';

const props = defineProps<{ error: NuxtError }>()

const route = useRoute()
const { locale, locales, t } = useI18n()

const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

useHead({
  title: t('sog'),
})

const lookupAvailableLocales = async () => {
  const availableLocales: LocaleObject[] = []
  if (props.error?.statusCode === 404) {
    for (const locale in locales.value) {
      try {
        await queryContent(
          `${locales.value[locale].code}/${route.params.slug}`,
          'index'
        ).findOne()
        availableLocales.push(locales.value[locale])
      } catch {
        // Ignore locales that cannot be loaded
      }
    }
  }
  return availableLocales
}

const menu = await queryContent(locale.value, 'menu').findOne()
const footer = await queryContent(locale.value, 'footer').findOne()
const availableLocales = ref<LocaleObject[]>(await lookupAvailableLocales())

watch(
  () => route.params.slug,
  async () => availableLocales.value = await lookupAvailableLocales()
)
</script>
