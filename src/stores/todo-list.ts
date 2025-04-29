import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'


const todoScore = defineStore('todo list', () => {
  
  const data = reactive([])
  
  const lastUpdate = ref(Date.now())
  const maxTime = ref(1000 * 60 * 60 * 24 * 30) // 30 hari
  
  const refresh = () => {
    const currentTime = 1000 * 60 * 60 * 2 
    const now = Date.now()
    
    if ((now - lastUpdate.value) < currentTime) {
      for (let i = data.length - 1; i >= 0; i--) {
        if ((now - (data[i] as any).timeStamp) > maxTime.value) {
          data.splice(i, 1)
        }
      }
      lastUpdate.value = Date.now()
    }
  }
  
  return {
    data,
    lastUpdate,
    refresh,
    maxTime,
  }
}, {
  persist: true,
})

export default todoScore