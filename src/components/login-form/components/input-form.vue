<template>
  <div>
    <div id="container" class="relative">
      <input
        id="input"
        type="number"
        required
        placeholder=" "
        class="w-full rounded-md border-gray-600 px-4 py-2 text-white"
      />
      <div class="label mx-5 my-2 font-bold text-black">email</div>
    </div>
  </div>
</template>

<style scoped>
#container input {
  background: transparent;
  position: absolute;
  border-width: 1px;
  z-index: 9998;
}
input:focus {
  outline: none;
}
.label {
  position: absolute;
  transition: 0.2s ease;
  background-color: #181818;
  padding: 0 5px;
}
#input:focus + .label,
#input:not(:placeholder-shown) + .label {
  transform: translate(-2px, -18px);
  z-index: 9999;
}
</style>
