<template>
  <nav class="container">
    <ul class="flex mb-8">
      <li class="flex-grow flex-shrink-0">
        <nuxt-link :to="localePath('/')">
          <img src="~/static/Logo.png" alt="Start" class="h-14" />
        </nuxt-link>
      </li>
      <li class="flex">
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
          v-for="(item, index) in items"
          :key="item"
          class="flex-none w-full pt-4 mr-6 xl:mr-10"
        >
          <nuxt-link
            :to="localePath(`/${index}`)"
            :class="$route.params.slug === index ? 'border-sogblue' : ''"
            class="border-b-2 border-white pb-1"
            @click.native="showMenu = false"
          >
            {{ item }}
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
      showMenu: false,
    }
  },
}
</script>

<style></style>
