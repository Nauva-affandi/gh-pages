import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const pomodoroStore = defineStore('pomodoro', () => {
  let timer: ReturnType<typeof setTimeout> | null = null
  
  function formatTime(sec: number) {
    const help = (num: number) => num.toString().padStart(2, '0')

    if (sec >= 3600) {
      const h = help(Math.floor(sec / 3600))
      const m = help(Math.floor((sec % 3600) / 60))
      const s = help(sec % 60)
      return `${h}:${m}:${s}`
    } else {
      const m = help(Math.floor(sec / 60))
      const s = help(sec % 60)
      return `${m}:${s}`
    }
  }

  const isActive = ref(false)
  const focus = ref(25) // menit fokus
  const rest = ref(5) // menit istirahat
  const inStatus = ref('') // 'Focus' atau 'Rest'
  const maxFocus = ref(4) // maksimal focus
  const Set = ref(0) // sudah berapa kali focus
  const sec = ref(0)
  const display = computed(() => {
    return sec.value == 0 ? '--:--' : formatTime(sec.value)
  })

  const start = () => {
    if (isActive.value) return

    isActive.value = true
    if (!inStatus.value) {
      inStatus.value = 'Focus'
      sec.value = focus.value * 60
    }

    timer = setInterval(() => {
      if (sec.value > 0) {
        sec.value--
      } else {
        if (inStatus.value === 'Focus') {
          Set.value++
          if (Set.value >= maxFocus.value) {
            stop()
          } else {
            inStatus.value = 'Rest'
            sec.value = rest.value * 60
          }
        } else if (inStatus.value === 'Rest') {
          inStatus.value = 'Focus'
          sec.value = focus.value * 60
        }
      }
    }, 1000)
  }

  const pause = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
      isActive.value = false
    }
  }

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    isActive.value = false
    inStatus.value = ''
    Set.value = 0
    sec.value = 0
  }

  return {
    isActive,
    focus,
    rest,
    inStatus,
    sec,
    display,
    Set,
    maxFocus,
    start,
    pause,
    stop,
  }
}, {
  persist: true,
})

export default pomodoroStore