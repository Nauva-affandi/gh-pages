// app/pomodoro
<script setup lang="ts">
import { RouterLink } from "vue-router";
import gear from "@/assets/icon/gear.vue";
import pomodoroStore from "store/pomodoro.ts";

const app = pomodoroStore();
</script>

<template>
  <div class="flex h-screen w-full flex-1 flex-col items-center justify-center">
    <section class="fixed left-0 top-0 ml-4 mt-4">
      <div class="flex">
        <gear />
        <RouterLink to="/app/pomodoro/setting">Setting</RouterLink>
      </div>
      <section class="flex">
        set :
        <span>{{ app.Set }}</span>
      </section>

      <div v-show="app.isActive" class="mt-6 flex flex-col gap-3">
        <div @click="app.pause">
          <p>Pause</p>
        </div>
        <div @click="app.stop">
          <p>Stop</p>
        </div>
      </div>
    </section>

    <span id="on">{{ app.inStatus }}</span>
    <span class="font-mono text-[10rem] font-bold">{{ app.display }}</span>
    <button
      id="startBtn"
      class="mt-20 rounded-xl bg-blue-600 px-8 py-4 text-xl font-bold hover:bg-blue-700"
      @click="app.start"
    >
      MULAI
    </button>
  </div>
</template>
