<template>
  <div>
    <nuxt-link
      v-if="dest !== '' && !external"
      :to="localePath(`/${dest}`)"
      :alt="alt"
    >
      <slot></slot>
    </nuxt-link>
    <a
      v-else-if="dest !== '' && external"
      :href="dest"
      :alt="alt"
      target="_blank"
    >
      <slot></slot>
    </a>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  name: 'SogLink',
  props: {
    dest: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
  },
  computed: {
    external() {
      return (
        this.dest.indexOf('https://') === 0 ||
        this.dest.indexOf('http://') === 0
      )
    },
  },
}
</script>
