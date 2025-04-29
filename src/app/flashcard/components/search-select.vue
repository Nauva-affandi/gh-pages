// app/flashcard

<script setup lang='ts'>
import $ from '@/utils/helper/$.ts'
import shuffle from '@/utils/helper/array-shuffle.ts'
import { ref } from 'vue'
import { flashcardStore } from 'store/flashcard.ts'

const state = flashcardStore()

const showTarget = ref<string | undefined>()

const handleParentChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  showTarget.value = target.value
}

async function GET(target: string, level: string) {
  try {
  	const data = await import(`@/app/flashcard/database/${target}/${level}.json`);
  	return data.default;
  } catch (err) {
  	console.error(err.message);
  }
}

async function setStack() {
	try {
		const parentEl = $('parent') as HTMLSelectElement | null
		const category_id = `category_select_${showTarget.value?.toLowerCase()}`
		const childEl = $(category_id) as HTMLSelectElement | null
		

		if (!parentEl || !childEl) throw new Error('select element not found')

    const data_parent = parentEl.value
		const data_child = childEl.value

		const request = await GET(data_parent, data_child)
		
		const stackHolder = shuffle(request)
		
		state.stack = stackHolder as any[]
		state.stackType = data_parent
		state.stackLv = data_child
		state.history.length = 0
	} catch (err) {
		console.error(err)
	}
}
</script>
	
<template>
	<div class="w-36">
		<select class="focus:outline-none border-2 border border-gray-900 dark:border-white rounded-xl py-1 px-3" @change='handleParentChange' id="parent">
			<option value="undefined" disabled selected>pilih opsi</option>
			<option value="KANJI">kanji</option>
			<option value="KOTOBA">kotoba</option>
			<option value="BUNPOU">bunpou</option>
		</select>
	</div>
	
	<div class="w-36 mt-7" v-show='showTarget === "KANJI"'>
		<select class="focus:outline-none border-2 border border-gray-900 dark:border-white rounded-xl py-1 px-3" id="category_select_kanji">
			<option disabled selected>pilih opsi</option>
			<option value="N5">N5</option>
			<option value="N4">N4</option>
		</select>
	</div>
	
	<div class="w-36 mt-7" v-show='showTarget === "BUNPOU"' >
		<select class="focus:outline-none border-2 border border-gray-900 dark:border-white rounded-xl py-1 px-3" id="category_select_bunpou">
			<option disabled selected>pilih bunpou</option>
			<option value="N5">N5</option>
		</select>
	</div>
	
	<div class="w-36 mt-7" v-show='showTarget === "KOTOBA"' >
		<select class="focus:outline-none border-2 border border-gray-900 dark:border-white rounded-xl py-1 px-3" id="category_select_kotoba">
			<option disabled selected>pilih opsi</option>
			<option value="MNN-BAB-26">minna no nihongo bab 26</option>
		</select>
	</div>
	
	<div v-show='["KOTOBA", "BUNPOU", "KANJI"].includes(showTarget)' class='mt-6'>
		<button id="next_card" class="bg-blue-600 py-2 px-4 rounded-lg font-bold sm:text-sm border-2 border-white hover:bg-blue-700 text-white" @click='setStack'>
			Search
		</button>
	</div>
</template>

<style scoped>
	select {
		background: none;
	}
</style>