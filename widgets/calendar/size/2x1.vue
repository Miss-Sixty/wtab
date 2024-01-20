<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <p>{{ data?.name }}</p>
  <p>{{ data?.date }}</p>
</template>
