<template>
  <div class="relative w-full flex items-center h-4">
    <input
      name="range" min="0" max="100" step="1" type="range"
      class="w-full absolute appearance-none cursor-pointer disabled:cursor-not-allowed disabled:bg-opacity-50
    focus:outline-none peer group bg-transparent rounded-lg focus-visible:ring-2 focus-visible:ring-primary-500
    dark:focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white
    dark:focus-visible:ring-offset-gray-900 h-4
    [&amp;::-webkit-slider-thumb]:relative
    [&amp;::-moz-range-thumb]:relative
    [&amp;::-webkit-slider-thumb]:z-[1]
    [&amp;::-moz-range-thumb]:z-[1]
    [&amp;::-webkit-slider-thumb]:appearance-none
    [&amp;::-moz-range-thumb]:appearance-none
    [&amp;::-webkit-slider-thumb]:rounded-full
    [&amp;::-moz-range-thumb]:rounded-full
    [&amp;::-moz-range-thumb]:border-0 text-primary-500 dark:text-primary-400
    [&amp;::-webkit-slider-thumb]:ring-2
    [&amp;::-webkit-slider-thumb]:ring-current
    [&amp;::-webkit-slider-thumb]:bg-white
    [&amp;::-webkit-slider-thumb]:dark:bg-gray-900
    [&amp;::-moz-range-thumb]:bg-current
    [&amp;::-webkit-slider-thumb]:h-4
    [&amp;::-moz-range-thumb]:h-4
    [&amp;::-webkit-slider-thumb]:w-4
    [&amp;::-moz-range-thumb]:w-4
    [&amp;::-webkit-slider-thumb]:-mt-1
    [&amp;::-moz-range-thumb]:-mt-1 [&amp;::-webkit-slider-runnable-track]:group-disabled:bg-opacity-50
    [&amp;::-moz-range-track]:group-disabled:bg-opacity-50 [&amp;::-webkit-slider-runnable-track]:bg-gray-200
    [&amp;::-moz-range-track]:bg-gray-200 [&amp;::-webkit-slider-runnable-track]:dark:bg-gray-700
    [&amp;::-moz-range-track]:dark:bg-gray-700 [&amp;::-webkit-slider-runnable-track]:rounded-lg
    [&amp;::-moz-range-track]:rounded-lg [&amp;::-webkit-slider-runnable-track]:h-2 [&amp;::-moz-range-track]:h-2"
    >
    <span
      class="absolute pointer-events-none peer-disabled:bg-opacity-50 rounded-s-lg bg-primary-500
    dark:bg-primary-400 h-2"
      style="width: 31%;"
    />
  </div>
</template>
