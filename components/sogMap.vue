<template>
  <div class="flex items-start px-8 md:px-0 flex-wrap">
    <div class="w-full md:w-1/2 flex-shrink-0 relative">
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
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-1 -1 25 25"
          class="h-4 -mt-4 sm:h-6 sm:-mt-6 fill-current text-sogblue-darker"
          :class="
            place.text_flow === 'left' ? '-mr-2 sm:-mr-3' : '-ml-2 sm:-ml-3'
          "
        >
          <path
            d="M12,0C7.8,0,4,3.4,4,7.6S7.5,16.8,12,24c4.5-7.2,8-12.2,8-16.4S16.2,0,12,0Z"
          />
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
      <Map-Germany class="fill-current text-sogblue-dark opacity-20 z-0" />
    </div>
    <div v-if="selectedPlace" class="md:w-1/2 mt-2 -mx-8 sm:mx-0 sm:pl-8">
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
    <div v-else class="w-1/2">
      <h2>
        Studieren Ohne Grenzen gibt es in vielen Städten. Um mehr zu erfahren,
        wähle eine Stadt aus!
      </h2>
    </div>
  </div>
</template>

<script>
import MapGermany from './mapGermany'

export default {
  name: 'SogMap',
  components: { MapGermany },
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
