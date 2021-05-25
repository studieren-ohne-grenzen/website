<template>
  <div class="flex items-start px-8 md:px-0 flex-wrap">
    <div class="w-full md:w-1/2 xl:w-2/5 flex-shrink-0 relative">
      <a
        v-for="place in places"
        :key="place.name"
        :href="'#' + place.name.toLowerCase()"
        class="absolute flex items-center"
        :style="
          relPosGermany(
            { north: place.coordinates.north, east: place.coordinates.east },
            place.text_flow
          )
        "
      >
        <div
          v-if="place.text_flow === 'left'"
          class="
            -mt-3
            sm:-mt-5
            text-sogblue-darker text-xs
            sm:text-base
            leading-none
            z-10
          "
        >
          {{ place.name }}
        </div>
        <svg
          class="
            h-4
            w-4
            -mt-4
            sm:h-6
            sm:w-6
            sm:-mt-6
            fill-current
            text-sogblue-darker
          "
          :class="
            place.text_flow === 'left' ? '-mr-2 sm:-mr-3' : '-ml-2 sm:-ml-3'
          "
        >
          <use href="sprites/mapSymbols.svg#marker" />
        </svg>
        <div
          v-if="place.text_flow !== 'left'"
          class="
            -mt-3
            sm:-mt-5
            text-sogblue-darker text-xs
            sm:text-base
            leading-none
            z-10
          "
        >
          {{ place.name }}
        </div>
      </a>
      <object data="germany.svg" class="block opacity-20 z-0" />
    </div>
    <transition name="fade" mode="out-in">
      <div
        v-if="selectedPlace"
        :key="selectedPlace.name"
        class="md:w-1/2 xl:w-3/5 mt-2 -mx-8 md:mx-0 sm:pl-8 lg:pl-20"
      >
        <h2 class="text-sogblue font-light text-2xl sm:text-3xl">
          {{ selectedPlace.name }}
        </h2>
        <div v-if="selectedPlace.picture" class="my-4">
          <nuxt-picture :src="selectedPlace.picture" />
        </div>
        <div>
          {{ selectedPlace.text }}
        </div>
        <a
          :href="
            'mailto://' +
            selectedPlace.name.toLowerCase() +
            '@studieren-ohne-grenzen.org'
          "
        >
          Mail
        </a>
      </div>
      <div
        v-else
        class="md:w-1/2 xl:w-3/5 self-center -mx-8 mt-4 md:m-0 sm:pl-8 lg:pl-20"
      >
        <div class="text-gray-500">
          Studieren Ohne Grenzen gibt es in vielen Städten. Um mehr zu erfahren,
          wähle eine Stadt aus!
          <svg
            class="
              hidden
              md:block
              w-1/3
              xl:w-1/5
              ml-8
              mt-3
              stroke-current stroke-10
              fill-none
              text-sogblue-darker
            "
          >
            <use href="sprites/mapSymbols.svg#arrow" />
          </svg>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SogMap',
  props: {
    placesConfig: {
      type: String,
      default: 'map',
    },
  },
  data() {
    return {
      places: [],
    }
  },
  async fetch() {
    this.places = await this.$content(`${this.$i18n.locale}`, this.placesConfig)
      .fetch()
      .then((jsonFile) => jsonFile.places)
  },
  computed: {
    selectedPlace() {
      const hash = this.$route.hash.slice(1)
      return this.places.find(
        (place) => place.name.toLowerCase() === decodeURI(hash)
      )
    },
  },
  methods: {
    relPosGermany({ north, east }, textFlow) {
      /* @param {{north, east}} absolute positon within Germany as WGS84 coordinates
       *        in degrees (minutes, seconds as decimals), e.g. Aachen: { north: 50.78, east: 6.08 }
       * @param {textFlow} 'left', if the place name should be aligned left of the pin
       * @return {{top, left}} relative position within Germany in %
       */
      if (
        !north ||
        !east ||
        typeof north !== 'number' ||
        typeof east !== 'number'
      )
        throw new Error('relPosGermany: inproper coordinates')
      if (!textFlow) textFlow = 'right'
      const maxNorth = 55.05864
      const minNorth = 47.271679
      const maxEast = 15.043611
      const minEast = 5.866944
      const top = Math.floor(
        (1 - (north - minNorth) / (maxNorth - minNorth)) * 100
      )
      const left = Math.floor(((east - minEast) / (maxEast - minEast)) * 100)
      if (textFlow === 'left')
        return { top: top + '%', right: 100 - left + '%' }
      else return { top: top + '%', left: left + '%' }
    },
  },
}
</script>

<style lang="postcss">
/* simple fade transition */
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-150;
}
.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}
</style>
