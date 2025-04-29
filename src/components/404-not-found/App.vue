<template>
  <section class="w-screen h-screen flex justify-center mt-20">
    <div class="flex flex-col">
      <h1 class="font-bold mb-7 sm:text-4xl md:text-[5rem]">404 - not found</h1>
      <div class="flex justify-center">
        <RouterLink to="/">Back to home</RouterLink>
      </div>
    </div>

    <div
      v-if="showConfirm"
      class="fixed inset-0 bg-black/60 flex justify-center items-center z-[9999]"
    >
      <div class="bg-white p-6 rounded-xl text-center space-y-4 max-w-xs">
        <p class='text-black'>Mau balik ke home?</p>
        <div class="flex justify-center gap-4">
          <button
            class="px-4 py-2 bg-green-500 text-white rounded"
            @click="confirmRedirect"
          >
            Iya
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded"
            @click="cancelRedirect"
          >
            Nggak
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showConfirm = ref(false)
let autoRedirectTimer = null

onMounted(() => {
  setTimeout(() => {
    showConfirm.value = true

    autoRedirectTimer = setTimeout(() => {
      router.push('/')
    }, 4000)
  }, 3000)
})

const confirmRedirect = () => {
  clearTimeout(autoRedirectTimer)
  router.push('/')
}

const cancelRedirect = () => {
  clearTimeout(autoRedirectTimer)
  showConfirm.value = false
}
</script>
