<template>
  <section>
    <a href="#home" id="toTop" class="hidden fixed z-[9999999999] h-12 w-12 rounded-full bg-primary bottom-2 right-4 items-center justify-center hover:animate-pulse">
      <span class="inline-block text-white -rotate-90 scale-150 pb-[0.9px]">
        >
      </span>
    </a>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.onscroll = function () {
    const toTop = document.getElementById('toTop')
    const screenWidth = window.innerWidth
    const scrollThreshold = screenWidth >= 1024 ? 390 : 800

    if (window.pageYOffset > scrollThreshold) {
      toTop.classList.remove("hidden")
      toTop.classList.add("flex")
    } else {
      toTop.classList.add("hidden")
      toTop.classList.remove("flex")
    }
  }
})
</script>