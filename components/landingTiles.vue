<template>
  <div class="grid gap-3 grid-cols-2">
    <div v-for="(i, content) in contents" :key="i" class="border rounded-md">
      {{ content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingTiles',
  data() {
    return {
      contents: [
        'Test1',
        'Test2',
        'Test3',
        'Test4',
        'Test5',
        'Test6',
        'Test7',
        'Test8',
      ],
    }
  },
}
</script>
