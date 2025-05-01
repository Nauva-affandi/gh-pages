<template>
  <section id="about" class="pb-32 pt-36 dark:bg-dark">
    <div class="container">
      <div class="flex flex-wrap">
        <div class="mb-10 w-full px-4 lg:w-1/2">
          <h4 class="mb-3 text-lg font-bold uppercase text-primary">
            About me
          </h4>
          <h2 class="mb-5 max-w-md text-3xl font-bold text-dark lg:text-4xl dark:text-white">
            Yuk, belajar programming dasar dari manapun
          </h2>
          <p class="max-w-xl text-base font-medium text-secondary lg:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
            veritatis labore voluptatibus quos odio. Libero, beatae?
          </p>
        </div>
        <div class="w-full px-4 lg:w-1/2">
          <h3
            class="mb-4 text-2xl font-semibold text-dark lg:pt-10 lg:text-3xl dark:text-white"
          >
            Mari berteman
          </h3>
          <p class="mb-6 text-base font-medium text-secondary lg:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et id
            fugiat aliquid, aspernatur praesentium repellat similique
            repudiandae temporibus!
          </p>
          <sosmed_icon class="text-slate-500" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import sosmed_icon from "./../components/sosmed.vue";
</script>
