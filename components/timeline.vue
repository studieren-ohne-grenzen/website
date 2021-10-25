<template>
  <div class="md:container md:mx-auto sm:w-full h-full">
    <div
      class="
        relative
        wrap
        h-full
        md:flex
        lg:flex
        md:items-center
        lg:items-center
      "
    >
      <div
        class="
          absolute
          border border-gray-700
          h-full
          left-2/4
          lg:w-full lg:h-0 lg:left-0 lg:self-center
          md:w-full md:h-0 md:left-0 md:self-center
        "
      ></div>
      <div
        v-for="(item, index) in timelines"
        :key="index"
        class="
          mb-8
          flex
          justify-between
          items-center
          w-full
          lg:h-full lg:mb-0
          md:h-full md:mb-0
        "
        :class="
          modulo(index) === 0
            ? `md:flex-col lg:flex-col flex-row lg:w-1/${timelines.length} md:w-1/${timelines.length}`
            : `md:flex-col-reverse lg:flex-col-reverse flex-row-reverse lg:w-1/${timelines.length} md:w-1/${timelines.length}`
        "
      >
        <div class="order-1 md:h-28 lg:h-28 w-20"></div>
        <div class="order-1 h-2 w-2"></div>
        <div class="order-1 md:h-20 lg:h-20 w-10"></div>
        <div
          class="
            z-40
            flex
            items-center
            justify-center
            order-1
            border-2 border-gray-700
            w-8
            h-8
            rounded-full
          "
        >
          <div
            class="
              z-50
              order-1
              bg-gray-800
              w-4
              h-4
              border-2 border
              rounded-full
            "
          ></div>
        </div>
        <div
          class="order-1 w-10 md:h-20 md:w-0 border-2-2 border-gray-700 border"
        ></div>
        <div class="order-1 h-2 w-2 bg-gray-800 rounded-full"></div>
        <div
          :id="`text${index}`"
          class="
            order-1
            md:h-28 md:w-full
            lg:h-28 lg:w-full
            w-20
            px-6
            py-4
            md:p-2
            cursor-pointer
            collapse
          "
          @click="moreInfo(`${index}`)"
        >
          <div class="flex justify-center items-center p-1 text-2xl">
            {{ item.date }}
          </div>
          <div class="flex justify-center items-center pt-0 pb-1">
            {{ item.title }}
          </div>
          <div class="hidden" :class="`content${index}`">
            <p
              class="
                text-sm
                leading-snug
                tracking-wide
                text-gray-900 text-opacity-100
              "
            >
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    timelineConfig: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      timelines: [],
    }
  },
  async fetch() {
    this.timelines = await this.$content(
      `${this.$i18n.locale}`,
      this.timelineConfig
    )
      .fetch()
      .then((jsonFile) => jsonFile.timelines)
  },
  methods: {
    modulo(key) {
      return key % 2
    },
    textHeight(textId) {
      console.log(document.getElementById(textId).clientHeight)
      // return document.getElementById(textId).clientHeight
    },
    moreInfo(index) {
      const element = document
        .getElementById(`text${index}`)
        .getElementsByClassName(`content${index}`)
      console.log(element)
      element[0].classList.remove('hidden')
    },
  },
}
</script>

<style lang="postcss">
.moreinfo {
  display: true !important;
}

.timeline {
  width: 100%;
}
</style>
