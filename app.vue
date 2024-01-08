<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'
import './styles/base.css'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'

SpeedInsights()
</script>

<template>
  <NuxtPwaManifest />
  <NuxtPage />
</template>
