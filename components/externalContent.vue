<template>
  <div class="w-auto h-full">
    <!-- Protection -->
    <div
      v-if="confirm"
      class="w-1/2 p-4 my-auto mx-auto border border-gray-400"
    >
      <p class="pb-4">
        {{ message }}
      </p>
      <input
        type="button"
        class="button"
        value="Zustimmen"
        @click="confirm = !confirm"
      />
    </div>

    <!-- IFrame -->
    <iframe
      v-if="!confirm"
      ref="myIframe"
      :src="`${url}`"
      :width="`${width}`"
      :height="`${height}`"
      title="Iframe Example"
      class="my-auto mx-auto border border-gray-400"
    ></iframe>
  </div>
</template>
<script>
export default {
  name: 'ExternalContent',
  props: {
    url: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '1024px',
    },
    message: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    confirm: false,
  }),
  beforeMount() {
    this.confirm = true
  },
}
</script>
<style lang="postcss">
.nuxt-content .button {
  @apply bg-sogblue border-0 text-white px-4 py-2 text-center cursor-pointer inline-block;
}
</style>
