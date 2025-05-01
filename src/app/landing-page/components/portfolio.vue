<template>
  <section id="portfolio" class="bg-slate-100 pb-16 pt-36 dark:bg-slate-800">
    <div class="container">
      <div class="w-full px-4">
        <div class="mx-auto mb-16 text-center">
          <h4 class="mb-2 text-lg font-semibold text-primary">Portfolio</h4>
          <h2 class="mb-4 text-3xl font-bold text-dark sm:text-4xl lg:text-5xl dark:text-white">
            Projects
          </h2>
          <p class="text-md font-medium text-secondary md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta,
            doloremque? Natus, cum.
          </p>
        </div>
      </div>
      <div
        class="flex w-full flex-wrap justify-center px-4 xl:mx-auto xl:w-10/12"
      >
        <div class="mb-12 p-4 md:w-1/2">
          <div class="h-48 overflow-hidden rounded-md bg-gray-400 shadow-md">
            <img src="" alt="pomodoro" width="w-full" />
          </div>
          <RouterLink to="/app/pomodoro">
            <h3 class="mb-3 mt-5 text-xl font-semibold text-dark dark:text-white">
              Pomodoro timer
            </h3>
          </RouterLink>
          <p class="text-base font-medium text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati,
            accusamus et atque!
          </p>
        </div>

        <div class="mb-12 p-4 md:w-1/2">
          <div class="h-48 overflow-hidden rounded-md bg-gray-400 shadow-md">
            <img src="" alt="Flashcard" width="w-full" />
          </div>
          <RouterLink to="/app/flashcard">
            <h3 class="mb-3 mt-5 text-xl font-semibold text-dark dark:text-white">Flashcard</h3>
          </RouterLink>
          <p class="text-base font-medium text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati,
            accusamus et atque!
          </p>
        </div>

        <div class="mb-12 p-4 md:w-1/2">
          <div class="h-48 overflow-hidden rounded-md bg-gray-400 shadow-md">
            <img src="" alt="Tetris" width="w-full" />
          </div>
          <RouterLink to="/app/tetris">
            <h3 class="mb-3 mt-5 text-xl font-semibold text-dark dark:text-white">Tetris</h3>
          </RouterLink>
          <p class="text-base font-medium text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati,
            accusamus et atque!
          </p>
        </div>

        <div class="mb-12 p-4 md:w-1/2">
          <div class="h-48 overflow-hidden rounded-md bg-gray-400 shadow-md">
            <img src="" alt="Todo list" width="w-full" />
          </div>
          <RouterLink to="/app/todo">
            <h3
              class="mb-3 mt-5 cursor-pointer text-xl font-semibold text-dark dark:text-white"
            >
              Todo list
            </h3>
          </RouterLink>
          <p class="text-base font-medium text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati,
            accusamus et atque!
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
