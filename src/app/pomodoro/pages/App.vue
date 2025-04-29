// app/pomodoro
<script setup lang='ts'>
import { RouterLink } from 'vue-router'
import gear from '@/assets/icon/gear.vue'
import pomodoroStore from 'store/pomodoro.ts'

const app = pomodoroStore()
</script>

<template>
  <div class="flex flex-col items-center justify-center flex-1 w-full h-screen">
    <section class='fixed top-0 left-0 mt-4 ml-4'>
      <div class='flex'>
        <gear />
        <RouterLink to='/app/pomodoro/setting'>Setting</RouterLink>
      </div>
      <section class='flex'>
        set :
        <span>{{ app.Set }}</span>
      </section>

      <div v-show='app.isActive' class='mt-6 flex flex-col gap-3'>
        <div @click="app.pause">
          <p>Pause</p>
        </div>
        <div @click="app.stop">
          <p>Stop</p>
        </div>
      </div>
    </section>

    <span id='on'>{{ app.inStatus }}</span>
    <span class="text-[10rem] font-mono font-bold">{{ app.display }}</span>
    <button id="startBtn" class="mt-20 px-8 py-4 bg-blue-600 rounded-xl hover:bg-blue-700 text-xl font-bold" @click="app.start">
      MULAI
    </button>
  </div>
</template>
