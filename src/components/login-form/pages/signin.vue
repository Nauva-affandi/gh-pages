<template>
  <section v-if="!app.status" id="signin">
    <div
      class="relative z-[2000] flex min-w-[340px] max-w-[520px] flex-col rounded-b-2xl rounded-tl-2xl bg-blue-50 pt-[40px] shadow-lg md:min-w-[450px]"
    >
      <Header />
      <div
        class="z-[2010] flex max-h-[450px] flex-col overflow-x-hidden overflow-y-scroll pt-7"
      >
        <section id="signin_judul" class="mb-6 w-full">
          <div class="flex justify-center">
            <p class="text-2xl font-bold text-black">Sign in</p>
          </div>
        </section>

        <section id="signin-email-pw" class="flex flex-col gap-3">
          <div id="signin_email" class="flex w-full flex-col items-center">
            <input_wo_eye>
              <template #placeholder> Email </template>
              <template v-if="app.err.signin.email.show" #msg>
                <div class="flex h-[20px] items-center">
                  <correct_circle v-if="app.err.signin.email.status == 1" />
                  <x_circle v-if="app.err.signin.email.status == 0" />
                </div>
                <div>
                  <p class="ml-1 text-sm">
                    {{ app.err.signin.email.msg }}
                  </p>
                </div>
              </template>
            </input_wo_eye>
          </div>

          <div id="signin_password" class="flex w-full flex-col items-center">
            <input_w_eye :type="app.pw_signin_eye ? 'text' : 'password'">
              <template #placeholder> Password </template>
              <template v-if="app.err.signin.pw.show" #msg>
                <div class="flex h-[20px] items-center">
                  <correct_circle v-if="app.err.signin.pw.status == 1" />
                  <x_circle v-if="app.err.signin.pw.status == 0" />
                </div>
                <div>
                  <p class="ml-1 text-sm">
                    {{ app.err.signin.pw.msg }}
                  </p>
                </div>
              </template>
              <template #eye>
                <div
                  class="flex h-full w-10 items-center justify-center"
                  @click="app.toggle_pw_signin()"
                >
                  <eye v-if="app.pw_signin_eye" />
                  <eyeSlash v-if="!app.pw_signin_eye" />
                </div>
              </template>
            </input_w_eye>
          </div>

          <div
            id="signin_password_confirm"
            class="flex w-full flex-col items-center"
          >
            <input_w_eye
              :type="app.pw_confirm_signin_eye ? 'text' : 'password'"
            >
              <template #placeholder> Confirm password </template>
              <template v-if="app.err.signin.pw_confirm.show" #msg>
                <div class="flex h-[20px] items-center">
                  <correct_circle
                    v-if="app.err.signin.pw_confirm.status == 1"
                  />
                  <x_circle v-if="app.err.signin.pw_confirm.status == 0" />
                </div>
                <div>
                  <p class="ml-1 text-sm">
                    {{ app.err.signin.pw_confirm.msg }}
                  </p>
                </div>
              </template>
              <template #eye>
                <div
                  class="flex h-full w-10 items-center justify-center"
                  @click="app.toggle_pw_confirm_signin()"
                >
                  <eye v-if="app.pw_confirm_signin_eye" />
                  <eyeSlash v-if="!app.pw_confirm_signin_eye" />
                </div>
              </template>
            </input_w_eye>
          </div>
        </section>

        <section id="have-account" class="mt-4 flex w-full flex-col">
          <div class="flex w-full justify-center">
            <div class="flex w-4/5 min-w-[300px] max-w-[360px]">
              <button
                @click="app.toggle_status()"
                type="button"
                class="cursor-pointer text-[14px] font-bold text-blue-600"
              >
                Log in
              </button>
            </div>
          </div>
        </section>

        <section id="submit_signin" class="mb-7 mt-6 flex w-full flex-col">
          <div class="flex w-full justify-center">
            <div
              class="flex w-4/5 min-w-[300px] max-w-[360px] flex-row-reverse xl:justify-center"
            >
              <button
                type="button"
                class="rounded-md border border-white bg-blue-600 px-4 py-2 text-white"
              >
                signin
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import loginUiStore from "store/login.ts";

