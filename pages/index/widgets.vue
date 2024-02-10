<script setup lang="ts">
const breakpoints = useBreakpoints({
  sm: 640,
  md: 832,
  lg: 992,
})
const md = breakpoints.smaller('md')
const route = useRoute()
const router = useRouter()
const widgetList:any = shallowRef()

watchEffect(() => {
  if (!md.value && route.path === '/widgets') router.push('/widgets/calendar')
})

const showLeftSection = computed(() => md.value && route.path !== '/widgets')
const showRightSection = computed(() => md.value && route.path === '/widgets')


async function init() {
  const widgets = await import('@/widgets')
  widgetList.value = await widgets.default()
}
init()

</script>

<template>
  <ClientOnly>
    <DialogPage title="添加小组件" :width="1024" :back-router="showLeftSection ? '/widgets' : ''">
      <div flex h-full>
        <section
          v-if="!showLeftSection"
          md:border-r
          pr-0 h-full md:pr-6
          class="basis-full md:basis-1/5"
          space-y-1
        >
          <NuxtLink
            v-for="(item, i) in widgetList"
            :key="i"
            v-slot="{ navigate, isActive }"
            :to="`/widgets/${item.key}`" custom
          >
            <button
              type="button"
              hover:bg-primary-50
              :class="isActive ? 'bg-primary-50' : ''"
              flex justify-between items-center w-full rounded-md
              p3 text-sm

              @click="navigate"
            >
              <p>{{ item.name }}</p>
              <div i-solar-alt-arrow-right-linear />
            </button>
          </NuxtLink>
        </section>

        <section v-if="!showRightSection" class="basis-full md:basis-4/5" space-y-1 pl-0 md:pl-3>
          <NuxtPage />
        </section>
      </div>
    </DialogPage>
  </ClientOnly>
</template>
