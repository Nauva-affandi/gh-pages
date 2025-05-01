<template>
  <RouterView />

  <loginForm />
</template>

<script setup lang="ts">
import loginForm from "@/components/login-form/pages/index.vue";
import { RouterView } from "vue-router";
</script>
