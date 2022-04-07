<template>
  <div
    class="relative"
    :class="{
      'md:my-0 md:mx-auto': position == 'center',
      'md:float-left lg:float-left': position == 'left',
      'md:float-right lg:float-right': position == 'right',
      'md:max-w-1/4 lg:my-0 lg:mx-auto lg:max-w-1/4': size == 'small',
      'md:max-w-1/2 lg:my-0 lg:mx-auto lg:max-w-1/2': size == 'medium',
      'md:max-w-full lg:my-0 lg:mx-auto lg:max-w-full': size == 'full',
    }"
  >
    <div class="mb-4 lg:mb-6" :class="marginLeft ? 'ml-4 lg:ml-6' : 'ml-0'">
      <div
        class="
          p-4
          absolute
          text-white
          cursor-pointer
          right-0
          transition
          duration-200
          ease-in-out
          transform
          hover:scale-125
        "
        @click="galery = true"
      >
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
      <SogLink
        v-if="imgUrl !== '/'"
        :dest="`${imgUrl}`"
        :alt="`${imgAlt}`"
        class="p-2"
      >
        <nuxt-img
          :src="`${imgSrc}`"
          :alt="`${imgAlt}`"
          format="webp"
          quality="80"
          loading="lazy"
          sizes="sm:100vw md:100vw lg:100vw"
        />
      </SogLink>
      <div v-else @click="galery = true" class="cursor-pointer">
        <nuxt-img
          :src="`${imgSrc}`"
          :alt="`${imgAlt}`"
          format="webp"
          quality="80"
          loading="lazy"
          sizes="sm:100vw md:100vw lg:100vw"
        />
      </div>
      <div v-show="imgSub != null" class="py-1 pl-1 font-semibold text-left">
        {{ imgSub }}
      </div>
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
    marginLeft: { type: Boolean, default: true }
  },
  data: () => ({
    galery: false,
  }),
  methods: {
    closeGalery() {
      this.galery = false
    },
  },
}
</script>

<style></style>
