<script setup>
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'

const list = [{
  type: 'light',
  icon: 'i-solar-sun-bold',
}, {
  type: 'dark',
  icon: 'i-solar-moon-bold',
}, {
  type: 'system',
  icon: 'i-solar-laptop-minimalistic-bold',
}]
</script>

<template>
  <RadioGroup v-model="$colorMode.preference">
    <RadioGroupLabel class="sr-only">
      外观颜色
    </RadioGroupLabel>
    <div flex justify-evenly>
      <RadioGroupOption v-for="item in list" v-slot="{ checked }" :key="item.type" :value="item.type">
        <button
          border
          p1.5 rounded-lg hover:bg-primary hover:text-white class="dark:text-gray-300" :class="[
            checked ? 'bg-primary text-white border-color-primary' : 'text-gray-900 border-color-gray-300',
          ]" @click="$colorMode.value = item"
        >
          <div :class="item.icon" text-lg />
        </button>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
