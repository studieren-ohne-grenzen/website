<template>
  <div>
    <NuxtLink
      v-if="dest !== '' && !external"
      :to="localePath(`/${dest}`)"
      :alt="alt"
    >
      <slot />
    </NuxtLink>
    <a
      v-else-if="dest !== '' && external"
      :href="dest"
      :alt="alt"
      rel="noopener"
      target="_blank"
    >
      <slot />
    </a>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ dest: string, alt: string }>()

const localePath = useLocalePath()

const external = computed(() => props.dest.indexOf('https://') === 0 || props.dest.indexOf('http://') === 0)
</script>
