import { defineStore } from "pinia";
import { ref } from "vue";
import { useProductionStore } from "./production";
import type { Ressources, Production } from "../modeles/Ressources";

export const useRessourcesStore = defineStore("ressources", () => {
  const { production } = useProductionStore();
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
    ressources.value.wood.value = 100;
    ressources.value.stone.value = 600;
    ressources.value.gold.value = 400;
    ressources.value.crops.value = 800;
    sendtolocalStorage();
  }

  setInterval(() => {
    ressources.value.wood.value += production.wood;
    ressources.value.stone.value += production.stone;
    ressources.value.gold.value += production.gold;
    ressources.value.crops.value += production.crops;
    sendtolocalStorage();
  }, 1000);
  return { ressources, addRessources, removeRessources, resetRessources };
});
