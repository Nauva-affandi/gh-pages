import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import uuid from "func/uuid.ts";

const scoreStore = defineStore(
  "score",
  () => {
    const history = reactive([]);

    const lastUpdate = ref(Date.now());
    const maxTime = ref(1000 * 60 * 60 * 24 * 7); // 7 hari

    const add = (value) => {
      history.push({
        id: uuid(),
        timeStamp: Date.now(),
        data: value,
      });
    };

    const refresh = () => {
      const currentTime = 1000 * 60 * 60 * 2;
      const now = Date.now();

      if (now - lastUpdate.value < currentTime) {
        for (let i = history.length - 1; i >= 0; i--) {
          if (now - history[i].timeStamp > maxTime.value) {
            history.splice(i, 1);
          }
        }
        lastUpdate.value = Date.now();
      }
    };

    return {
      history,
      lastUpdate,
      add,
      refresh,
    };
  },
  {
    persist: true,
  },
);

export default scoreStore;
