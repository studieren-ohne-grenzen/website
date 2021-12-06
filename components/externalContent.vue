<template>
  <div class="flex items-center h-full">
    <!-- Protection -->
    <div
      v-if="!contentAccepted"
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
          @click="accept"
        />
      </div>
    </div>

    <!-- IFrame -->
    <iframe
      v-if="contentAccepted"
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
import { mapMutations, mapState } from 'vuex'
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
  computed: {
    ...mapState(['contentAccepted']),
  },
  methods: {
    ...mapMutations(['accept']),
  },
}
</script>
