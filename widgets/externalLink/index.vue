<script setup lang="ts">
defineProps({
  widget: {
    type: Object,
    default: () => ({}),
  },
  type: { // 删除-del 新增-add ''-展示
    type: String,
    default: '',
  },
})

const router = useRouter()

function handleClick() {
  // router.push({ path: '/externalLink/setting' })
}
</script>

<template>
  <div class="cursor-pointer" @click="handleClick">
    <p id="1">
      111
    </p>
    <p id="2">
      222
    </p>
    <p id="3">
      333
    </p>
    <p id="4">
      444
    </p>
  </div>
</template>
