<template>
  <div
    v-show="open"
    class="fixed z-50 inset-0 flex justify-center items-center"
  >
    <!--Overlay  -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      @click="$emit('close')"
    />

    <!-- Modal -->
    <div class="absolute p-2">
      <div
        class="p-4 absolute text-white cursor-pointer right-0 transition duration-200 ease-in-out transform hover:scale-125"
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
      <NuxtPicture
        :src="`${currentImg.src}`"
        :alt="`${currentImg.alt}`"
        format="webp"
        quality="100"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  currentImg: { src: string; alt: string }
}>()

defineEmits(['close'])
</script>
