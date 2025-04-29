<template>
  <div class="fixed inset-0 flex justify-center items-center overflow-y-auto text-black z-[1950] backdrop-blur-sm-1 bg-blue-200/10" v-if="loginUiStore().show">
    <login />
    <signin />
  </div>
</template>

<script setup lang="ts">
import loginUiStore from 'store/login.ts'
import login from './login.vue'
import signin from './signin.vue'
</script>