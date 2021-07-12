<template>
  <div
    class="
      grid grid-flow-row
      xl:grid-cols-4
      lg:grid-cols-3
      md:grid-cols-2
      sm:grid-cols-1
      gap-3
    "
  >
    <SogLink
      v-for="tile in tiles"
      :key="tile.name"
      :dest="tile.url"
      :alt="tile.name"
    >
      <div class="absolute box-content h-32 w-4/12 p-4 border-4">
        <span
          class="
            flex
            opacity-20
            hover:opacity-100
            transition-opacity
            justify-center
          "
          >{{ tile.text }}</span
        >
      </div>

      <nuxt-picture
        :src="tile.image"
        :alt="tile.name"
        quality="80"
        format="webp"
        loading="lazy"
        sizes="sm:70vw md:100vw lg:100vw"
        width="1000px"
        height="1000px"
        class="tile-picture"
      />
    </SogLink>
  </div>
</template>

<script>
import SogLink from '~/components/sogLink'

export default {
  name: 'LandingTiles',
  components: { SogLink },
  props: {
    tilesConfig: {
      type: String,
      default: 'tiles',
    },
  },
  data() {
    return {
      tiles: [],
    }
  },
  async fetch() {
    this.tiles = await this.$content(`${this.$i18n.locale}`, this.tilesConfig)
      .fetch()
      .then((jsonFile) => jsonFile.imgs)
  },
}
</script>

<style lang="postcss">
.tile-picture > img {
  @apply hover:opacity-20 transition-opacity;
}
</style>
