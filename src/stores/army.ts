import { ref } from "vue";
import { defineStore } from "pinia";
import type { UnitArmy, ArmyPayload } from "@/src/modeles/Army";

export const useArmyStore = defineStore("army", () => {
  const army = ref({
    swordsmen: 0,
    archers: 0,
    pikemen: 0,
    cavalry: 0,
  });

  const swordsmen = ref<UnitArmy>({
    attack: 10,
    defense: 10,
    speed: 10,
    cost: {
      wood: 10,
      stone: 10,
      crops: 10,
      gold: 10,
    },
    icon: "sword",
    foodcost: 1,
  });

  const archers = ref<UnitArmy>({
    attack: 20,
    defense: 10,
    speed: 5,
    cost: {
      wood: 20,
      stone: 5,
      crops: 10,
      gold: 10,
    },
    icon: "bow-arrow",
    foodcost: 1,
  });

  const pikemen = ref<UnitArmy>({
    attack: 10,
    defense: 40,
    speed: 10,
    cost: {
      wood: 30,
      stone: 0,
      crops: 20,
      gold: 5,
    },
    icon: "spear",
    foodcost: 1,
  });

  const cavalry = ref<UnitArmy>({
    attack: 50,
    defense: 10,
    speed: 40,
    cost: {
      wood: 5,
      stone: 5,
      crops: 30,
      gold: 20,
    },
    icon: "horse",
    foodcost: 2,
  });

  function updateArmy(armyPayload: ArmyPayload) {
    army.value.swordsmen = army.value.swordsmen + armyPayload.swordsmen;
    army.value.archers = army.value.archers + armyPayload.archers;
    army.value.pikemen = army.value.pikemen + armyPayload.pikemen;
    army.value.cavalry = army.value.cavalry + armyPayload.cavalry;
    //send to local storage
    console.log(army.value);
    sendtolocalStorage();
  }

  function sendtolocalStorage() {
    localStorage.setItem("army", JSON.stringify(army.value));
  }
  function getlocalstorage() {
    if (localStorage.getItem("army")) {
      const localStorageState = JSON.parse(localStorage.getItem("army"));
      army.value = localStorageState;
    }
  }
  getlocalstorage();

  function starveArmy() {
    console.warn("starveArmy");

    army.value.swordsmen
      ? (army.value.swordsmen = ~~(army.value.swordsmen * 0.99))
      : (army.value.swordsmen = 0);
    army.value.archers
      ? (army.value.archers = army.value.archers * 0.99)
      : (army.value.archers = 0);
    army.value.pikemen
      ? (army.value.pikemen = army.value.pikemen * 0.99)
      : (army.value.pikemen = 0);
    army.value.cavalry
      ? (army.value.cavalry = army.value.cavalry * 0.99)
      : (army.value.cavalry = 0);
    sendtolocalStorage();
  }

  function getFoodCost() {
    return (
      army.value.swordsmen * swordsmen.value.foodcost +
      army.value.archers * archers.value.foodcost +
      army.value.pikemen * pikemen.value.foodcost +
      army.value.cavalry * cavalry.value.foodcost
    );
  }

  function resetArmy() {
    army.value.swordsmen = 0;
    army.value.archers = 0;
    army.value.pikemen = 0;
    army.value.cavalry = 0;
    sendtolocalStorage();
  }

  return {
    army,
    swordsmen,
    archers,
    pikemen,
    cavalry,
    updateArmy,
    getFoodCost,
    starveArmy,
    resetArmy,
  };
});
