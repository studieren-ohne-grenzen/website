<template>
  <nav class="container">
    <ul class="flex mb-8">
      <li class="flex-grow flex-shrink-0">
        <nuxt-link :to="localePath('/')">
          <img src="~/static/Logo.png" alt="Start" class="h-14" />
        </nuxt-link>
      </li>
      <li class="flex items-center">
        <button class="mx-6" @click="selectLanguage = true">
          <svg viewBox="0 0 24 24" class="h-6 fill-current text-gray-600">
            <path
              d="M7.961 7.5h1.303l2.47 6.5h-1.349l-.538-1.5h-2.438l-.535 1.5h-1.392l2.479-6.5zm1.517 3.965l-.857-2.451-.851 2.451h1.708zm8.092-1.402c.062-.243.1-.426.135-.605l-1.1-.214-.109.5c-.371-.054-.767-.061-1.166-.021.009-.268.025-.531.049-.784h1.229v-1.042h-1.081c.054-.265.099-.424.144-.575l-1.074-.322c-.079.263-.145.521-.211.897h-1.226v1.042h1.092c-.028.337-.046.686-.051 1.038-1.207.443-1.719 1.288-1.719 2.054 0 .904.714 1.7 1.842 1.598 1.401-.128 2.337-1.186 2.885-2.487.567.327.805.876.591 1.385-.197.471-.78.919-1.892.896v1.121c1.234.019 2.448-.45 2.925-1.583.465-1.108-.066-2.318-1.263-2.898zm-1.446.766c-.175.387-.404.771-.697 1.075-.045-.323-.076-.676-.093-1.054.268-.035.537-.041.79-.021zm-1.894.362c.03.473.084.909.158 1.298-.997.183-1.037-.801-.158-1.298zm-2.23-8.191c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.384-.397-4.394-.644-1 .613-1.594 1.037-4.272 1.82.535-1.373.722-2.748.601-4.265-.837-1-2.025-2.4-2.025-4.872 0-4.415 4.486-8.007 10-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.417.345 2.774.503 4.059.503 7.083 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z"
            />
          </svg>
        </button>
      </li>
      <li class="flex items-center">
        <button @click="showMenu = true">
          <svg class="h-8 w-8 fill-current text-gray-700" viewBox="0 0 24 24">
            <path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z" />
          </svg>
        </button>
      </li>
    </ul>
    <div
      :class="showMenu ? 'visible' : 'hidden'"
      class="absolute top-0 left-0 w-full h-full z-40 p-4 bg-white"
    >
      <ul class="w-full flex flex-wrap">
        <li class="w-full">
          <ul class="flex mb-4">
            <li class="flex-grow flex-shrink-0">
              <nuxt-link :to="localePath('/')" @click.native="showMenu = false">
                <img src="~/static/Logo.png" alt="Start" class="h-14" />
              </nuxt-link>
            </li>
            <li class="flex">
              <button @click="showMenu = false">
                <svg
                  class="h-8 w-8 fill-current text-gray-700"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </li>
        <li
          v-for="item in items"
          :key="item"
          class="flex-none w-full pt-4 mr-6 xl:mr-10"
        >
          <nuxt-link
            :to="localePath(`/${item}`)"
            :class="$route.params.slug === item ? 'border-sogblue' : ''"
            class="border-b-2 border-white pb-1"
            @click.native="showMenu = false"
          >
            {{ $t(`menu.${item}`) }}
          </nuxt-link>
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
                <svg
                  class="h-8 w-8 fill-current text-gray-700"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </li>
        <li
          v-for="locale in this.$i18n.locales"
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
  name: 'MobileMenu',
  props: {
    items: {
      type: Array,
      default() {
        return [
          'our_work',
          'about_us',
          'get_involved',
          'donate',
          'scholarships',
          'shop',
        ]
      },
    },
  },
  data() {
    return {
      showMenu: false,
      selectLanguage: false,
    }
  },
}
</script>

<style></style>
