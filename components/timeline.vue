<template>
  <div
    class="
      p-1
      w-full
      md:overflow-x-scroll md:p-5
      lg:overflow-x-scroll lg:p-5
      whitespace-nowrap
    "
  >
    <div
      v-for="(item, index) in timelines"
      :key="index"
      class="
        h-full
        md:w-1/5 md:inline-block md:align-top
        lg:w-1/5 lg:align-top lg:inline-block
      "
    >
      <div class="h-40 relative md:h-full flex items-center">
        <div
          class="
            h-full
            left-3.6
            absolute
            border border-gray-700
            lg:w-full lg:h-0 lg:left-0 lg:self-center
            md:w-full md:h-0 md:left-0 md:self-center
          "
        ></div>
        <div
          class="flex justify-between items-center w-full lg:h-full md:h-full"
          :class="
            modulo(index) === 0
              ? `md:flex-col lg:flex-col flex-row}`
              : `md:flex-col-reverse lg:flex-col-reverse`
          "
        >
          <div class="hidden order-1 md:block md:h-20 lg:block lg:h-20"></div>
          <div class="hidden order-1 md:block lg:block h-2"></div>
          <div
            class="
              hidden
              order-1
              md:h-20 md:w-full md:block
              lg:block lg:h-20 lg:w-full
            "
          ></div>
          <div
            class="
              w-7
              h-7
              z-40
              flex
              order-1
              rounded-full
              items-center
              justify-center
              border-2 border-gray-700
            "
          >
            <div
              class="
                w-3
                h-3
                z-50
                order-1
                bg-gray-800
                rounded-full
                border-2 border
              "
            ></div>
          </div>
          <div
            class="
              w-2/7
              order-1
              md:h-20 md:w-0
              border-2-2 border-gray-700 border
            "
          ></div>
          <div class="h-1.5 w-1.5 order-1 bg-gray-800 rounded-full"></div>
          <div
            class="
              py-4
              w-3/5
              md:p-2
              order-1
              relative
              cursor-pointer
              md:h-20 md:w-full
              lg:h-20 lg:w-full
            "
            @click="moreInfo(`${index}`)"
          >
            <div class="p-1 text-2xl flex justify-center items-center">
              {{ item.date }}
            </div>
            <div class="pt-0 pb-1 flex justify-center items-center">
              {{ item.title }}
            </div>
            <div
              class="absolute z-50 hidden bg-white"
              :class="
                modulo(index) === 0
                  ? `content${index} md:bottom-full lg:bottom-full`
                  : `content${index}`
              "
              style="white-space: break-spaces"
            >
              <p class="break-words text-sm">{{ item.text }}</p>
            </div>
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
    moreInfo(index) {
      const element = document.getElementsByClassName(`content${index}`)
      if (element[0].classList.contains('hidden')) {
        element[0].classList.remove('hidden')
      } else {
        element[0].classList.add('hidden')
      }
    },
  },
}
</script>
