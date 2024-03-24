<script setup lang="ts">
import useAppStore from '@/stores/app'
const appStore = useAppStore()

const url = ref('')
watch(() => appStore.wallpaperType, (val) => {
  url.value = val
})

onMounted(() => {
  url.value = appStore.wallpaperType
})
</script>

<template>
  <Transition enter-active-class="animate-fade-in">
    <div v-if="url" :style="{ backgroundImage: `url(${appStore.wallpaperType})` }" s select-none z--1 fixed size-full
      bg-cover bg-no-repeat bg-fixed bg-center>
    </div>
  </Transition>
</template>