import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ressources, Production } from "../modeles/Ressources";

export const useRessourcesStore = defineStore("ressources", () => {
  const ressources = ref<Ressources>({
    wood: { value: 100, icon: "mdi-tree", color: "green", name: "Bois" },
    stone: {
      value: 600,
      icon: "mdi-image-filter-hdr",
      color: "grey",
      name: "Pierre",
    },
    gold: { value: 400, icon: "mdi-gold", color: "yellow", name: "Or" },
    crops: { value: 800, icon: "mdi-food", color: "green", name: "Nourriture" },
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
  return { ressources, addRessources, removeRessources, resetRessources };
});
