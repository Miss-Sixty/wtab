<script setup lang="ts">

</script>

<template>
  <DialogPage title="基础设置" :width="1024">
    <div flex h-full>
      <section max-w-70 w-full border-r pr-3 h-full hidden md:block>
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

      <section pl-3 w-full space-y-1>
        <NuxtLayout name="base">
          <NuxtPage />
        </NuxtLayout>
      </section>
    </div>
  </DialogPage>
</template>
