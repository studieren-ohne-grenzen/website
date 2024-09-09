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
        class="flex absolute items-center text-sogblue-darker text-xs sm:text-base xl:text-lg leading-none z-10"
        :style="relPos(place)"
      >
        <div v-if="place.text_flow === 'left'" class="-mt-3 sm:-mt-5 xl:-mt-7" :class="place.active ? '' : 'text-gray-400'">
          {{ place.name }}
        </div>
        <svg
          class="h-4 w-4 -mt-4 sm:h-6 sm:w-6 sm:-mt-6 xl:h-8 xl:w-8 xl:-mt-8"
          :class="[
            place.text_flow === 'left'
              ? '-mr-2 sm:-mr-3 xl:-mr-4'
              : '-ml-2 sm:-ml-3 xl:-ml-4',
            place.active ? 'fill-current' : 'fill-gray-400',
          ]"
        >
          <use href="/sprites/mapSymbols.svg#marker" />
        </svg>
        <div v-if="place.text_flow !== 'left'" class="-mt-3 sm:-mt-5 xl:-mt-7" :class="place.active ? '' : 'text-gray-400'">
          {{ place.name }}
        </div>
      </a>
      <object
        :data="'/' + mapType + '.svg'"
        class="block opacity-20 z-0"
        alt="Gemany MAP"
      />
    </div>
    <transition name="fade" mode="out-in">
      <div
        v-if="selectedPlace"
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
          <InlinePicture
            :img-src="selectedPlace.picture"
            :img-alt="selectedPlace.name"
            position="right"
            :size="mapType === 'world' ? 'medium' : 'full'"
            :margin-left="false"
          />
        </div>
        <span class="whitespace-pre-line" v-html="selectedPlace.text"/>
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
                :href="'/sprites/socialSymbols.svg#' + link.type"
              />
            </svg>
            <div class="mr-6">
              {{ link.handle }}{{ link.type === 'mail' ? '@' : '' }}
            </div>
          </a>
        </div>
      </div>
      <div
        v-else
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
            <use href="/sprites/mapSymbols.svg#arrow" />
          </svg>
        </div>
        <div v-else class="text-gray-500 mb-20 mt-8 lg:mt-20 md:text-center">
          In diesen Orten auf der Welt gibt es Programme von Studieren Ohne
          Grenzen.<br>
          Wähle einen Ort aus, um mehr über das entsprechenden Programm zu
          erfahren.
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useData } from '~/types/composables'
import type { ParsedPlacesContent, Place, SocialUrl } from '~/types/map'

const props = defineProps({
  mapType: {
    type: String,
    default: 'germany',
    validator: (s) => s === 'germany' || s === 'world',
  },
  placesConfig: {
    type: String,
    default: 'map',
  },
  locale: {
    type: String,
    default: 'de',
  },
})

const route = useRoute()

const { value: places } = await useData(`map-${props.locale}-${props.placesConfig.replaceAll('/', '-')}`, async () => {
  const content = await queryContent(props.locale, ...props.placesConfig.split('/')).findOne()
  return (content as ParsedPlacesContent).places
})

const selectedPlace = computed(() => {
  const hash = route.hash.slice(1)
  return places.find(
    (place) => place.name.toLowerCase() === decodeURI(hash),
  )
})

const fullSocialURI = (socialUrl: SocialUrl) => {
  switch (socialUrl.type) {
    case 'mail':
      return 'mailto:' + socialUrl.handle + '@studieren-ohne-grenzen.org'
    case 'facebook':
      return 'https://www.facebook.com/' + socialUrl.handle
    case 'instagram':
      return 'https://www.instagram.com/' + socialUrl.handle
    default:
      return ''
  }
}

const relPos = (place: Place) => {
  let north = place.coordinates.north, east = place.coordinates.east
  // convert world coordinates to range (0,360) and (0,180)
  if (props.mapType === 'world') {
    north += 90
    east += 171
  }
  // bounds, note that our map excludes antarctica
  const maxNorth = props.mapType === 'germany' ? 55.05864 : 175
  const minNorth = props.mapType === 'germany' ? 47.271679 : 28
  const maxEast = props.mapType === 'germany' ? 15.043611 : 360
  const minEast = props.mapType === 'germany' ? 5.866944 : 0
  if (
    north > maxNorth ||
    north < minNorth ||
    east > maxEast ||
    east < minEast
  )
    throw new Error('Coordinates out of bounds for ' + place.name)

  // calc the relative position on the map
  const top = (1 - (north - minNorth) / (maxNorth - minNorth)) * 100
  const left = ((east - minEast) / (maxEast - minEast)) * 100

  // return CSS-like attributes depending on textFlow
  if (place.text_flow === 'left')
    return { top: top + '%', right: 100 - left + '%' }
  else
    return { top: top + '%', left: left + '%' }
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
