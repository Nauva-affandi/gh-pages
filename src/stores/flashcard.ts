import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const flashcardStore = defineStore('card', () => {

  const stack = ref([{
    k: '--',
    h: '--',
    i: '--',
  }])
  const history = ref([])
  const stackType = ref('kosong')
  const stackLv = ref('kosong')
  const card_stack = computed(() => {
	  return stack.value.length === 1
		  ? 'kosong'
		  : stack.value.length
  })

  // category yg ada
  const Type = ['KOTOBA', 'KANJI', 'BUNPOU']
  
	return {
	  stack,
	  history,
	  stackType,
	  stackLv,
	  card_stack,
	  Type,
	}
}, {
	persist: true,
})