<script setup lang="ts">
import dayjs from 'dayjs'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const date = computed(() => ({
  year: dayjs(props.data?.date).format('YYYY'),
  month: dayjs(props.data?.date).format('MM-DD')
}))
</script>

<template>
  <p>{{ data?.name }}</p>
  <p text-sm>{{ date.year }}</p>
  <p text-sm>{{ date.month }}</p>
</template>
