<template>
  <section id="contact" class="pb-32 pt-36 dark:bg-slate-800">
    <div class="container">
      <div class="w-full px-4">
        <div class="mx-auto mb-16 max-w-xl text-center">
          <h4 class="mb-2 text-lg font-semibold text-primary">Contact</h4>
          <h2 class="mb-4 text-3xl font-bold text-dark sm:text-4xl lg:text-5xl dark:text-white">
            Hubungi saya
          </h2>
          <p class="text-md font-medium text-secondary md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa,
            maxime.
          </p>
        </div>
      </div>
      <form>
        <div class="w-full lg:mx-auto lg:w-2/3">
          <div class="mb-8 w-full px-4">
            <label for="name" class="text-base font-bold text-primary">
              Nama
            </label>
            <input
              type="text"
              id="name"
              class="w-full rounded-md bg-slate-200 p-3 text-dark focus:border focus:border-primary focus:outline-none dark:border-2"
            />
          </div>

          <div class="mb-8 w-full px-4">
            <label for="email" class="text-base font-bold text-primary">
              Email
            </label>
            <input
              type="text"
              id="email"
              class="w-full rounded-md bg-slate-200 p-3 text-dark focus:border focus:border-primary focus:outline-none dark:border-2"
            />
          </div>

          <div class="mb-8 w-full px-4">
            <label for="pesan" class="text-base font-bold text-primary">
              Pesan
            </label>
            <textarea
              type="text"
              id="pesan"
              class="h-32 w-full rounded-md bg-slate-200 p-3 text-dark focus:border dark:border-2 focus:border-primary focus:outline-none"
            ></textarea>
          </div>

          <div class="w-full px-4">
            <button
              class="w-full rounded-full bg-primary px-8 py-3 text-base font-semibold text-white transition duration-500 hover:opacity-80 hover:shadow-lg"
            >
              Submit
            </button>
          </div>

          <div class="mt-5 w-full px-4">
            <a
              href="https://wa.me/6285198700195?text=message%20from%20portofolio%20pages%20%3A"
              class="text-md cursor-pointer font-bold text-slate-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              or contact me in
              <span
                class="text-md font-bold text-slate-600 hover:text-blue-600 dark:text-white dark:hover-blue-600"
              >
                whatsapp
              </span>
            </a>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
