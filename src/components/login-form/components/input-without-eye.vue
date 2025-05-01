<template>
  <section class="parent relative flex w-full justify-center pb-7">
    <div class="relative w-4/5 min-w-[290px] max-w-[360px]">
      <div class="relative flex flex-col items-center">
        <div
          :class="[
            'h-10 w-full rounded-lg border-2',
            isActive ? 'border-blue-600' : 'border-gray-600',
          ]"
        >
          <input
            v-model="inputValue"
            required
            placeholder=" "
            type="text"
            @focus="handleFocus"
            @blur="handleBlur"
            class="input ml-4 h-full w-full cursor-text"
          />
          <div
            :class="[
              'label absolute left-4 bg-blue-50',
              isActive ? 'active-label' : '',
            ]"
          >
            <slot name="placeholder" />
          </div>
        </div>
        <div class="absolute left-2 top-10 mt-[0.52px] flex h-[20px]">
          <slot name="msg" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const inputValue = ref("");
const isFocused = ref(false);

const isActive = computed(() => {
  return isFocused.value || inputValue.value !== "";
});

function handleFocus() {
  isFocused.value = true;
}

function handleBlur() {
  isFocused.value = false;
}
</script>

<style scoped>
input {
  background: transparent;
  z-index: 9998;
}
input:focus {
  outline: none;
}
.label {
  transition: 0.2s ease;
  padding: 0 5px;
  top: 9px;
}
.active-label {
  transform: translate(-0.5px, -18px);
  z-index: 9999;
  color: rgb(37, 99, 235);
}
</style>
