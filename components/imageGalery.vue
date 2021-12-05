<template>
  <div
    v-show="open"
    class="fixed z-50 inset-0 flex justify-center items-center"
  >
    <!--Overlay  -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      @click="$emit('close')"
    ></div>

    <!-- Modal -->
    <div class="absolute p-2">
      <div
        class="p-4 absolute text-white cursor-pointer right-0"
        @click="$emit('close')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <nuxt-picture
        :src="`${currentImg.src}`"
        :alt="`${currentImg.alt}`"
        format="webp"
        quality="100"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InlineGalery',
  props: {
    open: { type: Boolean, default: false },
    currentImg: { type: Object, default: {} },
  },
}
</script>
<style></style>
