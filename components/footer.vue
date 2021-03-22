<template>
  <nav class="container pb-10">
    <ul class="flex border-t-2 border-sogblue-darker pt-4">
      <li
        v-for="item in items"
        :key="item"
        class="mr-2 px-2 xl:mr-4 2xl:mr-8"
        @mouseenter="itemSelected = item"
        @mouseleave="itemSelected = ''"
      >
        <nuxt-link
          :to="localePath(`/${item}`)"
          :class="{
            'border-sogblue':
              $route.params.slug === item &&
              (itemSelected === item || itemSelected === ''),
            'border-gray-300':
              $route.params.slug === item && itemSelected !== item,
            'text-sogblue-dark': itemSelected === item,
            'text-gray-300': itemSelected !== item && itemSelected !== '',
          }"
          class="border-b-2 border-white pb-1 transition-colors duration-200"
        >
          {{ $t(`footer.${item}`) }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      itemSelected: '',
    }
  },
}
</script>

<style scoped></style>
