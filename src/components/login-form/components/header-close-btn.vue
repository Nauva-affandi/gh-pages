<template>
  <div
    class="absolute top-0 z-[2015] flex h-10 w-full flex-row-reverse items-center border-b-2 border-gray-700 text-2xl text-black"
  >
    <button
      type="button"
      id="btn-close"
      class="h-full cursor-pointer border-l-2 border-gray-700 pl-3 pr-2"
      @click="app.use('hide')"
    >
      <span
        class="font-bold opacity-100 transition-opacity duration-500 ease-in-out hover:opacity-0"
      >
        close
      </span>
      <span class="font-bold hover:text-red-600"> &times; </span>
    </button>
  </div>
</template>

<script setup>
import loginUiStore from "store/login.ts";
const app = loginUiStore();
</script>
