import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ressources, Production } from "../modeles/Ressources";

export const useRessourcesStore = defineStore("ressources", () => {
  const ressources = ref<Ressources>({
    wood: { value: 0, icon: "mdi-tree", color: "green", name: "Bois" },
    stone: {
      value: 0,
      icon: "mdi-image-filter-hdr",
      color: "grey",
      name: "Pierre",
    },
    gold: { value: 0, icon: "mdi-gold", color: "yellow", name: "Or" },
    crops: { value: 0, icon: "mdi-food", color: "green", name: "Nourriture" },
  });

  function addRessources(ressourcesToAdd: Production) {
    ressources.value.wood.value += ressourcesToAdd.wood;
    ressources.value.stone.value += ressourcesToAdd.stone;
    ressources.value.gold.value += ressourcesToAdd.gold;
    ressources.value.crops.value += ressourcesToAdd.crops;
  }

  function removeRessources(ressourcesToRemove: Production) {
    ressources.value.wood.value -= ressourcesToRemove.wood;
    ressources.value.stone.value -= ressourcesToRemove.stone;
    ressources.value.gold.value -= ressourcesToRemove.gold;
    ressources.value.crops.value -= ressourcesToRemove.crops;
  }

  return { ressources, addRessources, removeRessources };
});
