//app pomodoro setting

<script setup lang="ts">
import { RouterLink } from "vue-router";
import pomodoroStore from "store/pomodoro.ts";

let app = pomodoroStore();
</script>

<template>
  <div class="mx-3 mt-8 max-w-[400px] rounded-xl border p-4">
    <section class="flex h-64 flex-col">
      <button
        class="w-24 rounded-lg bg-blue-500 px-4 py-2 text-xl hover:bg-blue-700"
      >
        <RouterLink to="/app/pomodoro" class="font-bold"> back </RouterLink>
      </button>

      <section id="form" class="relative mt-20">
        <form class="flex flex-col gap-20">
          <div id="focus" class="relative">
            <input
              v-model.number="app.focus"
              id="focus_input"
              type="number"
              required
              placeholder=" "
              class="w-full rounded-md px-4 py-2 text-white"
            />
            <div class="focus_label mx-5 my-2 font-bold">focus</div>
          </div>

          <div id="rest" class="relative">
            <input
              v-model.number="app.rest"
              id="rest_input"
              type="number"
              required
              placeholder=" "
              class="w-full rounded-md px-4 py-2 text-white"
            />
            <div class="rest_label mx-5 my-2 font-bold">rest</div>
          </div>
        </form>
      </section>
    </section>
  </div>
</template>

<style scoped>
input {
  background: transparent;
  position: absolute;
  border-width: 1px;
  border-color: rgb(255, 255, 255);
  z-index: 9998;
}
input:focus {
  outline: none;
}
.focus_label,
.rest_label {
  position: absolute;
  transition: 0.2s ease;
  background-color: #181818;
  padding: 0 5px;
}
#focus_input:focus + .focus_label,
#focus_input:not(:placeholder-shown) + .focus_label,
#rest_input:focus + .rest_label,
#rest_input:not(:placeholder-shown) + .rest_label {
  transform: translate(-2px, -18px);
  z-index: 9999;
}
</style>
