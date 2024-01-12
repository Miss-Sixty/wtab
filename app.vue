<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'
import './styles/base.css'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
import type { UseWebNotificationOptions } from '@vueuse/core'

const options: UseWebNotificationOptions = {
  title: 'Hello, world from VueUse!',
  dir: 'auto',
  renotify: true,
  tag: 'test',
  requestPermissions: false,
}

const {
  isSupported,
  notification,
  show,
  close,
  onClick,
  onShow,
  onError,
  onClose,
  ensurePermissions,
  permissionGranted,
} = useWebNotification(options)

async function ensurePermissionsa() {
  const res = await ensurePermissions()
  alert(res)
}
</script>

<template>
  <div>
    <p>
      是否支持: {{ isSupported }}
    </p>
    <p>
      有无权限: {{ permissionGranted }}     <button bg-red @click="ensurePermissionsa">
        获取权限
      </button>
    </p>

    <p>
      <button @click="show()">
        显示通知
      </button>
    </p>
    <p>
      <button @click="close()">
        关闭通知
      </button>
    </p>
  </div>
  <SpeedInsights />
  <NuxtPwaManifest />
  <NuxtPage />
</template>
