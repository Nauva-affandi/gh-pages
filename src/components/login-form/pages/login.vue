
<template>
  <section v-if='app.status' id='login'>
    <div class='relative bg-blue-50 rounded-b-2xl rounded-tl-2xl z-[2000] flex flex-col shadow-lg min-w-[340px] md:min-w-[450px] max-w-[520px] pt-[40px]'>
      <Header />
      <div class='z-[2010] flex flex-col max-h-[450px] overflow-y-scroll overflow-x-hidden pt-7'>
        <section id="OAuth" class='flex flex-col gap-4'>
          <OAuth>
            <template #provider-icon>
              <img src="@/assets/icon/google-icon.png" alt="goggle icon">
            </template>
            <template #provider-name>
              Google
            </template>
          </OAuth>
        </section>
        
        <section id='or' class='relative h-full w-full my-10 border-b-2 border-gray-500 z-[2005]'>
          <div class='absolute z-[2010] -translate-x-1/2 left-1/2 -top-3 bg-blue-50 px-2 font-bold text-md'>
            <span>
              or
            </span>
          </div>
        </section>
        
        <section id='login-email-pw' class='flex flex-col gap-7'>
          <div class='w-full flex justify-center font-bold text-black text-2xl mb-2'>
            <h3>
              Log in
            </h3>
          </div>
          
          
          <section v-if='!app.err.login.valid' id='error_fetch' class='w-full flex flex-col mt-4 mb-3'>
            <div class='w-full justify-center flex'>
              <div class='w-4/5 min-w-[300px] max-w-[360px] flex justify-center border-2 border-red-600 rounded-xl p-2 text-[14px] text-center bg-slate-200'>
                {{ app.err.login.msg }}
              </div>
            </div>
          </section>
          
          
          <div id='login_email' class='w-full flex flex-col items-center'>
            <input_wo_eye>
              <template #placeholder>
                Email
              </template>
              <template v-if='app.err.login.email.show' #msg>
                <div class='h-[20px] flex items-center'>
                  <correct_circle v-if='app.err.login.email.status == 1'/>
                  <x_circle v-if='app.err.login.email.status == 0'/>
                </div>
                <div>
                  <p class='text-sm ml-1'>
                    {{ 
                      app.err.login.email.msg
                    }}
                  </p>
                </div>
              </template>
            </input_wo_eye>
          </div>
          
          
          <div id='login_password' class='w-full flex flex-col items-center'>
            <input_w_eye :type='app.pw_login_eye ? "text" : "password" '>
              <template #placeholder>
                Password
              </template>
              <template v-if='app.err.login.pw.show' #msg>
                <div class='h-[20px] flex items-center'>
                  <correct_circle v-if='app.err.login.pw.status == 1'/>
                  <x_circle v-if='app.err.login.pw.status == 0'/>
                </div>
                <div>
                  <p class='text-sm ml-1'>
                    {{ 
                      app.err.login.pw.msg
                    }}
                  </p>
                </div>
              </template>
              <template #eye>
                <div class='h-full w-10 flex justify-center items-center' @click='app.toggle_pw_login()'>
                  <eye v-if='app.pw_login_eye'/>
                  <eyeSlash v-if='!app.pw_login_eye'/>
                </div>
              </template>
            </input_w_eye>
            
            <div id="forgot_pw" class='w-full flex justify-center mt-2'>     
              <div class='w-4/5 min-w-[300px] max-w-[360px]'>
                <button 
                  type='button'
                  class='text-blue-600 cursor-pointer font-bold text-[14px]'>
                  Forgot password?
                </button>
              </div>
            </div>
            
            
          </div>
        </section>
        
        
        <section id='create_account' class='w-full flex flex-col mt-4'>
          <div class='w-full justify-center flex'>
            <div class='w-4/5 min-w-[300px] max-w-[360px] flex'>
              <button @click='app.toggle_status()' type='button' class='text-blue-600 cursor-pointer font-bold text-[14px]'>
                Create account
              </button>
            </div>
          </div>
        </section>
        
        
        <section id='submit_login' class='w-full flex flex-col mt-6 mb-7'>
          <div class='w-full justify-center flex'>
            <div class='w-4/5 min-w-[300px] max-w-[360px] flex flex-row-reverse xl:justify-center'>
              <button type='button' class='bg-blue-600 border border-white text-white px-4 py-2 rounded-md'>
                login
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>


<script setup lang='ts'>
import { watch, nextTick } from 'vue'
import correct_circle from '@/assets/icon/correct-circle.vue'
import x_circle from '@/assets/icon/x-circle.vue'
import eye from '@/assets/icon/eye.vue'
import eyeSlash from '@/assets/icon/eye-slash.vue'
import loginUiStore from 'store/login.ts'
import OAuth from './../components/OAuth.vue'
import Header from './../components/header-close-btn.vue'
import input_w_eye from './../components/input-with-eye.vue'
import input_wo_eye from './../components/input-without-eye.vue'
import validateEmail from './../utils/validate-email.ts'
import validatePassword from './../utils/validate-pw.ts'

const app = loginUiStore()

let timeout: ReturnType<typeof setTimeout>

function debounce(callback: () => void, delay: number) {
  clearTimeout(timeout)
  timeout = setTimeout(callback, delay)
}


let email_input: HTMLInputElement | null = null
let pw_input: HTMLInputElement | null = null

function setupListeners() {
  email_input = document.querySelector('#login_email input')
  pw_input = document.querySelector('#login_password input')

  if (!email_input || !pw_input) return

  email_input.addEventListener('input', handleEmailInput)
  pw_input.addEventListener('input', handlePwInput)
}

function removeListeners() {
  if (email_input) 
    email_input.removeEventListener('input', handleEmailInput)
  if (pw_input) 
    pw_input.removeEventListener('input', handlePwInput)
}

function handleEmailInput() {
  if (!email_input) return

  app.err.login.email.status = 2
  app.err.login.email.msg = 'Typing checking'
  const value = email_input.value

  debounce(() => {
    const result = validateEmail(value)

    if (result.valid) {
      app.err.login.email.show = true
      app.err.login.email.status = 1
      app.err.login.email.msg = result.msg
      app.user.email = value
    } else {
      app.err.login.email.show = true
      app.err.login.email.status = 0
      app.err.login.email.msg = result.msg
    }
  }, 650)
}

function handlePwInput() {
  if (!pw_input) return

  app.err.login.pw.status = 2
  app.err.login.pw.msg = 'Typing checking'
  const value = pw_input.value

  debounce(() => {
    const result = validatePassword(value)

    if (result.valid) {
      app.err.login.pw.show = true
      app.err.login.pw.status = 1
      app.err.login.pw.msg = result.msg
      app.user.pw = value
    } else {
      app.err.login.pw.show = true
      app.err.login.pw.status = 0
      app.err.login.pw.msg = result.msg
    }
  }, 650)
}

watch(
  () => app.show,
  (newVal) => {
    nextTick(() => {
      if (newVal) {
        setupListeners()
      } else {
        removeListeners()
      }
    })
  }
)
</script>
