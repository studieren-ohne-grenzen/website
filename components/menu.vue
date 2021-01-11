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
        v-for="(item, index) in items"
        :key="item"
        class="flex-none mr-10 border-b-2 border-white hover:text-sogblue-dark transition-color duration-300"
        :class="$route.params.slug === index ? 'border-sogblue' : ''"
      >
        <nuxt-link :to="localePath(`/${index}`)">
          {{ item }}
        </nuxt-link>
      </li>
      <li class="flex-none flex">
        <button
          @mouseover="selectLanguage = true"
          @mouseleave="selectLanguage = false"
          @click="selectLanguage = true"
        >
          <svg viewBox="0 0 24 24" class="h-6 fill-current text-gray-600">
            <path
              d="M24 24h-2.784l-1.07-3h-4.875l-1.077 3h-2.697l4.941-13h2.604l4.958 13zm-4.573-5.069l-1.705-4.903-1.712 4.903h3.417zm-9.252-12.804c.126-.486.201-.852.271-1.212l-2.199-.428c-.036.185-.102.533-.22 1-.742-.109-1.532-.122-2.332-.041.019-.537.052-1.063.098-1.569h2.456v-2.083h-2.161c.106-.531.198-.849.288-1.149l-2.147-.645c-.158.526-.29 1.042-.422 1.794h-2.451v2.083h2.184c-.058.673-.093 1.371-.103 2.077-2.413.886-3.437 2.575-3.437 4.107 0 1.809 1.427 3.399 3.684 3.194 2.802-.255 4.673-2.371 5.77-4.974 1.134.654 1.608 1.753 1.181 2.771-.396.941-1.561 1.838-3.785 1.792v2.242c2.469.038 4.898-.899 5.85-3.166.93-2.214-.132-4.635-2.525-5.793zm-2.892 1.531c-.349.774-.809 1.544-1.395 2.15-.09-.646-.151-1.353-.184-2.108.533-.07 1.072-.083 1.579-.042zm-3.788.724c.062.947.169 1.818.317 2.596-1.996.365-2.076-1.603-.317-2.596zm11.236-1.745l-2.075-5.533 5.414-1.104-.976 1.868c2.999 2.418 4.116 5.645 4.532 8.132-1.736-2.913-3.826-4.478-5.885-5.321l-1.01 1.958zm-7.895 10.781l1.985 5.566-5.43 1.016 1.006-1.852c-2.96-2.465-4.021-5.654-4.397-8.148 1.689 2.94 3.749 4.483 5.794 5.36l1.042-1.942zm10.795-6.029"
            />
          </svg>
        </button>
        <ul
          v-if="selectLanguage"
          class="absolute top-full right-0 z-50 p-2"
          @mouseover="selectLanguage = true"
          @mouseleave="selectLanguage = false"
        >
          <li
            v-for="locale in this.$i18n.locales"
            :key="locale.code"
            class="flex"
          >
            <svg
              v-if="$i18n.locale === locale.code"
              viewBox="0 0 24 24"
              class="h-3 w-3 mt-1 mr-1 fill-current text-gray-600"
            >
              <path
                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
              />
            </svg>
            <div v-else class="w-3 mr-1">&nbsp;</div>
            <nuxt-link :to="switchLocalePath(locale.code)">
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
      type: Object,
      default() {
        return {
          our_work: 'Our Work',
          about_us: 'About Us',
          get_involved: 'Get Involved',
          donate: 'Donate',
          get_sponsored: 'Get Sponsored',
          shop: 'Shop',
        }
      },
    },
  },
  data() {
    return {
      selectLanguage: false,
    }
  },
}
</script>

<style>
.container {
  @apply text-gray-800 font-overpass font-light mx-auto px-4 my-10;
}

.menu-list {
  @apply flex items-end;
}
</style>
