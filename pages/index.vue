<script setup lang="ts">
const { x, y } = useMouse()

const colorMode = useColorMode()
function toggleDark() {
  colorMode.value = colorMode.value === 'light'
    ? 'dark'
    : 'light'
}
</script>

<template>
  <div text-red>home--{{ x }},{{ y }}
    <button @click="toggleDark">{{ $colorMode.value }}</button>
  </div>
</template>