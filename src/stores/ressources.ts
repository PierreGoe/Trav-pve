import { defineStore } from "pinia";
import { ref } from "vue";
import { useProductionStore } from "./production";
import { useArmyStore } from "./army";
import type { Ressources, Production } from "../modeles/Ressources";

export const useRessourcesStore = defineStore("ressources", () => {
  const MAXVALUERESSOURCESS = 10000;
  const production = useProductionStore();
  const armyStore = useArmyStore();
  const ressources = ref<Ressources>({
    wood: { value: 100, icon: "mdi-tree", color: "green", name: "wood" },
    stone: {
      value: 600,
      icon: "mdi-image-filter-hdr",
      color: "grey",
      name: "stone",
    },
    gold: { value: 400, icon: "mdi-gold", color: "yellow", name: "gold" },
    crops: { value: 800, icon: "mdi-food", color: "green", name: "crops" },
  });

  function addRessources(ressourcesToAdd: Production) {
    ressources.value.wood.value += ressourcesToAdd.wood;
    ressources.value.stone.value += ressourcesToAdd.stone;
    ressources.value.gold.value += ressourcesToAdd.gold;
    ressources.value.crops.value += ressourcesToAdd.crops;
    sendtolocalStorage();
  }

  function removeRessources(ressourcesToRemove: Production) {
    ressources.value.wood.value -= ressourcesToRemove.wood;
    ressources.value.stone.value -= ressourcesToRemove.stone;
    ressources.value.gold.value -= ressourcesToRemove.gold;
    ressources.value.crops.value -= ressourcesToRemove.crops;
    sendtolocalStorage();
  }

  function sendtolocalStorage() {
    localStorage.setItem("ressources", JSON.stringify(ressources.value));
  }

  function getlocalstorage() {
    if (localStorage.getItem("ressources")) {
      const localStorageState = JSON.parse(localStorage.getItem("ressources"));
      ressources.value.crops.value = localStorageState.crops.value;
      ressources.value.gold.value = localStorageState.gold.value;
      ressources.value.stone.value = localStorageState.stone.value;
      ressources.value.wood.value = localStorageState.wood.value;
    }
  }
  getlocalstorage();

  function resetRessources() {
    ressources.value.wood.value = 9999999;
    ressources.value.stone.value = 9999999;
    ressources.value.gold.value = 9999999;
    ressources.value.crops.value = 800;
    sendtolocalStorage();
  }

  setInterval(() => {
    production.update();
    ressources.value.wood.value < MAXVALUERESSOURCESS
      ? (ressources.value.wood.value += production.production.wood)
      : (ressources.value.wood.value = MAXVALUERESSOURCESS);
    ressources.value.wood.value < 0 ? (ressources.value.wood.value = 0) : null;
    ressources.value.stone.value < MAXVALUERESSOURCESS
      ? (ressources.value.stone.value += production.production.stone)
      : (ressources.value.stone.value = MAXVALUERESSOURCESS);
    ressources.value.stone.value < 0
      ? (ressources.value.stone.value = 0)
      : null;
    ressources.value.gold.value < MAXVALUERESSOURCESS
      ? (ressources.value.gold.value += production.production.gold)
      : (ressources.value.gold.value = MAXVALUERESSOURCESS);
    ressources.value.gold.value < 0 ? (ressources.value.gold.value = 0) : null;
    ressources.value.crops.value < MAXVALUERESSOURCESS
      ? (ressources.value.crops.value += production.production.crops)
      : (ressources.value.crops.value = MAXVALUERESSOURCESS);
    ressources.value.crops.value < 0
      ? (ressources.value.crops.value = 0)
      : null;

    if (ressources.value.crops.value <= 0) {
      armyStore.starveArmy();
    }

    sendtolocalStorage();
  }, 1000);
  return { ressources, addRessources, removeRessources, resetRessources };
});