import Header from "./../components/header-close-btn.vue";
import input_w_eye from "./../components/input-with-eye.vue";
import input_wo_eye from "./../components/input-without-eye.vue";

import correct_circle from "@/assets/icon/correct-circle.vue";
import x_circle from "@/assets/icon/x-circle.vue";

import eye from "@/assets/icon/eye.vue";
import eyeSlash from "@/assets/icon/eye-slash.vue";

import validateEmail from "./../utils/validate-email.ts";
import validatePassword from "./../utils/validate-pw.ts";

import { watch, nextTick } from "vue";

const app = loginUiStore();

let timeout: ReturnType<typeof setTimeout>;

function debounce(callback: () => void, delay: number) {
  clearTimeout(timeout);
  timeout = setTimeout(callback, delay);
}

let email_input: HTMLInputElement | null = null;
let pw_input: HTMLInputElement | null = null;
let pw_confirm_input: HTMLInputElement | null = null;

function setupListeners() {
  email_input = document.querySelector("#signin_email input");
  pw_input = document.querySelector("#signin_password input");
  pw_confirm_input = document.querySelector("#signin_password_confirm input");

  if (!email_input || !pw_input || !pw_confirm_input) return;

  email_input.addEventListener("input", handleEmailInput);
  pw_input.addEventListener("input", handlePwInput);
  pw_confirm_input.addEventListener("input", handlePwConfirmInput);
}

function removeListeners() {
  if (email_input) email_input.removeEventListener("input", handleEmailInput);
  if (pw_input) pw_input.removeEventListener("input", handlePwInput);
  if (pw_confirm_input)
    pw_confirm_input.removeEventListener("input", handlePwConfirmInput);
}

function handleEmailInput() {
  if (!email_input) return;

  app.err.signin.email.status = 2;
  app.err.signin.email.msg = "Typing checking";
  const value = email_input.value;

  debounce(() => {
    const result = validateEmail(value);

    if (result.valid) {
      app.err.signin.email.show = true;
      app.err.signin.email.status = 1;
      app.err.signin.email.msg = result.msg;
      app.user.email = value;
    } else {
      app.err.signin.email.show = true;
      app.err.signin.email.status = 0;
      app.err.signin.email.msg = result.msg;
    }
  }, 650);
}

function handlePwInput() {
  if (!pw_input) return;

  app.err.signin.pw.status = 2;
  app.err.signin.pw.msg = "Typing checking";
  const value = pw_input.value;

  debounce(() => {
    const result = validatePassword(value);

    if (result.valid) {
      app.err.signin.pw.show = true;
      app.err.signin.pw.status = 1;
      app.err.signin.pw.msg = result.msg;
      app.user.pw = value;
    } else {
      app.err.signin.pw.show = true;
      app.err.signin.pw.status = 0;
      app.err.signin.pw.msg = result.msg;
    }
  }, 650);
}

function handlePwConfirmInput() {
  if (!pw_confirm_input) return;

  app.err.signin.pw_confirm.status = 2;
  app.err.signin.pw_confirm.msg = "Typing checking";
  const value = pw_confirm_input.value;

  debounce(() => {
    const result = validatePassword(value);

    if (result.valid) {
      app.err.signin.pw_confirm.show = true;
      app.err.signin.pw_confirm.msg = result.msg;

      if (value == app.user.pw) {
        app.user.pw_confirm = value;
        app.err.signin.pw_confirm.status = 1;
        app.err.signin.pw_confirm.msg = result.msg;
        console.log(result.msg);
      } else {
        app.err.signin.pw_confirm.msg = "Password dan konfirmasi tidak cocok";
        app.err.signin.pw_confirm.status = 0;
      }
    } else {
      app.err.signin.pw_confirm.show = true;
      app.err.signin.pw_confirm.status = 0;
      app.err.signin.pw_confirm.msg = result.msg;
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
