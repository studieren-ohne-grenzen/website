<template>
  <div class="flex flex-col min-h-screen">
    <Menu :items="menu.items" class="hidden lg:block" />
    <Mobile-Menu :items="menu.items" class="block lg:hidden" />
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
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            class="hover:text-sogblue-dark transition-colors duration-100"
          >
            {{ locale.name }}
          </nuxt-link>
        </div>
      </div>
      <div v-else-if="error.statusCode === 404" class="text-sogblue">
        {{ $t('error.404') }}
        <div class="text-lg text-gray-800 mt-2">
          <nuxt-link
            :to="localePath('/')"
            class="hover:text-sogblue-dark transition-colors duration-100"
          >
            {{ $t('error.backHome') }}
          </nuxt-link>
        </div>
      </div>
      <div v-else>{{ $t('error.default') }}</div>
    </div>
    <Footer :items="footer.items"></Footer>
  </div>
</template>

<script>
import Menu from '~/components/menu'
import MobileMenu from '~/components/mobileMenu'
import Footer from '~/components/footer'

export default {
  components: {
    Menu,
    MobileMenu,
    Footer,
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
      footer: {},
      availableLocales: [],
    }
  },
  async fetch() {
    this.menu = await this.$content(this.$i18n.locale, 'menu').fetch()
    this.footer = await this.$content(this.$i18n.locale, 'footer').fetch()
    await this.lookupAvailableLocales()
  },
  head() {
    return {
      title: this.$t('sog'),
    }
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
