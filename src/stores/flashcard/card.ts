import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const flashcardStore = defineStore('card', () => {
 
	const stack = ref([1])
	const card_stack = computed(() => stack.value.length)

	return {
		stack,
		card_stack,
	}
})