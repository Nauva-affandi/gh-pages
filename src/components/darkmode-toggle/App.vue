// darkmode toggle ui

<template>
  <div id='dark' class='flex items-center rounded-full w-fit px-1 py-1 h-9 gap-1 dark:text-white bg-gray-200 dark:bg-slate-700'>
    <div @click='app.Set("system")' :class='darkToggle("system")'>
      <Device class='size-[19px]'/>
    </div>
    <div @click='app.Set("light")' :class='darkToggle("light")'>
      <Light class='size-[19px]'/>
    </div>
    <div @click='app.Set("dark")' :class='darkToggle("dark")'>
      <Dark class='size-[19px]'/>
    </div>
  </div>
</template>

<script setup>
import Light from '@/assets/icon/light.vue'
import Dark from '@/assets/icon/dark.vue'
import Device from '@/assets/icon/computer.vue'


import darkModeStore from 'store/darkMode.ts'

const app = darkModeStore()


const darkToggle = (value) => {
  return `flex items-center justify-center cursor-pointer px-1 py-1 ${app.theme == value ? 'border rounded-full border-slate-400 h-full w-1/3 bg-white dark:bg-slate-800' : ''}`
}
</script>