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
  }

  function initWorldMap(maxX: number, maxY: number) {
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
          },
        });
      }
    }
    worldMap.value.tiles = tiles;
  }

  function getProductionOfTiles(id: number): Production {
    const tile = worldMap.value.tiles[id];
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

  return { worldMap, addTiles, cleanWorld, initWorldMap, getProductionOfTiles };
});
