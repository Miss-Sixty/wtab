<script lang="ts" setup>
const colorMode = useColorMode()

const toggleMode = () => colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
</script>

<template>
  <button icon @click="toggleMode">
    <div class="i-solar-sun-bold dark:i-solar-moon-bold text-lg" />
  </button>
</template>
