import { defineStore } from "pinia";
import { ref } from "vue";
import type { Production } from "../modeles/Ressources";
import type { Tiles } from "../modeles/Tiles";
import type { WorldMap } from "../modeles/WorldMap";
import type { templateValley } from "../modeles/Tiles";

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
    const localStorageState = localStorage.getItem("worldMap");

    if (localStorageState) {
      worldMap.value = JSON.parse(localStorageState);
    } else {
      const tiles: Tiles[] = [];
      for (let x = -maxX; x < maxX; x++) {
        for (let y = -maxY; y < maxY; y++) {
          //get random element in array
          const templatePosibility = templateOfValley();
          const template =
            templatePosibility[
              Math.floor(Math.random() * templatePosibility.length)
            ];

          const isMyVillage = x === 0 && y === 0 ? true : false;
          tiles.push({
            id: `[${x},${y}]`,
            x,
            y,
            isMyVillage,
            isVillage: isMyVillage || Math.random() < 0.05 ? true : false,
            templateValley: generateValley(
              template.crops,
              template.wood,
              template.stone,
              template.gold
            ),
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
      Object.keys(tile.templateValley).forEach((element, id) => {
        switch (tile.templateValley[id].type) {
          case "crops":
            productionTiles.crops += tile.templateValley[id].level;
            break;
          case "wood":
            productionTiles.wood += tile.templateValley[id].level;
            break;
          case "stone":
            productionTiles.stone += tile.templateValley[id].level;
            break;
          case "gold":
            productionTiles.gold += tile.templateValley[id].level;
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

  function templateOfValley() {
    const MAX = 24;
    const rangeCrops = { min: 5, max: 15 };
    const rangeWood = { min: 2, max: 8 };
    const rangeStone = { min: 2, max: 8 };
    const rangeGold = { min: 2, max: 8 };

    const templatePosibility = [];

    for (let crops = 0; crops <= MAX; crops++) {
      for (let wood = 0; wood <= MAX - crops; wood++) {
        for (let stone = 0; stone <= MAX - crops - wood; stone++) {
          for (let gold = 0; gold <= MAX - crops - wood - stone; gold++) {
            if (crops + wood + stone + gold === MAX) {
              if (crops < rangeCrops.min || crops > rangeCrops.max) continue;
              if (wood < rangeWood.min || wood > rangeWood.max) continue;
              if (stone < rangeStone.min || stone > rangeStone.max) continue;
              if (gold < rangeGold.min || gold > rangeGold.max) continue;
              templatePosibility.push({ crops, wood, stone, gold });
            }
          }
        }
      }
    }
    return templatePosibility;
  }

  function generateValley(
    nbCrops: number,
    nbWood: number,
    nbStone: number,
    nbGold: number
  ): templateValley {
    const Valleys = [];
    const ValleysRandom = [];
    for (let i = 0; i < nbCrops; i++) {
      Valleys.push("crops");
    }
    for (let i = 0; i < nbWood; i++) {
      Valleys.push("wood");
    }
    for (let i = 0; i < nbStone; i++) {
      Valleys.push("stone");
    }
    for (let i = 0; i < nbGold; i++) {
      Valleys.push("gold");
    }
    const initialLength = Valleys.length;
    for (let index = 0; index < initialLength; index++) {
      //Place center
      if (index === 12) {
        ValleysRandom.push("center");
        continue;
      }
      //Take random element in array
      const random = Math.floor(Math.random() * Valleys.length);
      ValleysRandom.push(...Valleys.splice(random, 1));
    }

    const valleys = ValleysRandom.map((element, id: number) => {
      switch (element) {
        case "crops":
          return { id: { id, type: "crops", level: 1 } };
          break;
        case "wood":
          return { id: { id, type: "wood", level: 1 } };
          break;
        case "stone":
          return { id: { id, type: "stone", level: 1 } };
          break;
        case "gold":
          return { id: { id, type: "gold", level: 1 } };
          break;
        case "center":
          return { id: { id, type: "center", level: 0 } };
          break;
      }
    });

    return valleys as unknown as templateValley;
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
