<template>
  <div class="flex items-start px-8 md:px-0 flex-wrap">
    <div class="w-full md:w-1/2 flex-shrink-0 relative">
      <a
        href="#aachen-zweigverein"
        class="absolute flex items-center"
        :style="positionAachen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-1 -1 25 25"
          class="
            h-4
            -mt-4
            -ml-2
            sm:h-6
            sm:-mt-6 sm:-ml-3
            fill-white
            stroke-sogblue-dark stroke-2
          "
        >
          <path
            d="M12,0C7.8,0,4,3.4,4,7.6S7.5,16.8,12,24c4.5-7.2,8-12.2,8-16.4S16.2,0,12,0Z"
          />
        </svg>
        <div
          class="-mt-3 sm:-mt-5 text-white text-xs sm:text-base leading-none"
        >
          Aachen
        </div>
      </a>
      <a
        href="#dresden"
        class="absolute flex items-center"
        :style="positionDresden"
      >
        <div
          class="
            -mt-3
            sm:-mt-5
            mr-2
            sm:mr-3
            text-white text-xs
            sm:text-base
            leading-none
          "
        >
          Dresden
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="
            h-4
            -mt-4
            -ml-2
            sm:h-6
            sm:-mt-6 sm:-ml-3
            fill-white
            stroke-sogblue-dark stroke-2
          "
        >
          <path
            d="M12,0C7.8,0,4,3.4,4,7.6S7.5,16.8,12,24c4.5-7.2,8-12.2,8-16.4S16.2,0,12,0Z"
          />
        </svg>
      </a>
      <Map-Germany class="fill-current text-sogblue-dark" />
    </div>
    <div
      v-if="selectedPlace === 'aachen-zweigverein'"
      class="md:w-1/2 mt-2 -mx-8 sm:mx-0 sm:pl-8"
    >
      <h2 class="text-sogblue font-light text-2xl sm:text-3xl">
        Aachen (Zweigverein)
      </h2>
      <div class="my-4">
        <nuxt-picture src="lokalgruppen/aachen.jpg" />
      </div>
      <div>
        Der Zweigverein Aachen trifft ist am Stipendienprogramm Mweso beteiligt,
        wobei in Aachen das Bücherprojekt angesiedelt ist. Wir veranstalten
        zahlreiche Benefiz-Veranstaltungen, wie die Nacht der Profs und schaffen
        Bewusstsein für die Themen von SOG durch Podiumsdiskussionen und
        Filmabende. Schau doch mal vorbei!
      </div>
      <a href="mailto://aachen@studieren-ohne-grenzen.org">Mail</a>
      <a href="https://www.facebook.com/sogaachen">Facebook</a>
      <a href="https://www.instagram.com/sog_aachen/">Instagram</a>
    </div>
    <div
      v-else-if="selectedPlace === 'dresden'"
      class="md:w-1/2 mt-2 -mx-8 sm:mx-0 sm:pl-8"
    >
      <h2 class="text-sogblue font-light text-2xl sm:text-3xl">Dresden</h2>
      <div class="my-4">
        <nuxt-picture src="lokalgruppen/dresden.jpg" />
      </div>
      <div>
        Die Lokalgruppe Dresden trifft ist am Stipendienprogramm Mweso
        beteiligt, wobei in Dresden das Bücherprojekt angesiedelt ist. Wir
        veranstalten zahlreiche Benefiz-Veranstaltungen, wie die Nacht der Profs
        und schaffen Bewusstsein für die Themen von SOG durch
        Podiumsdiskussionen und Filmabende. Schau doch mal vorbei!
      </div>
      <a href="mailto://aachen@studieren-ohne-grenzen.org">Mail</a>
      <a href="https://www.facebook.com/sogaachen">Facebook</a>
      <a href="https://www.instagram.com/sog_aachen/">Instagram</a>
    </div>
    <div v-else class="w-1/2">
      <h2>Wähle eine Stadt aus!</h2>
    </div>
  </div>
</template>

<script>
import MapGermany from './mapGermany'

export default {
  name: 'SogMap',
  components: { MapGermany },
  computed: {
    selectedPlace() {
      return this.$route.hash.slice(1)
    },
    positionAachen() {
      return this.relPosGermany({ north: 50.776667, east: 6.083611 })
    },
    positionDresden() {
      const flow = 'left'
      return this.relPosGermany({ north: 51.049259, east: 13.73836 }, flow)
    },
  },
  methods: {
    relPosGermany({ north, east }, flow) {
      /* @param {{north, east}} absolute positon within Germany as WGS84 coordinates
       *        in degrees (minutes, seconds as decimals), e.g. Aachen: { north: 50.78, east: 6.08 }
       * @param {flow} 'left', if the place name should be aligned left of the pin
       * @return {{top, left}} relative position within Germany in %
       */
      if (
        !north ||
        !east ||
        typeof north !== 'number' ||
        typeof east !== 'number'
      )
        throw new Error('relPosGermany: inproper coordinates')
      if (!flow) flow = 'right'
      const maxNorth = 55.05864
      const minNorth = 47.271679
      const maxEast = 15.043611
      const minEast = 5.866944
      const top = Math.floor(
        (1 - (north - minNorth) / (maxNorth - minNorth)) * 100
      )
      const left = Math.floor(((east - minEast) / (maxEast - minEast)) * 100)
      if (flow === 'left') return { top: top + '%', right: 100 - left + '%' }
      else return { top: top + '%', left: left + '%' }
    },
  },
}
</script>
