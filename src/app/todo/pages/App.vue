<template>
  <div class="flex w-full flex-col items-center pt-11">
    <div class="w-4/5 min-w-[320px] max-w-[700px] rounded-xl border p-2">
      <div class="m-3 text-2xl font-bold italic">
        <h3>todo list</h3>
      </div>
      <section class="mt-2 w-full">
        <div
          v-for="topic in data"
          :key="topic.id"
          class="my-5 flex w-full flex-col rounded-md border"
          :id="'topic-' + topic.id"
        >
          <div class="flex w-full flex-row justify-between p-2">
            <div>
              <h3 class="ml-2 text-2xl font-bold">
                {{ topic.judul }}
              </h3>
            </div>
            <div class="mr-2 cursor-pointer text-3xl">
              <span @click="removeTopic(topic.id)"> &times; </span>
            </div>
          </div>

          <div class="flex w-full flex-col gap-2 border-t py-3">
            <div
              v-for="item in topic.item"
              :key="item.id"
              class="flex"
              :id="'task-' + item.id"
            >
              <div class="ml-4 mr-2 cursor-pointer text-xl">
                <span @click="removeTask(topic.id, item.id)"> &times; </span>
              </div>
              <div>
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section
      id="setting"
      class="mt-5 w-4/5 min-w-[320px] max-w-[700px] rounded-xl border p-2"
    >
      <div class="p-4">
        <input
          v-model="judul"
          placeholder="Judul"
          class="mb-2 w-full border bg-blue-50 p-2 text-black"
        />

        <div v-for="(task, i) in tasks" :key="i" class="mb-2 flex">
          <input
            v-model="tasks[i]"
            placeholder="Task..."
            class="w-full border p-2 text-black"
          />
        </div>

        <button
          @click="tasks.push('')"
          class="mr-2 rounded bg-blue-500 px-4 py-1 text-white"
        >
          + Task
        </button>

        <button
          @click="submit"
          class="rounded bg-green-500 px-4 py-1 text-white"
        >
          Submit
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import todoStore from "store/todo-list.ts";
import uuid from "func/uuid.ts";

const app = todoStore();
const { data } = storeToRefs(app);

const removeTopic = (id) => {
  for (let i = data.value.length - 1; i >= 0; i--) {
    if (data.value[i].id === id) {
      data.value.splice(i, 1);
      break;
    }
  }
};

const removeTask = (topicId, taskId) => {
  for (let i = 0; i < data.value.length; i++) {
    if (data.value[i].id === topicId) {
      const items = data.value[i].item;
      for (let j = items.length - 1; j >= 0; j--) {
        if (items[j].id === taskId) {
          items.splice(j, 1);
          break;
        }
      }
      break;
    }
  }
};

const judul = ref("");
const tasks = ref([""]);

const submit = () => {
  const trimmedJudul = judul.value.trim();
  if (!trimmedJudul) return;

  const existingTopic = data.value.find((t) => t.judul === trimmedJudul);

  if (existingTopic) {
    const newItems = tasks.value.map((t) => ({ id: uuid(), text: t }));
    existingTopic.item.push(...newItems);
  } else {
    data.value.push({
      id: uuid(),
      judul: trimmedJudul,
      timeStamp: Date.now(),
      item: tasks.value.map((t) => ({ id: uuid(), text: t })),
    });
  }

  judul.value = "";
  tasks.value = [""];
};
</script>
