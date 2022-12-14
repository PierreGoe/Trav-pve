import { defineStore } from "pinia";
import { ref } from "vue";
import type { Production } from "../modeles/Ressources";
import type { Tiles, TownSlots } from "../modeles/Tiles";
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

  (function getlocalstorage() {
    //Check if localstorage exist
    const existLocalStorage = localStorage.getItem("worldMap");
    if (existLocalStorage) {
      worldMap.value = JSON.parse(existLocalStorage);
    }
  })();

  function resetWorldMap() {
    cleanWorld();
  }

  function templateOfValley() {
    const MAX = 25;
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

    const townSlots: TownSlots = {};
    for (let index = 0; index < 25; index++) {
      townSlots[index] = {
        id: index,
        isEmpty: true,
        type: "empty",
        level: null,
      };
    }

    const valleys = ValleysRandom.map((element, id: number) => {
      switch (element) {
        case "crops":
          return { id, type: "crops", level: 1 };
          break;
        case "wood":
          return { id, type: "wood", level: 1 };
          break;
        case "stone":
          return { id, type: "stone", level: 1 };
          break;
        case "gold":
          return { id, type: "gold", level: 1 };
          break;
        case "center":
          return {
            id,
            type: "center",
            level: 0,
            townSlots,
          };
          break;
      }
    });

    return valleys as unknown as templateValley;
  }

  function getTown(id: string) {
    const tile = worldMap.value.tiles.find((tile) => tile.id === id);
    const town = tile?.templateValley[12].townSlots;
    return town;
  }

  /**
   *
   * @param idWord ID of the word tile
   * @param idValley ID of the tile in the Valley
   * @param level new level of the valley
   */
  function upgradeValley(idWord: string, idValley: number, level: number) {
    const tile = worldMap.value.tiles.find((tile) => tile.id === idWord);
    if (tile) {
      tile.templateValley[idValley].level = level;
      sendtolocalStorage();
    }
  }

  function updateTown(idWord: string, idTown: number, type: string) {
    const tile = worldMap.value.tiles.find((tile) => tile.id === idWord);
    if (tile) {
      tile.templateValley[12].townSlots[idTown].isEmpty = false;
      tile.templateValley[12].townSlots[idTown].type = type;
      tile.templateValley[12].townSlots[idTown].level = 1;
      sendtolocalStorage();
    }
  }

  function upgradeTown(idWord: string, idTown: number, level: number) {
    const tile = worldMap.value.tiles.find((tile) => tile.id === idWord);
    if (tile) {
      tile.templateValley[12].townSlots[idTown].level = level;
      sendtolocalStorage();
    }
  }

  return {
    worldMap,
    addTiles,
    cleanWorld,
    initWorldMap,
    getProductionOfTiles,
    resetWorldMap,
    upgradeValley,
    getTown,
    updateTown,
    upgradeTown,
  };
});
