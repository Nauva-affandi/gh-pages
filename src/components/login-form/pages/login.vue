<template>
  <section v-if="app.status" id="login">
    <div
      class="relative z-[2000] flex min-w-[340px] max-w-[520px] flex-col rounded-b-2xl rounded-tl-2xl bg-blue-50 pt-[40px] shadow-lg md:min-w-[450px]"
    >
      <Header />
      <div
        class="z-[2010] flex max-h-[450px] flex-col overflow-x-hidden overflow-y-scroll pt-7"
      >
        <section id="OAuth" class="flex flex-col gap-4">
          <OAuth>
            <template #provider-icon>
              <img src="@/assets/icon/google-icon.png" alt="goggle icon" />
            </template>
            <template #provider-name> Google </template>
          </OAuth>
        </section>

        <section
          id="or"
          class="relative z-[2005] my-10 h-full w-full border-b-2 border-gray-500"
        >
          <div
            class="text-md absolute -top-3 left-1/2 z-[2010] -translate-x-1/2 bg-blue-50 px-2 font-bold"
          >
            <span> or </span>
          </div>
        </section>

        <section id="login-email-pw" class="flex flex-col gap-7">
          <div
            class="mb-2 flex w-full justify-center text-2xl font-bold text-black"
          >
            <h3>Log in</h3>
          </div>

          <section
            v-if="!app.err.login.valid"
            id="error_fetch"
            class="mb-3 mt-4 flex w-full flex-col"
          >
            <div class="flex w-full justify-center">
              <div
                class="flex w-4/5 min-w-[300px] max-w-[360px] justify-center rounded-xl border-2 border-red-600 bg-slate-200 p-2 text-center text-[14px]"
              >
                {{ app.err.login.msg }}
              </div>
            </div>
          </section>

          <div id="login_email" class="flex w-full flex-col items-center">
            <input_wo_eye>
              <template #placeholder> Email </template>
              <template v-if="app.err.login.email.show" #msg>
                <div class="flex h-[20px] items-center">
                  <correct_circle v-if="app.err.login.email.status == 1" />
                  <x_circle v-if="app.err.login.email.status == 0" />
                </div>
                <div>
                  <p class="ml-1 text-sm">
                    {{ app.err.login.email.msg }}
                  </p>
                </div>
              </template>
            </input_wo_eye>
          </div>

          <div id="login_password" class="flex w-full flex-col items-center">
            <input_w_eye :type="app.pw_login_eye ? 'text' : 'password'">
              <template #placeholder> Password </template>
              <template v-if="app.err.login.pw.show" #msg>
                <div class="flex h-[20px] items-center">
                  <correct_circle v-if="app.err.login.pw.status == 1" />
                  <x_circle v-if="app.err.login.pw.status == 0" />
                </div>
                <div>
                  <p class="ml-1 text-sm">
                    {{ app.err.login.pw.msg }}
                  </p>
                </div>
              </template>
              <template #eye>
                <div
                  class="flex h-full w-10 items-center justify-center"
                  @click="app.toggle_pw_login()"
                >
                  <eye v-if="app.pw_login_eye" />
                  <eyeSlash v-if="!app.pw_login_eye" />
                </div>
              </template>
            </input_w_eye>

            <div id="forgot_pw" class="mt-2 flex w-full justify-center">
              <div class="w-4/5 min-w-[300px] max-w-[360px]">
                <button
                  type="button"
                  class="cursor-pointer text-[14px] font-bold text-blue-600"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="create_account" class="mt-4 flex w-full flex-col">
          <div class="flex w-full justify-center">
            <div class="flex w-4/5 min-w-[300px] max-w-[360px]">
              <button
                @click="app.toggle_status()"
                type="button"
                class="cursor-pointer text-[14px] font-bold text-blue-600"
              >
                Create account
              </button>
            </div>
          </div>
        </section>

        <section id="submit_login" class="mb-7 mt-6 flex w-full flex-col">
          <div class="flex w-full justify-center">
            <div
              class="flex w-4/5 min-w-[300px] max-w-[360px] flex-row-reverse xl:justify-center"
            >
              <button
                type="button"
                class="rounded-md border border-white bg-blue-600 px-4 py-2 text-white"
              >
                login
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { watch, nextTick } from "vue";
import correct_circle from "@/assets/icon/correct-circle.vue";
import x_circle from "@/assets/icon/x-circle.vue";
import eye from "@/assets/icon/eye.vue";
import eyeSlash from "@/assets/icon/eye-slash.vue";
import loginUiStore from "store/login.ts";
import OAuth from "./../components/OAuth.vue";
import Header from "./../components/header-close-btn.vue";
import input_w_eye from "./../components/input-with-eye.vue";
import input_wo_eye from "./../components/input-without-eye.vue";
import validateEmail from "./../utils/validate-email.ts";
import validatePassword from "./../utils/validate-pw.ts";

const app = loginUiStore();

let timeout: ReturnType<typeof setTimeout>;

function debounce(callback: () => void, delay: number) {
  clearTimeout(timeout);
  timeout = setTimeout(callback, delay);
}

let email_input: HTMLInputElement | null = null;
let pw_input: HTMLInputElement | null = null;

function setupListeners() {
  email_input = document.querySelector("#login_email input");
  pw_input = document.querySelector("#login_password input");

  if (!email_input || !pw_input) return;

  email_input.addEventListener("input", handleEmailInput);
  pw_input.addEventListener("input", handlePwInput);
}

function removeListeners() {
  if (email_input) email_input.removeEventListener("input", handleEmailInput);
  if (pw_input) pw_input.removeEventListener("input", handlePwInput);
}

function handleEmailInput() {
  if (!email_input) return;

  app.err.login.email.status = 2;
  app.err.login.email.msg = "Typing checking";
  const value = email_input.value;

  debounce(() => {
    const result = validateEmail(value);

    if (result.valid) {
      app.err.login.email.show = true;
      app.err.login.email.status = 1;
      app.err.login.email.msg = result.msg;
      app.user.email = value;
    } else {
      app.err.login.email.show = true;
      app.err.login.email.status = 0;
      app.err.login.email.msg = result.msg;
    }
  }, 650);
}

function handlePwInput() {
  if (!pw_input) return;

  app.err.login.pw.status = 2;
  app.err.login.pw.msg = "Typing checking";
  const value = pw_input.value;

  debounce(() => {
    const result = validatePassword(value);

    if (result.valid) {
      app.err.login.pw.show = true;
      app.err.login.pw.status = 1;
      app.err.login.pw.msg = result.msg;
      app.user.pw = value;
    } else {
      app.err.login.pw.show = true;
      app.err.login.pw.status = 0;
      app.err.login.pw.msg = result.msg;
    }
  }, 650);
}

watch(
  () => app.show,
  (newVal) => {
    nextTick(() => {
      if (newVal) {
        setupListeners();
      } else {
        removeListeners();
      }
    });
  },
);
</script>
