<template>
  <div class="flex items-center h-full">
    <!-- Protection -->
    <div
      v-if="!contentAccepted"
      class="w-full md:w-1/2 lg:w-1/2 p-4 my-auto mx-auto border border-gray-400"
    >
      <div class="pb-4">
        {{ props.message }}
      </div>
      <div class="w-full flex items-center justify-center">
        <input
          type="button"
          class="button"
          :value="t('accept')"
          @click="contentAccepted = true"
        >
      </div>
    </div>

    <!-- IFrame -->
    <iframe
      v-if="contentAccepted"
      ref="myIframe"
      :src="props.url"
      :width="props.width"
      :height="props.height"
      title="Iframe Example"
      :scrolling="scrollBar === 'yes' ? '' : 'no'"
      class="border border-gray-400 my-0 mx-auto"
    />
  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  url: {
    type: String,
    required: true,
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
    required: true,
  },
  scrollBar: {
    type: String,
    default: 'yes',
  },
})

const { t } = useI18n()

const contentAccepted = useState('externalContent', () => false)
</script>
