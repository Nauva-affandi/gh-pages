<template>
  <div class='w-full flex justify-center'>
    <div class='w-[80%] flex border-2 border-gray-400 rounded-2xl py-2 cursor-pointer'>
      <button class='flex justify-center w-full gap-2'>
        <section>
          <div class='w-8'>
            <slot name='provider-icon' />    
          </div>
        </section>
        <section>
          <p class='font-bold text-2xl'>
            <slot name='provider-name'/>
          </p>
        </section>
      </button>
    </div>
  </div>
</template>