<template>
  <div class="w-full flex flex-col items-center pt-11">
    <div class="w-4/5 min-w-[320px] max-w-[700px] p-2 border rounded-xl">
      <div class="font-bold text-2xl m-3 italic">
        <h3>todo list</h3>
      </div>
      <section class="mt-2 w-full">
        <div
          v-for="topic in data"
          :key="topic.id"
          class="my-5 w-full flex flex-col border rounded-md"
          :id="'topic-' + topic.id"
        >
          <div class="w-full p-2 flex flex-row justify-between">
            <div>
              <h3 class="text-2xl font-bold ml-2">
                {{ topic.judul }}
              </h3>
            </div>
            <div class="text-3xl mr-2 cursor-pointer">
              <span @click="removeTopic(topic.id)">
                &times;
              </span>
            </div>
          </div>

          <div class="border-t w-full flex flex-col gap-2 py-3">
            <div
              v-for="item in topic.item"
              :key="item.id"
              class="flex"
              :id="'task-' + item.id"
            >
              <div class="ml-4 mr-2 text-xl cursor-pointer">
                <span @click="removeTask(topic.id, item.id)">
                  &times;
                </span>
              </div>
              <div>
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <section id='setting' class='w-4/5 min-w-[320px] max-w-[700px] p-2 border rounded-xl mt-5'>
       <div class="p-4">
        <input v-model="judul" placeholder="Judul" class="border p-2 mb-2 w-full bg-blue-50 text-black" />
    
        <div v-for="(task, i) in tasks" :key="i" class="flex mb-2">
          <input v-model="tasks[i]" placeholder="Task..." class="border p-2 w-full text-black" />
        </div>
    
        <button @click="tasks.push('')" class="bg-blue-500 text-white px-4 py-1 rounded mr-2">
          + Task
        </button>
    
        <button @click="submit" class="bg-green-500 text-white px-4 py-1 rounded">
          Submit
        </button>
      </div>
    </section>
    
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import todoStore from 'store/todo-list.ts'
import uuid from 'func/uuid.ts'


const app = todoStore()
const { data } = storeToRefs(app)


const removeTopic = (id) => {
  for (let i = data.value.length - 1; i >= 0; i--) {
    if (data.value[i].id === id) {
      data.value.splice(i, 1)
      break
    }
  }
}

const removeTask = (topicId, taskId) => {
  for (let i = 0; i < data.value.length; i++) {
    if (data.value[i].id === topicId) {
      const items = data.value[i].item
      for (let j = items.length - 1; j >= 0; j--) {
        if (items[j].id === taskId) {
          items.splice(j, 1)
          break
        }
      }
      break
    }
  }
}


const judul = ref('')
const tasks = ref([''])


const submit = () => {
  data.value.push({
    id: uuid(),
    judul: judul.value,
    timeStamp: Date.now(),
    item: tasks.value.map(t => ({ id: uuid(), text: t }))
  })
  judul.value = ''
  tasks.value = ['']
}
</script>
