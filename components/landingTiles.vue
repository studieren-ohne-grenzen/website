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
      <nuxt-picture
        :src="tile.image"
        :alt="tile.name"
        quality="80"
        format="webp"
        loading="lazy"
        sizes="sm:70vw md:100vw lg:100vw"
        width="1000px"
        height="1000px"
        class="hover:opacity-20 transition-opacity"
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
