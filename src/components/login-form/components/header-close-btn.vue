<template>
  <div class='absolute top-0 z-[2015] flex flex-row-reverse items-center border-gray-700 border-b-2 w-full text-black text-2xl h-10'>
    <button type='button' id='btn-close' class='cursor-pointer pl-3 h-full border-l-2 border-gray-700 pr-2' @click='app.use("hide")'>
      <span class='font-bold transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-0'>
        close
      </span>
      <span class='font-bold hover:text-red-600'>
        &times;
      </span>
    </button>
  </div>
</template>

<script setup>
import loginUiStore from 'store/login.ts'
const app = loginUiStore()
</script>