<template>
  <div class="flex w-full justify-center">
    <div
      class="flex w-[80%] cursor-pointer rounded-2xl border-2 border-gray-400 py-2"
    >
      <button class="flex w-full justify-center gap-2">
        <section>
          <div class="w-8">
            <slot name="provider-icon" />
          </div>
        </section>
        <section>
          <p class="text-2xl font-bold">
            <slot name="provider-name" />
          </p>
        </section>
      </button>
    </div>
  </div>
</template>
