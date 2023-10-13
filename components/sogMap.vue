<template>
  <!-- paddings are needed for Aachen and Dresden to be properly displayed on the map -->
  <div
    class="flex items-start flex-wrap"
    :class="mapType === 'germany' ? 'pl-8 pr-2' : 'px-0'"
  >
    <div
      class="w-full flex-shrink-0 relative"
      :class="mapType === 'germany' ? 'md:w-1/2 xl:w-2/5' : ''"
    >
      <a
        v-for="place in places"
        :key="place.name"
        :href="'#' + place.name.toLowerCase()"
        class="absolute items-center text-sogblue-darker text-xs sm:text-base xl:text-lg leading-none z-10"
        :class="mapLoaded && configLoaded ? 'flex' : 'hidden'"
        :style="
          configLoaded
            ? relPos(
                {
                  north: place.coordinates.north,
                  east: place.coordinates.east,
                },
                place.text_flow
              )
            : ''
        "
      >
        <div v-if="place.text_flow === 'left'" class="-mt-3 sm:-mt-5 xl:-mt-7">
          {{ place.name }}
        </div>
        <svg
          class="h-4 w-4 -mt-4 sm:h-6 sm:w-6 sm:-mt-6 xl:h-8 xl:w-8 xl:-mt-8 fill-current"
          :class="
            place.text_flow === 'left'
              ? '-mr-2 sm:-mr-3 xl:-mr-4'
              : '-ml-2 sm:-ml-3 xl:-ml-4'
          "
        >
          <use :href="localePath('/sprites/mapSymbols.svg#marker')" />
        </svg>
        <div v-if="place.text_flow !== 'left'" class="-mt-3 sm:-mt-5 xl:-mt-7">
          {{ place.name }}
        </div>
      </a>
      <object
        :data="'/' + mapType + '.svg'"
        class="block opacity-20 z-0"
        alt="Gemany MAP"
        @load="mapLoaded = true"
      />
    </div>
    <transition name="fade" mode="out-in">
      <div
        v-if="selectedPlace && mapLoaded"
        :key="selectedPlace.name"
        :class="
          mapType === 'germany'
            ? '-ml-8 -mr-2 md:w-1/2 xl:w-3/5 md:min-w-0 sm:pl-8 lg:pl-20'
            : 'lg:px-24 xl:px-24 2xl:px-40'
        "
        class="min-w-full mt-2 md:mx-0"
      >
        <h2 class="text-sogblue font-light text-2xl sm:text-3xl">
          {{ selectedPlace.name }}
        </h2>
        <div v-if="selectedPlace.picture">
          <inline-picture
            :img-src="selectedPlace.picture"
            :img-alt="selectedPlace.name"
            position="right"
            :size="mapType === 'world' ? 'medium' : 'full'"
            :margin-left="false"
          >
          </inline-picture>
        </div>
        <span class="whitespace-pre-line" v-html="selectedPlace.text"></span>
        <div
          class="my-4 text-sogblue-darker hover:text-sogblue-lighter flex flex-wrap"
        >
          <a
            v-for="link in selectedPlace.social"
            :key="link.type"
            :href="fullSocialURI(link)"
            target="_blank"
            rel="noopener"
            class="flex items-center leading-none mb-2 hover:text-sogblue-darker transition-colors duration-200"
          >
            <svg class="w-6 h-6 mr-2 fill-current">
              <use
                :href="localePath('/sprites/socialSymbols.svg#' + link.type)"
              />
            </svg>
            <div class="mr-6">
              {{ link.handle }}{{ link.type === 'mail' ? '@' : '' }}
            </div>
          </a>
        </div>
      </div>
      <div
        v-else-if="mapLoaded"
        :class="
          mapType === 'germany'
            ? 'md:w-1/2 xl:w-3/5 md:min-w-0 md:pl-8 lg:pl-20 self-center'
            : ''
        "
        class="min-w-full mt-2"
      >
        <div
          v-if="mapType === 'germany'"
          class="text-gray-500 mb-20 mt-8 lg:my-0 -ml-8 -mr-2"
        >
          Studieren Ohne Grenzen gibt es in vielen Städten. Um mehr zu erfahren,
          wähle eine Stadt aus!
          <svg
            class="hidden md:block w-1/3 xl:w-1/5 ml-8 mt-3 stroke-current stroke-10 fill-none"
          >
            <use :href="localePath('/sprites/mapSymbols.svg#arrow')" />
          </svg>
        </div>
        <div v-else class="text-gray-500 mb-20 mt-8 lg:mt-20 md:text-center">
          In diesen Orten auf der Welt gibt es Programme von Studieren Ohne
          Grenzen.<br />
          Wähle einen Ort aus, um mehr über das entsprechenden Programm zu
          erfahren.
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import inlinePicture from './inlinePicture.vue'
export default {
  name: 'SogMap',
  components: { inlinePicture },
  props: {
    placesConfig: {
      type: String,
      default: 'map',
    },
    mapType: {
      type: String,
      default: 'germany',
      validator: (s) => s === 'germany' || s === 'world',
    },
  },
  data() {
    return {
      places: [],
      mapLoaded: false,
      configLoaded: false,
    }
  },
  async fetch() {
    await this.fetchPlaces()
  },
  computed: {
    selectedPlace() {
      const hash = this.$route.hash.slice(1)
      return this.places.find(
        (place) => place.name.toLowerCase() === decodeURI(hash)
      )
    },
  },
  watch: {
    async placesConfig() {
      await this.fetchPlaces()
    },
  },
  methods: {
    async fetchPlaces() {
      this.configLoaded = false
      this.places = await this.$content(
        `${this.$i18n.locale}`,
        this.placesConfig
      )
        .fetch()
        .then((jsonFile) => jsonFile.places)
      this.configLoaded = true
    },
    fullSocialURI({ type, handle }) {
      switch (type) {
        case 'mail':
          return 'mailto:' + handle + '@studieren-ohne-grenzen.org'
        case 'facebook':
          return 'https://www.facebook.com/' + handle
        case 'instagram':
          return 'https://www.instagram.com/' + handle
        default:
          return ''
      }
    },
    relPos({ north, east }, textFlow) {
      /* @param {{north, east}} absolute positon as WGS84 coordinates in degrees (minutes, seconds as decimals)
       * e.g. Aachen: { north: 50.78, east: 6.08 }, Mweso: {north: -1.13, east: 29.04}
       * @param {textFlow} 'left', if the place name should be aligned left of the pin
       * @return {{top, left}} relative position within the map in %
       */
      if (
        !north ||
        !east ||
        typeof north !== 'number' ||
        typeof east !== 'number'
      )
        throw new Error('inproper coordinates')
      if (!textFlow) textFlow = 'right'

      // convert world coordinates to range (0,360) and (0,180)
      if (this.mapType === 'world') {
        north += 90
        east += 171
      }
      // bounds, note that our map excludes antarctica
      const maxNorth = this.mapType === 'germany' ? 55.05864 : 175
      const minNorth = this.mapType === 'germany' ? 47.271679 : 28
      const maxEast = this.mapType === 'germany' ? 15.043611 : 360
      const minEast = this.mapType === 'germany' ? 5.866944 : 0
      if (
        north > maxNorth ||
        north < minNorth ||
        east > maxEast ||
        east < minEast
      )
        throw new Error('coordinates out of bounds')

      // calc the relative position on the map
      const top = (1 - (north - minNorth) / (maxNorth - minNorth)) * 100
      const left = ((east - minEast) / (maxEast - minEast)) * 100

      // return CSS-like attributes depending on textFlow
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
