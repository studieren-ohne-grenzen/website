<template>
  <div class="grid gap-3 grid-cols-2">
    <div
      v-for="tile in tiles"
      :key="tile.name"
      class="border rounded-md border-sogblue-white hover:border-sogblue-lighter"
    >
      {{ current_content.id }}
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
  async fetch() {
    const tiles = await this.$content(
      `${this.$i18n.locale}`,
      this.tilesConfig
    ).fetch().imgs
    console.log(tiles)
    return { tiles }
  },
}
/**
 *  props: {
    tilesConfig: {
      type: String,
      default: '',
    },
  },
 * 
 console.log(tiles)
 * 
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
        { id: 3, name: 'test3' },
        { id: 4, name: 'test4' },
        { id: 5, name: 'test5' },
        { id: 6, name: 'test6' },
        { id: 7, name: 'test7' },
 */
</script>
