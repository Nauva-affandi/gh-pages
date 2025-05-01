// stores/dark mode
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const darkmodeStore = defineStore('dark mode', () => {
  const theme = ref('system')

  const isDark = computed(() =>
    theme.value === 'dark'
      ? true
      : theme.value === 'light'
        ? false
        : window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  const Set = (value) => {
    theme.value = value
    applyTheme()
  }

  const applyTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  const init = () => {
    applyTheme()
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'system') applyTheme()
    })
  }

  return {
    theme,
    isDark,
    Set,
    applyTheme,
    init,
  }
}, {
  persist: true,
})

export default darkmodeStore