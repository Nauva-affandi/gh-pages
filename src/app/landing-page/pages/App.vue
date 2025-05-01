<template>
  <div>
    <Header />
    <Hero />
    <About />
    <Portfolio />
    <Tech />
    <Contact />
    <Footer />
    <BackToTop />
  </div>

  <div class="mt-96">
    <backup />
  </div>
</template>

<script setup>
import backup from "./../backup.vue";
import { onMounted } from "vue";
import Header from "./../components/header.vue";
import Hero from "./../components/Hero.vue";
import About from "./../components/about.vue";
import Portfolio from "./../components/portfolio.vue";
import Tech from "./../components/tech.vue";
import Contact from "./../components/contact.vue";
import Footer from "./../components/footer.vue";
import BackToTop from './../components/backToTop.vue'


</script>