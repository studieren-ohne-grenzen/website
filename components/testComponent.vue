<template>
  <div>
    {{ text }}
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TestComponent',
  props: { text: { type: String, default: 'blabla' } },
}
</script>

<style></style>
