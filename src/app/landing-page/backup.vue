//app/landing page

<template>
  <section class="ml-10 mt-10 flex">
    <div class="mr-5 flex justify-center align-middle">
      <p class="mt-2">click this to login ></p>
    </div>
    <button
      @click="loginUiStore().use('toggle')"
      type="button"
      id="open-login-form"
      class="open-login-form rounded-xl border-2 border-white bg-blue-600 px-5 py-2 font-bold"
    >
      login
    </button>
  </section>
  <nav class="ml-10 mt-96 flex flex-col gap-6">
    <RouterLink to="/app/pomodoro">pomodoro timer</RouterLink>
    <RouterLink to="/app/flashcard">flashcard</RouterLink>
    <RouterLink to="/app/tetris">tetris</RouterLink>
    <RouterLink to="/app/todo">todo list</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import loginUiStore from "store/login.ts";
</script>
