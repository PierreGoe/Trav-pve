import { defineStore } from "pinia";
import { ref } from "vue";
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
            1: { id: 1, type: "crops", level: 0 },
            2: { id: 2, type: "wood", level: 0 },
            3: { id: 3, type: "stone", level: 0 },
            4: { id: 4, type: "iron", level: 0 },
            5: { id: 5, type: "gold", level: 0 },
          },
        });
      }
    }
    worldMap.value.tiles = tiles;
  }

  return { worldMap, addTiles, cleanWorld, initWorldMap };
});
