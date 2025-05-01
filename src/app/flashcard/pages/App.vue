//app/flashcard

<script setup lang="ts">
import searchSelect from "../components/search-select.vue";
import $ from "func/$.ts";
import temporarily_disable_btn from "func/button-disabled-temporary.ts";
import { onMounted, ref, computed } from "vue";
import searchIcon from "@/assets/icon/search.vue";
import {
  next_btn,
  next_forgot1_btn,
  next_forgot2_btn,
} from "./../helper/reshuffle.ts";
import { flashcardStore } from "store/flashcard.ts";

const state = flashcardStore();
const showSearch = ref(false);

onMounted(() => {
  const card = $("card");
  card.addEventListener("click", () => {
    card.classList.toggle("rotated");
  });
});

// display logic
const fm = computed(() => {
  if (state.stackType === "KANJI") return state.stack[0].k;
  else if (state.stackType === "KOTOBA") return state.stack[0].k;
  else return "--";
});

const fs = computed(() => {
  if (state.stackType === "KANJI") return "";
  else if (state.stackType === "KOTOBA") return state.stack[0].h;
  else return "--";
});

const bm = computed(() => {
  if (state.stackType === "KANJI") return state.stack[0].h;
  else if (state.stackType === "KOTOBA") return state.stack[0].i;
  else return "--";
});

const bs = computed(() => {
  if (state.stackType === "KANJI") return state.stack[0].i;
  else if (state.stackType === "KOTOBA") return "";
  else return "--";
});

const stackCount = computed(() => {
  if (state.stackType === "KANJI" || state.stackType === "KOTOBA")
    return `• jumlah kartu : ${state.card_stack}`;
  else return "";
});

const stackOpen = computed(() => {
  if (state.stackType === "KANJI") return `Kanji ${state.stackLv}`;
  else if (state.stackType === "KOTOBA") return `• Kotoba ${state.stackLv}`;
  else return "";
});

// app logic

function add_history() {
  const max = Math.min(5 + Math.floor(state.stack.length / 20), 12);
  if (state.history.length < max) {
    state.history.unshift(JSON.parse(JSON.stringify(state.stack)));
  } else {
    state.history.pop();
    state.history.unshift(JSON.parse(JSON.stringify(state.stack)));
  }
  $("undo_warn").classList.add("hidden");
}

function undo_history() {
  if (state.history.length > 0) {
    state.stack = JSON.parse(JSON.stringify(state.history.shift()));
  }
  if (state.history.length === 0) {
    $("undo_warn").classList.remove("hidden");
  }
}

function base_card_execution(callback, target_btn) {
  temporarily_disable_btn(target_btn);
  add_history();
  if (callback) callback(state.stack);
}

// button logic

onMounted(() => {
  const next = $("next_card");
  const nextf1 = $("lupa_satu");
  const nextf2 = $("lupa_semuanya");
  const undo = $("undo");

  next.addEventListener("click", () => {
    if (state.Type.includes(state.stackType))
      base_card_execution(next_btn, next);
  });

  nextf1.addEventListener("click", () => {
    if (state.Type.includes(state.stackType))
      base_card_execution(next_forgot1_btn, nextf1);
  });

  nextf2.addEventListener("click", () => {
    if (state.Type.includes(state.stackType))
      base_card_execution(next_forgot2_btn, nextf2);
  });

  undo.addEventListener("click", () => {
    temporarily_disable_btn(undo);
    undo_history();
  });
});
</script>

<template>
  <main>
    <section id="section_card">
      <div id="dev" class="ml-4 mt-5">
        <section id="search">
          <button @click="showSearch = !showSearch" class="flex">
            <searchIcon />
            <span class="ml-1">Search</span>
          </button>
        </section>
        <section class="mt-2">
          <div class="flex h-12 flex-col justify-between">
            <p>{{ stackCount }}</p>
            <p>{{ stackOpen }}</p>
          </div>
        </section>
      </div>

      <div id="container" class="relative mt-24 flex w-full justify-center">
        <div class="md:w-[75%]">
          <div
            id="card-content"
            class="md:w-sm:w-full text-1xl h-48 rounded-3xl bg-gray-500 p-1 font-bold text-black dark:bg-[#f2f2f2]"
          >
            <div
              id="card"
              class="perspective-1000 relative h-[184px] w-full duration-700"
            >
              <div
                class="transform-style-preserve-3d card_animation absolute inset-0 h-full w-full"
                id="card-inner"
              >
                <div
                  id="front"
                  class="backface-hidden absolute flex h-full w-full items-center justify-center rounded-3xl bg-blue-50"
                >
                  <div class="flex flex-col">
                    <span class="flex w-full justify-center">
                      <p class="text-3xl">{{ fm }}</p>
                    </span>
                    <span class="flex w-full justify-center">
                      <p>{{ fs }}</p>
                    </span>
                  </div>
                </div>
                <div
                  id="back"
                  class="backface-hidden rotate-y-180 absolute top-0 flex h-full w-full items-center justify-center rounded-3xl bg-blue-50"
                >
                  <div>
                    <span class="flex w-full justify-center">
                      <p class="text-3xl">{{ bm }}</p>
                    </span>
                    <span class="flex w-full justify-center">
                      <p>{{ bs }}</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="control_btn"
            class="mt-5 flex flex-wrap justify-start gap-y-3"
          >
            <button
              id="next_card"
              class="mx-2 rounded-lg border-2 border-white bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 sm:text-sm"
            >
              Next
            </button>
            <button
              id="lupa_satu"
              class="mx-2 rounded-lg border-2 border-white bg-blue-600 px-2 font-bold text-white hover:bg-blue-700"
            >
              lupa kanji / hiragana
            </button>
            <button
              id="lupa_semuanya"
              class="mx-2 rounded-lg border-2 border-white bg-blue-600 px-2 py-2 font-bold text-white hover:bg-blue-700"
            >
              lupa kanji & hiragana
            </button>
          </div>
        </div>
        <div class="absolute top-80 flex flex-col">
          <div class="flex w-full justify-center">
            <p
              id="undo_warn"
              class="mb-2 hidden animate-shake font-bold text-black dark:text-white"
            >
              undo max!
            </p>
          </div>
          <button
            id="undo"
            class="mx-2 rounded-lg border-2 border-white bg-red-500 px-6 py-2 font-bold text-white hover:bg-red-700"
          >
            undo
          </button>
        </div>
      </div>
    </section>
    <section
      id="search"
      v-show="showSearch"
      class="m-3 mt-44 rounded-2xl border border-white p-3"
    >
      <searchSelect />
    </section>
  </main>
</template>

<style scoped>
div#back {
  transform: rotateX(180deg);
}

#card {
  perspective: 1000px; /* Mengatur jarak pandang agar efek rotasi terlihat */
}

.card_animation {
  transition: transform 0.26s ease-in-out;
  transform-style: preserve-3d; /* Biar anak elemen bisa diputar dalam 3D */
}

#card.rotated #card-inner {
  transform: rotateX(180deg);
}

.backface-hidden {
  backface-visibility: hidden;
}
</style>
