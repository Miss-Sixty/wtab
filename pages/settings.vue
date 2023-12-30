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

const showLeftSection = computed(() => md.value && route.path === '/settings/base')
const showRightSection = computed(() => md.value && route.path === '/settings')
</script>

<template>
  <DialogPage title="基础设置" :width="1024">
    <div flex h-full>
      <section v-if="!showLeftSection" w-full border-r pr-0 h-full md:pr-3>
        <div space-y-1>
          <NuxtLink v-slot="{ navigate }" to="/settings/base" custom>
            <button
              type="button" hover:bg-violet-50 bg-transparent flex justify-between items-center w-full rounded-md
              px-2 py-2 text-sm @click="navigate"
            >
              <p>头部设置</p>
              <div i-solar-alt-arrow-right-linear />
            </button>
          </NuxtLink>
        </div>
      </section>

      <section v-if="!showRightSection" w-full space-y-1 pl-0 md:pl-3>
        <NuxtLayout name="base">
          <NuxtPage />
        </NuxtLayout>
      </section>
    </div>
  </DialogPage>
</template>
