<script setup lang="ts">
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { Tiles } from "../modeles/Tiles";
import { useWorldMapStore } from "../stores/worldMap";
const MAXY = 20;
const MAXX = 20;
const worldMapStore = useWorldMapStore();
worldMapStore.initWorldMap(MAXX, MAXY);
const { worldMap } = storeToRefs(worldMapStore);
const router = useRouter();

function goToValley(id: string) {
  router.push(`/valley/${id}`);
}

let initPositionX = reactive({ count: 0 });
let initPositionY = reactive({ count: 0 });

function searchInAllTiles(X: number, Y: number) {
  return worldMap.value.tiles.filter((tile) => {
    return tile.id.includes(`[${X},${Y}]`);
  });
}

function getMapCenterInCoor(xStart: number, yStart: number): Tiles[] {
  let map: Tiles[] = [];

  for (let indexY = 2; indexY >= -2; indexY--) {
    for (let indexX = -2; indexX <= 2; indexX++) {
      map.push(...searchInAllTiles(xStart + indexX, yStart + indexY));
    }
  }

  return map;
}
let map = reactive({ tiles: getMapCenterInCoor(0, 0) });

function MoveRight() {
  initPositionX.count < MAXX - 3
    ? (initPositionX.count += 1)
    : initPositionX.count;
  map.tiles = getMapCenterInCoor(initPositionX.count, initPositionY.count);
}

function MoveLeft() {
  initPositionX.count > -MAXX + 3
    ? (initPositionX.count -= 1)
    : initPositionX.count;
  map.tiles = getMapCenterInCoor(initPositionX.count, initPositionY.count);
}

function MoveUp() {
  initPositionY.count < MAXY - 3
    ? (initPositionY.count += 1)
    : initPositionY.count;
  map.tiles = getMapCenterInCoor(initPositionX.count, initPositionY.count);
}

function MoveDown() {
  initPositionY.count > -MAXY + 3
    ? (initPositionY.count -= 1)
    : initPositionY.count;
  map.tiles = getMapCenterInCoor(initPositionX.count, initPositionY.count);
}

const disabled = ref(false);
</script>

<template>
  <div id="container-map">
    <div id="toolboxMap">
      <v-btn small @click="MoveLeft" :disabled="disabled" size="small">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn small @click="MoveUp" :disabled="disabled" size="small">
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
      <v-btn small @click="MoveDown" :disabled="disabled" size="small">
        <v-icon>mdi-arrow-down</v-icon>
      </v-btn>
      <v-btn small @click="MoveRight" :disabled="disabled" size="small">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
    <div class="d-flex align-center">
      <div id="map" class="grid-container mx-2">
        <div
          class="grid-item"
          :class="{ appear: disabled, isMyVillage: line.isMyVillage }"
          v-for="(line, id) in map.tiles"
          :key="id"
          @click="goToValley(line.id)"
        >
          <img v-if="line.isVillage" src="./../assets/map/village.png" alt="" />
          <img v-else src="./../assets/map/grass.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#container-map {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.grid-container {
  grid-area: map;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  justify-content: center;
  align-content: center;
}
.grid-item {
  text-align: center;
  width: 20vw;
  max-width: 96px;
  height: 20vw;
  max-height: 96px;
  cursor: pointer;
}
.grid-item img {
  width: 20vw;
  max-width: 96px;
  aspect-ratio: 1;
  text-align: center;
}
.isMyVillage {
  outline: 0.1rem solid goldenrod;
  z-index: 2;
}
</style>
