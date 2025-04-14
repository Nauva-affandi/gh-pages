// app/pomodoro

<script setup lang='ts'>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import gear from '@/assets/icon/gear.vue'
import { pomodoroStore } from '@/stores/pomodoro/setting.ts'

const app = pomodoroStore()

let isFocus = true
const focusCount = ref(1)
const maxFocus = 4
let interval: ReturnType<typeof setInterval> | null = null
let timeLeft = 0

const timerEl = ref<string>('--:--')
const startBtn = ref<HTMLButtonElement | null>(null)

function formatTime(sec: number): string {
  function help(num: number): string {
    return num.toString().padStart(2, '0');
  }

  if (sec >= 3600) {
    const h = help(Math.floor(sec / 3600));
    const m = help(Math.floor((sec % 3600) / 60));
    const s = help(sec % 60);
    
    return `${h}:${m}:${s}`;
  } else {
    const m = help(Math.floor(sec / 60));
    const s = help(sec % 60);
    
    return `${m}:${s}`;
  }
}

function flash(color: 'white' | 'red') {
  const overlay = document.createElement('div')
  overlay.className = `fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-300 ${color === 'white' ? 'bg-white' : 'bg-red-600'} opacity-0`
  document.body.appendChild(overlay)

  let count = 0
  const flashInterval = setInterval(() => {
    overlay.style.opacity = '1'
    setTimeout(() => {
      overlay.style.opacity = '0'
    }, 300)
		
    count++
    if (count >= 3) {
      clearInterval(flashInterval)
      setTimeout(() => overlay.remove(), 400)
    }
  }, 600)
}

function startTimer() {
  if (interval) clearInterval(interval)

  const focusMinutes = app.focus || 25
  const restMinutes = app.rest || 5
  timeLeft = (isFocus ? focusMinutes : restMinutes) * 60
  timerEl.value = formatTime(timeLeft)

  interval = setInterval(() => {
    timeLeft--
    timerEl.value = formatTime(timeLeft)
		
    if (timeLeft <= 0) {
			clearInterval(interval!)
			flash(isFocus ? 'red' : 'white')
			
			if (isFocus) {
			  focusCount.value++
			  if (focusCount.value >= maxFocus) return
			}
			
			isFocus = !isFocus
			startTimer()
    }
  }, 1000)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center flex-1 w-full h-screen">
    <section class='fixed top-0 left-0 mt-4 ml-4'>
      <div class='flex'>
        <gear />
        <RouterLink to='/app/pomodoro/setting'>Setting</RouterLink>
      </div>
    </section>
    
    <span class="text-[10rem] font-mono font-bold">{{ timerEl }}</span>
    <button ref="startBtn" class="mt-20 px-8 py-4 bg-blue-600 rounded-xl hover:bg-blue-700 text-xl font-bold" @click='() => {isFocus = true; startTimer()}'>
      MULAI
    </button>
  </div>
</template>