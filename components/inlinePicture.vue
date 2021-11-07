<template>
  <div
    class="inline-block"
    :class="`md:float-${position} lg:float-${position} md:max-w-${fetchSize()}`"
  >
    <div class="p-4 absolute text-white cursor-pointer" @click="galery = true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        />
      </svg>
    </div>
    <SogLink :dest="`${imgUrl}`" :alt="`${imgAlt}`" class="p-2">
      <nuxt-img
        :src="`${imgSrc}`"
        :alt="`${imgAlt}`"
        format="webp jpeg"
        quality="100"
        loading="lazy"
      />
    </SogLink>
    <div v-show="imgSub != null" class="py-3 font-semibold text-center text-xl">
      {{ imgSub }}
    </div>
    <image-galery
      :open="galery"
      :currentImg="{
        src: this.imgSrc,
        alt: this.imgAlt,
      }"
      @close="closeGalery"
    ></image-galery>
  </div>
</template>

<script>
import SogLink from '~/components/sogLink'
import ImageGalery from '~/components/imageGalery.vue'
export default {
  name: 'InlinePicture',
  components: { SogLink, ImageGalery },
  props: {
    imgSrc: { type: String, default: '' },
    imgAlt: { type: String, default: '' },
    imgSub: { type: String, default: null },
    imgUrl: { type: String, default: '/' },
    position: { type: String, default: 'left' },
    size: { type: String, default: 'full' },
  },
  data: () => ({
    galery: false,
  }),
  methods: {
    closeGalery() {
      this.galery = false
    },
    fetchSize() {
      return this.size === 'small'
        ? '1/4'
        : this.size === 'medium'
        ? '1/2'
        : 'full'
    },
  },
}
</script>

<style></style>
