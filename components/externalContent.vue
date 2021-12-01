<template>
  <div class="flex items-center h-full">
    <!-- Protection -->
    <div
      v-if="!confirm"
      class="
        w-full
        md:w-1/2
        lg:w-1/2
        p-4
        my-auto
        mx-auto
        border border-gray-400
      "
    >
      <div class="pb-4">
        {{ message }}
      </div>
      <div class="w-full flex items-center justify-center">
        <input
          type="button"
          class="button"
          :value="`${$t('accept')}`"
          @click="confirm = !confirm"
        />
      </div>
    </div>

    <!-- IFrame -->
    <iframe
      v-if="confirm"
      ref="myIframe"
      :src="`${url}`"
      :width="`${width}`"
      :height="`${height}`"
      title="Iframe Example"
      :scrolling="scrollBar === 'yes' ? '' : 'no'"
      class="border border-gray-400 my-0 mx-auto"
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
    scrollBar: {
      type: String,
      default: 'yes',
    },
  },
  data: () => ({
    confirm: false,
  }),
}
</script>
<style lang="postcss">
.nuxt-content .button {
  @apply bg-sogblue-dark border-0 text-white px-4 py-2 text-center cursor-pointer inline-block;
}
</style>
