<template>
  <div
    class="grid grid-flow-row lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3"
  >
    <div
      v-for="tile in tiles"
      :key="tile.name"
      class="border rounded-md border-sogblue-white hover:border-sogblue-lighter"
    >
      <SogLink :dest="tile.url" :alt="tile.name" class="">
        <nuxt-picture
          :src="tile.image"
          :alt="tile.name"
          quality="80"
          format="webp"
          loading="lazy"
          sizes="sm:w-11/12 md:min-w-full lg:400px"
          class=""
        />
      </SogLink>
    </div>
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
