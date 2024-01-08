<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'
import './styles/base.css'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>

<template>
  <SpeedInsights />
  <NuxtPwaManifest />
  <NuxtPage />
</template>
