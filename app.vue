<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'
import './styles/base.css'
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
  ensurePermissions()
}

const { $pwa } = useNuxtApp()

const appBadge = ref(1)
function addAppBadge() {
  navigator.setAppBadge(appBadge.value)
  appBadge.value = appBadge.value + 1
}
function clearAppBadge() {
  navigator.clearAppBadge()
  appBadge.value = 1
}
</script>

<template>
  <div pt-20>
    <p>
      <button bg-red mr-6 @click="addAppBadge">
        添加角标
      </button>
      <button bg-red @click="clearAppBadge">
        清空角标
      </button>
    </p>
    <p>是否安装PWA：{{ $pwa?.isPWAInstalled ? '已安装' : '未安装' }}</p>
    <p>
      是否有更新：{{ $pwa?.needRefresh }}
      <button bg-red @click="$pwa?.updateServiceWorker()">
        更新
      </button>
    </p>
    <p>
      是否支持通知: {{ isSupported }}
    </p>
    <p>
      有无通知权限: {{ permissionGranted }}
      <button bg-red @click="ensurePermissionsa">
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
  <NuxtPwaManifest />
  <NuxtPage />
</template>
