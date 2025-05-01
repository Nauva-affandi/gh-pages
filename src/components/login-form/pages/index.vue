<template>
  <div
    class="fixed inset-0 z-[1950] flex items-center justify-center overflow-y-auto bg-blue-200/10 text-black backdrop-blur-sm-1"
    v-if="loginUiStore().show"
  >
    <login />
    <signin />
  </div>
</template>

<script setup lang="ts">
import loginUiStore from "store/login.ts";
import login from "./login.vue";
import signin from "./signin.vue";
</script>
