<template>
  <nav class="container">
    <ul class="menu-list relative">
      <li class="flex-grow flex-shrink-0">
        <NuxtLink :to="localePath('/')">
          <img
            src="~/content/static/Logo.png"
            alt="Start"
            class="h-14 lg:h-20 xl:h-24"
          >
        </NuxtLink>
      </li>
      <li
        v-for="item in items"
        :key="item.url"
        class="relative flex-none pb-2 mr-2 px-2 xl:mr-4 2xl:mr-8"
        @mouseenter="menuItemExtended = item.url"
        @mouseleave="menuItemExtended = ''"
      >
        <NuxtLink
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
          class="border-b-2 border-black pb-1 transition-colors duration-200"
        >
          {{ item.name }}
        </NuxtLink>
        <ul
          v-if="
            menuItemExtended === item.url &&
            item.children &&
            item.children.length > 0
          "
          class="absolute top-full left-0 z-50 pb-3.5 pt-1.5 px-4 ml-1 rounded bg-white shadow-lg"
        >
          <li
            v-for="subitem in item.children"
            :key="subitem.url ?? subitem.hash"
            class="w-full flex flex-col hover:text-sogblue-dark duration-200"
          >
            <NuxtLink
              class="pt-2 flex-grow whitespace-nowrap transition-colors"
              :to="
                localePath(
                  '/' +
                    (subitem.url ? subitem.url : item.url + '#' + subitem.hash ?? '')
                )
              "
              @click="menuItemExtended = ''"
            >
              {{ subitem.name }}
            </NuxtLink>
            <ul class="ml-6">
              <li
                v-for="subsubitem in subitem.children"
                :key="subsubitem.url ?? subsubitem.hash"
                class="flex text-black hover:text-sogblue-dark"
              >
                <NuxtLink
                  class="flex-grow whitespace-nowrap transition-colors"
                  :to="
                    localePath(
                      '/' +
                        (subsubitem.url ? subsubitem.url : item.url + '#' + subsubitem.hash ?? '')
                    )
                  "
                  @click="menuItemExtended = ''"
                >
                  {{ subsubitem.name }}
                </NuxtLink>
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
            <use href="~/content/static/sprites/navSymbols.svg#language" />
          </svg>
        </div>
        <ul
          class="absolute top-full right-0 z-50 px-4 py-2 rounded bg-white shadow-lg"
          :class="selectLanguage ? 'block' : 'hidden'"
          @mouseenter="selectLanguage = true"
          @mouseleave="selectLanguage = false"
        >
          <li
            v-for="locale in $i18n.locales"
            :key="locale.code"
            class="flex hover:text-sogblue-dark transition-colors duration-100 leading-tight"
          >
            <NuxtLink
              :to="switchLocalePath(locale.code)"
              :class="$i18n.locale === locale.code ? 'border-sogblue' : ''"
              class="border-b-2 border-white my-1.5"
            >
              {{ locale.name }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/types/menu'

withDefaults(defineProps<{ items: MenuItem[] }>(), {
  items: () => [],
})

const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const selectLanguage = ref(false)
const menuItemExtended = ref<string | undefined>('')
</script>

<style lang="postcss">
.container {
  @apply text-gray-800 font-overpass mx-auto px-4 mt-4 lg:mt-10;
}

.menu-list {
  @apply flex items-end;
}
</style>
