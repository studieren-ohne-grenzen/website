<template>
  <div class="grid gap-3 grid-cols-2">
    <div
      v-for="current_content in tiles"
      :key="current_content.tiles"
      class="border rounded-md border-sogblue-white hover:border-sogblue-lighter"
    >
      {{ current_content.id }}
      <nuxt-picture
        :src="tiles.image"
        :alt="tiles.name"
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
  name: 'Tiles',
  props: {
    tiles: {
      type: Object,
      default() {
        return {
          tiles: [
            { id: 1, name: 'test1' },
            { id: 2, name: 'test2' },
            { id: 3, name: 'test3' },
            { id: 4, name: 'test4' },
            { id: 5, name: 'test5' },
            { id: 6, name: 'test6' },
            { id: 7, name: 'test7' },
          ],
        }
      },
    },
  },
}
/**
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
        { id: 3, name: 'test3' },
        { id: 4, name: 'test4' },
        { id: 5, name: 'test5' },
        { id: 6, name: 'test6' },
        { id: 7, name: 'test7' },
 */
</script>
