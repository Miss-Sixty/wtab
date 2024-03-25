<script setup lang="ts">
const breakpoints = useBreakpoints({
  sm: 640,
  md: 832,
  lg: 992,
})
const md = breakpoints.smaller('md')
const route = useRoute()
const router = useRouter()

watchEffect(() => {
  if (!md.value && route.path === '/settings')
    router.push('/settings/base')
})

const showLeftSection = computed(() => md.value && route.path !== '/settings')
const showRightSection = computed(() => md.value && route.path === '/settings')

const list = [
  { title: '基础设置', path: '/settings/base' },
  { title: '壁纸偏好', path: '/settings/wallpaper' },
]
</script>

<template>
  <ClientOnly>
    <DialogPage title="设置" :width="1024" :back-router="showLeftSection ? '/settings' : ''">
      <div flex h-full>
        <section v-if="!showLeftSection" md:border-r pr-0 h-full md:pr-6 class="basis-full md:basis-2/7" space-y-1>
          <NuxtLink v-for="(item, i) in list" :key="i" v-slot="{ navigate, isActive }" :to="item.path" custom>
            <button type="button" hover:bg-primary-50 :class="isActive ? 'bg-primary-50' : ''" flex justify-between
              items-center w-full rounded-md p3 text-sm @click="navigate">
              <p>{{ item.title }}</p>
              <div i-solar-alt-arrow-right-linear />
            </button>
          </NuxtLink>
        </section>

        <section v-if="!showRightSection" class="basis-full md:basis-5/7" safe-area-inset-bottom overflow-y-auto
          space-y-1 pl-0 md:pl-3>
          <NuxtPage />
        </section>
      </div>
    </DialogPage>
  </ClientOnly>
</template>
