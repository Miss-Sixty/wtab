<script setup>
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'

const list = [{
  type: 'light',
  text: '浅色',
  icon: 'i-solar-sun-bold',
}, {
  type: 'dark',
  text: '深色',
  icon: 'i-solar-moon-bold',
}, {
  type: 'system',
  text: '跟随系统',
  icon: 'i-solar-laptop-minimalistic-bold',
}]
</script>

<template>
  <RadioGroup v-model="$colorMode.preference">
    <RadioGroupLabel class="sr-only">外观颜色</RadioGroupLabel>
    <div flex justify-evenly mt-1 gap-4>
      <RadioGroupOption flex-1 v-for="item in list" v-slot="{ checked }" :key="item.type" :value="item.type">
        <WtButton @click="$colorMode.value = item.type" :icon="item.icon" w-full :text="item.text"
          :type="checked ? 'primary' : 'default'" />
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
