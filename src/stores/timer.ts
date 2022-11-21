import { defineStore } from "pinia";
import { ref } from "vue";

export const useTimeStore = defineStore("time", () => {
  const time = ref(0);
  const battle = ref([
    {
      start: 10,
      playerArmy: {
        swordsmen: 0,
        archers: 0,
        pikemen: 0,
        cavalry: 0,
      },
      enemyArmy: {
        swordsmen: 0,
        archers: 0,
        pikemen: 0,
        cavalry: 0,
      },
    },
    {
      start: 20,
      playerArmy: {
        swordsmen: 0,
        archers: 0,
        pikemen: 0,
        cavalry: 0,
      },
      enemyArmy: {
        swordsmen: 0,
        archers: 0,
        pikemen: 0,
        cavalry: 0,
      },
    },
  ]);
  getlocalstorage();

  setInterval(() => {
    time.value++;
    sendtolocalStorage();
  }, 1000);

  function sendtolocalStorage() {
    localStorage.setItem("time", JSON.stringify(time.value));
  }

  function getlocalstorage() {
    if (localStorage.getItem("time")) {
      const localStorageState = JSON.parse(localStorage.getItem("time"));
      time.value = localStorageState;
    }
  }

  function resetTime() {
    time.value = 0;
    sendtolocalStorage();
  }

  return { time, resetTime };
});
