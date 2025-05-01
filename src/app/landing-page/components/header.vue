<template>
  <header
    class="absolute left-0 top-0 z-10 flex w-full items-center bg-transparent"
  >
    <div class="container">
      <div class="relative flex items-center justify-between">
        <div class="px-4">
          <a href="#home" class="block py-6 text-lg font-bold text-primary"
            >Nauva affandi
          </a>
        </div>
        <div class="flex items-center px-4">
          <button
            id="hamburger"
            type="button"
            name="hamburger"
            class="absolute right-4 block lg:hidden"
          >
            <span
              class="hamburger-line origin-top-right transition duration-300 ease-in-out"
            ></span>
            <span
              class="hamburger-line-2 origin-right transition duration-300 ease-in-out"
            ></span>
            <span
              class="hamburger-line origin-top-right transition duration-300 ease-in-out"
            ></span>
          </button>
          <nav
            id="nav-menu"
            class="absolute right-4 top-full hidden w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg lg:static lg:block lg:max-w-full lg:rounded-none lg:bg-transparent lg:shadow-none dark:bg-dark dark:shadow-slate-500 lg:dark:bg-transparent"
          >
            <ul class="block lg:flex">
              <li class="group">
                <a
                  href="#home"
                  class="mx-8 flex py-2 text-base text-dark dark:text-white group-hover:text-primary"
                  >Home</a
                >
              </li>
              <li>
                <a
                  href="#about"
                  class="mx-8 flex py-2 text-base text-dark dark:text-white group-hover:text-primary"
                  >About me</a
                >
              </li>
              <li>
                <a
                  href="#portfolio"
                  class="mx-8 flex py-2 text-base text-dark dark:text-white group-hover:text-primary"
                  >Portfolio</a
                >
              </li>
              <li>
                <a
                  href="#contact"
                  class="mx-8 flex py-2 text-base text-dark dark:text-white group-hover:text-primary"
                  >Contact</a
                >
              </li>
              <li class='mt-4 lg:mt-0'>
                <DarkToggle class='mx-8 mr-2'/>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from "vue"


import DarkToggle from '@/components/darkmode-toggle/App.vue'

onMounted(() => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("hamburger-active");

    navMenu.classList.toggle("hidden");
  });

  window.onscroll = function () {
    const header = document.querySelector("header");
    const fixedNav = header.offsetTop
    
    if (window.pageYOffset > fixedNav) {
      header.classList.add("navbar-fixed")
    } else {
      header.classList.remove("navbar-fixed")
    }
  };
});
</script>

<style scoped>
.hamburger-line {
  @apply block h-[2px] w-[30px] bg-dark dark:bg-white;
}
.hamburger-line-2 {
  @apply my-[8.7px] ml-auto block h-[2px] w-[25px] bg-dark dark:bg-white;
}
.hamburger-active > span:nth-child(1) {
  @apply -rotate-45;
}
.hamburger-active > span:nth-child(2) {
  @apply scale-x-0;
}
.hamburger-active > span:nth-child(3) {
  @apply rotate-45;
}
.navbar-fixed {
  @apply fixed z-[99999999] bg-white bg-opacity-80 backdrop-blur-sm-1 dark:bg-dark dark:bg-opacity-80;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.2);
}
</style>
