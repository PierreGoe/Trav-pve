import { defineStore } from "pinia";
import { ref } from "vue";
import { useWorldMapStore } from "./worldMap";
import { useArmyStore } from "./army";

export const useProductionStore = defineStore("production", () => {
  const worldMapStore = useWorldMapStore();
  const armyStore = useArmyStore();
  const production = ref({
    wood: 0,
    stone: 0,
    crops: 0,
    gold: 0,
  });
  function update() {
    const productionFromFields = worldMapStore.getProductionOfTiles("[0,0]");
    production.value.wood = productionFromFields.wood;
    production.value.stone = productionFromFields.stone;
    production.value.crops =
      productionFromFields.crops - armyStore.getFoodCost();
    production.value.gold = productionFromFields.gold;
  }
  update();

  function returnProdcution(name: string) {
    if (name === "wood") {
      return production.value.wood;
    } else if (name === "stone") {
      return production.value.stone;
    } else if (name === "crops") {
      return production.value.crops;
    } else if (name === "gold") {
      return production.value.gold;
    }
  }

  function resetProduction() {
    production.value.wood = 0;
    production.value.stone = 0;
    production.value.crops = 0;
    production.value.gold = 0;
    update();
  }

  return { production, returnProdcution, update, resetProduction };
});
