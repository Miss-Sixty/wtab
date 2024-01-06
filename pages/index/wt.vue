<script setup lang="ts">
const confettiVisible = ref(false)
function btnClick() {
  console.log('btnClick')
}
</script>

<template>
  <DialogPage title="关于">
    <div grid gap-2>
      <!-- <div flex gap-2>
        <WtButton type="danger" @click="btnClick">
          按钮
        </WtButton>
        <WtButton type="danger" disabled @click="btnClick">
          按钮
        </WtButton>
        <WtButton round type="danger" @click="btnClick">
          按钮
        </WtButton>
        <WtButton :loading="true" type="danger" @click="btnClick">
          按钮
        </WtButton>
        <WtButton icon="i-solar-bell-bing-bold-duotone" type="danger" @click="btnClick">
          按钮
        </WtButton>
      </div>
      <div flex gap-2>
        <WtButton type="primary" @click="btnClick">
          按钮
        </WtButton>
        <WtButton type="primary" disabled @click="btnClick">
          按钮
        </WtButton>
        <WtButton round type="primary" @click="btnClick">
          按钮
        </WtButton>
        <WtButton :loading="true" type="primary" @click="btnClick">
          按钮
        </WtButton>
        <WtButton icon="i-solar-bell-bing-bold-duotone" type="primary" @click="btnClick">
          按钮
        </WtButton>
      </div>
      <div flex gap-2>
        <WtButton @click="btnClick">
          按钮
        </WtButton>
        <WtButton disabled @click="btnClick">
          按钮
        </WtButton>
        <WtButton round @click="btnClick">
          按钮
        </WtButton>
        <WtButton :loading="true" @click="btnClick">
          按钮
        </WtButton>
        <WtButton icon="i-solar-bell-bing-bold-duotone" @click="btnClick">
          按钮
        </WtButton>
      </div>
      <div flex gap-2>
        <WtButton size="sm" type="danger" @click="btnClick">
          按钮
        </WtButton>
        <WtButton size="sm" type="primary" @click="btnClick">
          按钮
        </WtButton>
        <WtButton size="sm" @click="btnClick">
          按钮
        </WtButton>
        <WtButton size="lg" type="danger" @click="btnClick">
          按钮
        </WtButton>
        <WtButton size="lg" type="primary" @click="btnClick">
          按钮
        </WtButton>
        <WtButton size="lg" @click="btnClick">
          按钮
        </WtButton>
      </div> -->

      <div>
        <WtSwitch v-model="confettiVisible" />
      </div>

      <!--   <div>
        <WtInput v-model="confettiVisible" />
      </div> -->
    </div>
  </DialogPage>
</template>
