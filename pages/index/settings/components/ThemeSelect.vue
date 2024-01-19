<script setup>
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'

const list = [{
  type: 'light',
  text:'浅色',
  icon: 'i-solar-sun-bold',
}, {
  type: 'dark',
  text:'深色',
  icon: 'i-solar-moon-bold',
}, {
  type: 'system',
  text:'跟随系统',
  icon: 'i-solar-laptop-minimalistic-bold',
}]
</script>

<template>
  <RadioGroup v-model="$colorMode.preference">
    <RadioGroupLabel class="sr-only">外观颜色</RadioGroupLabel>
    <div flex justify-evenly mt-1 gap-4>
      <RadioGroupOption flex-1 v-for="item in list" v-slot="{ checked }" :key="item.type" :value="item.type">
        <button border py1.5 w-full rounded-lg
        dark:text-gray-300
        hover="text-white border-color-primary bg-primary"
        flex="~ items-center justify-center"
          :class="[
            checked ? 'bg-primary text-white border-color-primary' : 'text-gray-900 border-color-gray-300',
          ]" 
          @click="$colorMode.value = item">
          <div :class="item.icon" text-lg mr-1/>{{ item.text }}
        </button>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
