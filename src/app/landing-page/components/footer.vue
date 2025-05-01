<template>
  <section id="footer" class="bg-dark pb-12 pt-24">
    <div class="container">
      <div class="flex flex-wrap">
        <div class="mb-12 w-full px-4 font-medium text-slate-300 md:w-1/3">
          <h2 class="mb-5 text-4xl font-bold text-white">Nauvandi</h2>
          <h3 class="mb-2 text-2xl font-bold">fadilahaffandi696@gmail.com</h3>
          <p>Bekasi</p>
        </div>
        <div class="mb-12 w-full px-4 md:w-1/3">
          <h3 class="mb-5 text-xl font-semibold text-white">Tautan</h3>
          <ul class="text-slate-300">
            <li>
              <a href="#home" class="inline-block text-base hover:text-primary"
                >Home</a
              >
            </li>
            <li>
              <a href="#about" class="inline-block text-base hover:text-primary"
                >About me</a
              >
            </li>
            <li>
              <a
                href="#portfolio"
                class="inline-block text-base hover:text-primary"
                >Portfolio</a
              >
            </li>
            <li>
              <a
                href="#contact"
                class="inline-block text-base hover:text-primary"
                >Contact</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full border-t border-slate-700 pt-10">
        <Sosmed class="mb-5 justify-center text-slate-300" />
        <p class="text-center text-sm text-xs font-medium text-slate-500">
          Dibuat dengan
          <span class="text-pink-500 hover:grayscale"> &#x2764; </span>
          <a
            href="https://www.instagram.com/nauffandi?igsh=YXpiZTNjOXAzemNu"
            target="_blank"
            class="font-bold text-primary"
          >
            Nauva affandi
          </a>
          , menggunakan
          <a
            href="https://v3.tailwindcss.com"
            target="_blank"
            class="font-bold text-sky-500"
          >
            Tailwind.
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import Sosmed from "./../components/sosmed.vue";
</script>
