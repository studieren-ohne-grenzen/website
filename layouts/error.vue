<template>
  <div>
    <Menu :items="menu.items" class="hidden lg:block" />
    <Mobile-Menu :items="menu.items" class="block lg:hidden" />
    <div class="container mt-20 text-4xl font-overpass text-sogblue">
      <div
        v-if="
          error.statusCode === 404 &&
          availableLocales &&
          availableLocales.length > 0
        "
      >
        {{ $t('error.language') }}
        <div class="text-lg text-gray-800 mt-2">
          {{ $t('error.availableIn') }}
          <!-- TODO: make it a nuxt-link -->
          <a
            v-for="locale in availableLocales"
            :key="locale.code"
            :href="
              locale.code === $i18n.defaultLocale
                ? `/${$route.params.slug}`
                : `/${locale.code}/${$route.params.slug}`
            "
            class="hover:text-sogblue-dark transition-colors duration-100"
          >
            {{ locale.name }}
          </a>
        </div>
      </div>
      <div v-else-if="error.statusCode === 404">
        {{ $t('error.404') }}
        <div class="text-lg text-gray-800 mt-2">
          <!-- TODO: make it a nuxt-link -->
          <a
            :href="
              $i18n.locale === $i18n.defaultLocale ? `/` : `/${$i18n.locale}/`
            "
            class="hover:text-sogblue-dark transition-colors duration-100"
          >
            {{ $t('error.backHome') }}
          </a>
        </div>
      </div>
      <div v-else>{{ $t('error.default') }}</div>
    </div>
  </div>
</template>

<script>
import Menu from '~/components/menu'
import MobileMenu from '~/components/mobileMenu'

export default {
  components: {
    Menu,
    MobileMenu,
  },
  props: {
    error: {
      type: Object,
      default: () => {
        return { items: {} }
      },
    },
  },
  data() {
    return {
      menu: {},
      availableLocales: [],
    }
  },
  async fetch() {
    this.menu = await this.$content(this.$i18n.locale, 'menu').fetch()
    await this.lookupAvailableLocales()
  },
  watch: {
    async '$route.params.slug'() {
      await this.lookupAvailableLocales()
    },
  },
  methods: {
    async lookupAvailableLocales() {
      const availableLocales = []
      if (this.error.statusCode === 404) {
        for (const locale in this.$i18n.locales) {
          try {
            await this.$content(
              `${this.$i18n.locales[locale].code}/${this.$route.params.slug}`,
              'index'
            ).fetch()
            availableLocales.push(this.$i18n.locales[locale])
          } catch {}
        }
      }
      this.availableLocales = availableLocales
    },
  },
}
</script>

<style></style>
