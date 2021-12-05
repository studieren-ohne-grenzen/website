<template>
  <footer
    class="
      bg-gradient-to-tr
      from-sogblue-dark
      to-sogblue-darker
      pb-10
      pt-6
      mt-6
    "
  >
    <div class="container grid grid-cols-1 md:grid-cols-2 grid-flow-col">
      <ul
        class="
          col-start-1
          flex flex-wrap
          place-self-center
          md:place-self-start
          text-white
          hover:text-sogblue-lighter
          mb-4
        "
      >
        <li
          v-for="item in items"
          :key="item.url"
          class="border-sogblue-white hover:border-sogblue-lighter"
        >
          <nuxt-link
            :to="localePath('/' + item.url)"
            class="
              pl-3
              pr-1
              py-2
              xl:pr-6
              2xl:pr-10
              transition-colors
              duration-200
              hover:text-white
            "
          >
            <span
              :class="
                $route.params.slug === item.url
                  ? 'hover:border-white'
                  : 'border-transparent'
              "
              class="border-b-2"
            >
              {{ item.name }}
            </span>
          </nuxt-link>
        </li>
      </ul>
      <ul
        class="
          col-start-1
          md:col-start-2
          flex flex-wrap
          place-self-center
          md:place-self-end
          text-white
          hover:text-sogblue-lighter
        "
      >
        <li v-for="icon in socialIcons" :key="icon.type">
          <a
            :href="icon.url"
            target="_blank"
            :aria-label="icon.type"
            rel="noopener"
            class="
              pl-3
              pr-1
              xl:pr-3
              2xl:pr-6
              transition-colors
              duration-200
              hover:text-white
            "
          >
            <svg class="w-6 h-6 inline-block fill-current mb-3">
              <use
                :href="localePath('/sprites/socialSymbols.svg#' + icon.type)"
              />
            </svg>
          </a>
        </li>
      </ul>
      <ul
        class="
          mt-8
          md:mt-2
          col-start-1 col-end-3
          grid grid-cols-3
          sm:grid-cols-4
          lg:grid-cols-6
          place-self-center
          md:place-self-start
        "
      >
        <li
          v-for="award in awards"
          :key="award.name"
          class="
            bg-white
            m-2
            ml-3
            mr-1
            xl:mr-3
            2xl:mr-6
            flex
            justify-center
            flex-col
            w-20
            sm:w-24
            lg:w-28
          "
        >
          <SogLink :dest="award.url" :alt="award.name" class="p-2">
            <nuxt-picture
              :src="award.image"
              :alt="award.name"
              quality="80"
              format="webp"
              loading="lazy"
              sizes="sm:25vw lg:400px"
            />
          </SogLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import SogLink from '~/components/sogLink'

export default {
  name: 'Footer',
  components: { SogLink },
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
    socialIcons: {
      type: Array,
      default() {
        return []
      },
    },
    awards: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style scoped></style>
