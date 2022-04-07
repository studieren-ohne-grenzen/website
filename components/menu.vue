<template>
  <nav class="container">
    <ul class="menu-list relative">
      <li class="flex-grow flex-shrink-0">
        <nuxt-link :to="localePath('/')">
          <img
            src="~/static/Logo.png"
            alt="Start"
            class="h-14 lg:h-20 xl:h-24"
          />
        </nuxt-link>
      </li>
      <li
        v-for="item in items"
        :key="item.url"
        class="relative flex-none pb-2 mr-2 px-2 xl:mr-4 2xl:mr-8"
        @mouseenter="menuItemExtended = item.url"
        @mouseleave="menuItemExtended = ''"
      >
        <nuxt-link
          :to="localePath('/' + item.url)"
          :class="{
            'border-sogblue':
              $route.params.slug === item.url &&
              (menuItemExtended === item.url || menuItemExtended === ''),
            'border-gray-300':
              $route.params.slug === item.url && menuItemExtended !== item.url,
            'text-sogblue-dark': menuItemExtended === item.url,
            'text-gray-300':
              menuItemExtended !== item.url && menuItemExtended !== '',
          }"
          class="border-b-2 border-white pb-1 transition-colors duration-200"
        >
          {{ item.name }}
        </nuxt-link>
        <ul
          v-if="
            menuItemExtended === item.url &&
            item.children &&
            item.children.length > 0
          "
          class="
            absolute
            top-full
            left-0
            z-50
            pb-3.5
            pt-1.5
            px-4
            ml-1
            rounded
            bg-white
          "
        >
          <li
            v-for="subitem in item.children"
            :key="subitem.hash"
            class="w-full flex flex-col hover:text-sogblue-dark duration-200"
          >
            <nuxt-link
              class="pt-2 flex-grow whitespace-nowrap transition-colors"
              :to="
                localePath(
                  '/' +
                    item.url +
                    (subitem.hash !== '' ? '#' + subitem.hash : '')
                )
              "
              @click.native="menuItemExtended = ''"
            >
              {{ subitem.name }}
            </nuxt-link>
            <ul class="ml-6">
              <li
                v-for="subsubitem in subitem.children"
                :key="subsubitem.url"
                class="flex text-black hover:text-sogblue-dark"
              >
                <nuxt-link
                  class="flex-grow whitespace-nowrap transition-colors"
                  :to="
                    localePath(
                      '/' +
                        item.url +
                        (subsubitem.hash !== '' ? '#' + subsubitem.hash : '')
                    )
                  "
                  @click.native="menuItemExtended = ''"
                >
                  {{ subsubitem.name }}
                </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="flex-none flex">
        <div
          class="pb-2 pl-2"
          @mouseenter="selectLanguage = true"
          @mouseleave="selectLanguage = false"
          @click="selectLanguage = true"
        >
          <svg
            :class="selectLanguage ? 'text-sogblue-dark' : 'text-gray-600'"
            class="h-6 w-6 fill-current transition-colors duration-100"
          >
            <use :href="localePath('/sprites/navSymbols.svg#language')" />
          </svg>
        </div>
        <ul
          class="absolute top-full right-0 z-50 px-4 py-2 rounded bg-white"
          :class="selectLanguage ? 'block' : 'hidden'"
          @mouseenter="selectLanguage = true"
          @mouseleave="selectLanguage = false"
        >
          <li
            v-for="locale in $i18n.locales"
            :key="locale.code"
            class="
              flex
              hover:text-sogblue-dark
              transition-colors
              duration-100
              leading-tight
            "
          >
            <nuxt-link
              :to="switchLocalePath(locale.code)"
              :class="$i18n.locale === locale.code ? 'border-sogblue' : ''"
              class="border-b-2 border-white my-1.5"
            >
              {{ locale.name }}
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectLanguage: false,
      menuItemExtended: '',
    }
  },
}
</script>

<style lang="postcss">
.container {
  @apply text-gray-800 font-overpass mx-auto px-4 mt-4 lg:mt-10;
}

.menu-list {
  @apply flex items-end;
}
</style>
