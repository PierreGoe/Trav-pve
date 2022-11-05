import { defineStore } from "pinia";
import { ref } from "vue";
import type { Production } from "../modeles/Ressources";
import type { Tiles } from "../modeles/Tiles";
import type { WorldMap } from "../modeles/WorldMap";

export const useWorldMapStore = defineStore("worldMap", () => {
  const worldMap = ref<WorldMap>({
    id: "",
    name: "",
    width: 0,
    height: 0,
    tiles: [] as Tiles[],
  });

  function addTiles(tiles: Tiles[]) {
    worldMap.value.tiles = tiles;
  }

  function cleanWorld() {
    worldMap.value.tiles = [] as Tiles[];
    localStorage.removeItem("worldMap");
    initWorldMap(20, 20);
  }

  function initWorldMap(maxX: number, maxY: number) {
    if (localStorage.getItem("worldMap")) {
      const localStorageState = JSON.parse(localStorage.getItem("worldMap"));
      worldMap.value = localStorageState;
    } else {
      const tiles: Tiles[] = [];
      for (let x = -maxX; x < maxX; x++) {
        for (let y = -maxY; y < maxY; y++) {
          const isMyVillage = x === 0 && y === 0 ? true : false;
          tiles.push({
            id: `[${x},${y}]`,
            x,
            y,
            isMyVillage,
            isVillage: isMyVillage || Math.random() < 0.05 ? true : false,
            templateValley: {
              1: { id: 1, type: "crops", level: 1 },
              2: { id: 2, type: "wood", level: 1 },
              3: { id: 3, type: "stone", level: 1 },
              4: { id: 4, type: "stone", level: 1 },
              5: { id: 5, type: "gold", level: 1 },
              6: { id: 6, type: "gold", level: 1 },
              7: { id: 7, type: "gold", level: 1 },
              8: { id: 8, type: "gold", level: 1 },
              9: { id: 9, type: "gold", level: 1 },
              10: { id: 10, type: "gold", level: 1 },
              11: { id: 11, type: "gold", level: 1 },
              12: { id: 12, type: "gold", level: 1 },
              13: { id: 13, type: "gold", level: 1 },
              14: { id: 14, type: "gold", level: 1 },
              15: { id: 15, type: "gold", level: 1 },
              16: { id: 16, type: "gold", level: 1 },
              17: { id: 17, type: "gold", level: 1 },
              18: { id: 18, type: "gold", level: 1 },
              19: { id: 19, type: "gold", level: 1 },
              20: { id: 20, type: "gold", level: 1 },
              21: { id: 21, type: "gold", level: 1 },
              22: { id: 22, type: "gold", level: 1 },
              23: { id: 23, type: "gold", level: 1 },
              24: { id: 24, type: "gold", level: 1 },
              25: { id: 25, type: "gold", level: 1 },
            },
          });
        }
      }
      worldMap.value.tiles = tiles;
      sendtolocalStorage();
    }
  }

  function getProductionOfTiles(id: string): Production {
    const tile = worldMap.value.tiles.find((tile) => tile.id === id);
    const productionTiles: Production = {
      crops: 0,
      wood: 0,
      stone: 0,
      gold: 0,
    };
    if (tile) {
      Object.keys(tile.templateValley).forEach((element) => {
        switch (tile.templateValley[element].type) {
          case "crops":
            productionTiles.crops += tile.templateValley[element].level;
            break;
          case "wood":
            productionTiles.wood += tile.templateValley[element].level;
            break;
          case "stone":
            productionTiles.stone += tile.templateValley[element].level;
            break;
          case "gold":
            productionTiles.gold += tile.templateValley[element].level;
            break;
        }
      });
    }
    return productionTiles;
  }

  function sendtolocalStorage() {
    localStorage.setItem("worldMap", JSON.stringify(worldMap.value));
  }

  function getlocalstorage() {
    if (localStorage.getItem("worldMap")) {
      const localStorageState = JSON.parse(localStorage.getItem("worldMap"));
      worldMap.value = localStorageState;
    }
  }
  getlocalstorage();

  function resetWorldMap() {
    cleanWorld();
  }

  return {
    worldMap,
    addTiles,
    cleanWorld,
    initWorldMap,
    getProductionOfTiles,
    resetWorldMap,
  };
});
