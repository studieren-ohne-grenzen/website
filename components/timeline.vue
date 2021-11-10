<template>
  <div
    class="
      p-1
      w-full
      md:whitespace-nowrap md:overflow-x-scroll md:p-5
      lg:whitespace-nowrap lg:overflow-x-scroll lg:p-5
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
      <div class="relative md:h-full md:flex md:items-center">
        <div
          class="
            h-full
            left-3.6
            absolute
            bg-gray-500
            border border-gray-500
            lg:w-full lg:h-0 lg:left-0 lg:self-center
            md:w-full md:h-0 md:left-0 md:self-center
          "
        ></div>
        <div
          class="
            flex
            items-start
            w-full
            lg:h-full
            md:items-center md:justify-between md:h-full
          "
          :class="
            modulo(index) === 0
              ? `md:flex-col lg:flex-col flex-row`
              : `md:flex-col-reverse lg:flex-col-reverse`
          "
        >
          <div class="hidden order-1 md:block md:h-43 lg:block lg:h-43"></div>

          <div
            class="pt-6 md:pt-0 w-2/5 flex items-center order-1"
            :class="
              modulo(index) === 0
                ? `md:flex-col lg:flex-col`
                : `md:flex-col-reverse lg:flex-col-reverse`
            "
          >
            <div
              class="
              bg-white
                w-7
                h-7
                z-40
                flex
                order-1
                rounded-full
                items-center
                justify-center
                border-2
              "
              :class="
                modulo(index) === 0 ? 'border-sogorange' : 'border-sogblue'
              "
            >
              <div
                class="w-3 h-3 z-50 order-1 rounded-full"
                :class="modulo(index) === 0 ? 'bg-sogorange' : 'bg-sogblue'"
              ></div>
            </div>
            <div
              class="w-2/3 order-1 md:h-20 md:w-0 border-2-2 border"
              :class="
                modulo(index) === 0 ? 'border-sogorange bg-sogorange' : 'border-sogblue bg-sogblue'
              "
            ></div>
            <div
              class="h-1.5 w-1.5 order-1 rounded-full"
              :class="modulo(index) === 0 ? 'bg-sogorange' : 'bg-sogblue'"
            ></div>
          </div>
          <div
            class="
              py-4
              w-3/5
              order-1
              cursor-pointer
              md:relative md:h-20 md:p-2 md:w-full
              lg:relative lg:h-20 lg:p-2 lg:w-full
            "
            @click="moreInfo(`${index}`)"
          >
            <div class="px-2 py-1 md:p1 text-2xl md:flex md:justify-center md:items-center">
              {{ item.date }}
            </div>
            <div class="px-2 pb-1 md:flex md:justify-center md:items-center">
              {{ item.title }}
            </div>
            <div
              class="px-2 md:absolute lg:absolute z-50 hidden bg-white"
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
