<template>
  <nav class="container">
    <ul class="flex mb-8">
      <li class="flex-grow flex-shrink-0">
        <nuxt-link :to="localePath('/')">
          <img src="~/static/Logo.png" alt="Start" class="h-14" />
        </nuxt-link>
      </li>
      <li class="flex items-center">
        <div class="mx-6" @click="selectLanguage = true">
          <svg class="h-6 w-6 fill-current text-gray-600">
            <use href="~/static/sprites/navSymbols.svg#language" />
          </svg>
        </div>
      </li>
      <li class="flex items-center">
        <div @click="showMenu = true">
          <svg class="h-8 w-8 fill-current text-gray-700">
            <use href="~/static/sprites/navSymbols.svg#burger" />
          </svg>
        </div>
      </li>
    </ul>
    <div
      :class="showMenu ? 'visible' : 'hidden'"
      class="absolute inset-0 overflow-scroll w-full h-full z-40 p-4 bg-white"
    >
      <ul class="w-full flex flex-wrap pb-8">
        <li class="w-full">
          <ul class="flex mb-4">
            <li class="flex-grow flex-shrink-0">
              <nuxt-link
                :to="localePath('/')"
                @click.native="
                  showMenu = false
                  menuItemExtended = ''
                "
              >
                <img src="~/static/Logo.png" alt="Start" class="h-14" />
              </nuxt-link>
            </li>
            <li class="flex">
              <div @click="showMenu = false">
                <svg class="h-8 w-8 fill-current text-gray-700">
                  <use href="~/static/sprites/navSymbols.svg#cross" />
                </svg>
              </div>
            </li>
          </ul>
        </li>
        <li
          v-for="item in items"
          :key="item.url"
          class="flex-none w-full pt-4 mr-6 xl:mr-10"
        >
          <nuxt-link
            v-if="
              menuItemExtended === item.url ||
              !item.children ||
              item.children.length === 0
            "
            :to="localePath('/' + item.url)"
            :class="
              menuItemExtended === item.url ? 'border-sogblue' : 'border-white'
            "
            class="border-b-2 pb-0.5"
            @click.native="
              showMenu = false
              menuItemExtended = item.url
            "
          >
            {{ item.name }}
          </nuxt-link>
          <button v-else @click="menuItemExtended = item.url">
            {{ item.name }}
          </button>
          <ul
            v-if="
              menuItemExtended === item.url &&
              item.children &&
              item.children.length > 0
            "
          >
            <li
              v-for="subitem in item.children"
              :key="subitem.url ?? subitem.hash"
              class="ml-6 pt-2"
            >
              <nuxt-link
                :to="
                  localePath(
                    '/' +
                      (subitem.url ? subitem.url : item.url + '#' + subitem.hash ?? '')
                  )
                "
                @click.native="showMenu = false"
              >
                {{ subitem.name }}
              </nuxt-link>
              <ul class="ml-6">
                <li
                  v-for="subsubitem in subitem.children"
                  :key="subsubitem.url ?? subsubitem.hash"
                  class="flex"
                >
                  <nuxt-link
                    class="flex-grow"
                    :to="
                      localePath(
                        '/' +
                        (subsubitem.url ? subsubitem.url : item.url + '#' + subsubitem.hash ?? '')
                      )
                    "
                    @click.native="showMenu = false"
                  >
                    {{ subsubitem.name }}
                  </nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div
      :class="selectLanguage ? 'visible' : 'hidden'"
      class="absolute top-0 left-0 w-full h-full z-40 p-4 bg-white"
    >
      <ul class="w-full flex flex-wrap">
        <li class="w-full">
          <ul class="flex mb-4">
            <li class="flex-grow flex-shrink-0">
              <nuxt-link
                :to="localePath('/')"
                @click.native="selectLanguage = false"
              >
                <img src="~/static/Logo.png" alt="Start" class="h-14" />
              </nuxt-link>
            </li>
            <li class="flex">
              <button @click="selectLanguage = false">
                <svg class="h-8 w-8 fill-current text-gray-700">
                  <use href="~/static/sprites/navSymbols.svg#cross" />
                </svg>
              </button>
            </li>
          </ul>
        </li>
        <li
          v-for="locale in $i18n.locales"
          :key="locale.code"
          class="flex-none w-full pt-4 mr-6 xl:mr-10"
        >
          <nuxt-link
            :to="switchLocalePath(locale.code)"
            :class="$i18n.locale === locale.code ? 'border-sogblue' : ''"
            class="border-b-2 border-white mb-2"
          >
            {{ locale.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MobileMenuComponent',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showMenu: false,
      selectLanguage: false,
      menuItemExtended() {
        return this.$route.params.slug
      },
    }
  },
}
</script>

<style></style>
