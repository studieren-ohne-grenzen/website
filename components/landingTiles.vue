<template>
  <div class="grid gap-3 grid-cols-2">
    <div
      v-for="tile in tiles"
      :key="tile.name"
      class="border rounded-md border-sogblue-white hover:border-sogblue-lighter"
    >
      <nuxt-picture
        :src="tile.image"
        :alt="tile.name"
        quality="80"
        format="webp"
        loading="lazy"
        sizes="sm:25vw lg:400px"
      />
      <!--      <img :src="data(`@/landing/tiles/2_test.jpg`)" /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingTiles',
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
