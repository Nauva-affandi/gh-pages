<template>
  <section class="mt-20 flex h-screen w-screen justify-center">
    <div class="flex flex-col">
      <h1 class="mb-7 font-bold sm:text-4xl md:text-[5rem]">404 - not found</h1>
      <div class="flex justify-center">
        <RouterLink to="/">Back to home</RouterLink>
      </div>
    </div>

    <div
      v-if="showConfirm"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
    >
      <div class="max-w-xs space-y-4 rounded-xl bg-white p-6 text-center">
        <p class="text-black">Mau balik ke home?</p>
        <div class="flex justify-center gap-4">
          <button
            class="rounded bg-green-500 px-4 py-2 text-white"
            @click="confirmRedirect"
          >
            Iya
          </button>
          <button
            class="rounded bg-red-500 px-4 py-2 text-white"
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showConfirm = ref(false);
let autoRedirectTimer = null;

onMounted(() => {
  setTimeout(() => {
    showConfirm.value = true;

    autoRedirectTimer = setTimeout(() => {
      router.push("/");
    }, 4000);
  }, 3000);
});

const confirmRedirect = () => {
  clearTimeout(autoRedirectTimer);
  router.push("/");
};

const cancelRedirect = () => {
  clearTimeout(autoRedirectTimer);
  showConfirm.value = false;
};
</script>
