import { ref } from 'vue'
import { defineStore } from 'pinia'

export const pomodoroStore = defineStore('pomodoro', () => {
 
	let focus = ref(25)
	let rest = ref(5)

	return {
		focus,
		rest
	}
})