<script setup lang="ts">
import { reactive, ref } from "vue";
const MAXX = 20;
const MAXY = 20;

type Tules = {
  id: string;
  x: number;
  y: number;
  isVillage: boolean;
  isMyVillage: boolean;
};

let initPositionX = reactive({ count: 0 });
let initPositionY = reactive({ count: 0 });

function createAllTules(): Tules[] {
  const tules: Tules[] = [];
  for (let x = -MAXX; x < MAXX; x++) {
    for (let y = -MAXY; y < MAXY; y++) {
      tules.push({
        id: `[${x},${y}]`,
        x,
        y,
        isVillage: (x === 0 && y === 0) || Math.random() < 0.05 ? true : false,
        isMyVillage: x === 0 && y === 0,
      });
    }
  }
  return tules;
}
const allTules = createAllTules();

function searchInAllTules(X, Y): Tules[] {
  return allTules.filter((tule) => {
    return tule.id.includes(`[${X},${Y}]`);
  });
}

function getMapCenterInCoor(xStart, yStart): Tules[] {
  let map: Tules[] = [];

  for (let indexY = 2; indexY >= -2; indexY--) {
    for (let indexX = -2; indexX <= 2; indexX++) {
      map.push(...searchInAllTules(xStart + indexX, yStart + indexY));
    }
  }

  return map;
}
let map = reactive({ tules: getMapCenterInCoor(0, 0) });

function MoveRight() {
  initPositionX.count < MAXX - 3
    ? (initPositionX.count += 1)
    : initPositionX.count;
  map.tules = getMapCenterInCoor(initPositionX.count, initPositionY.count);
}

function MoveLeft() {
  initPositionX.count > -MAXX + 3
    ? (initPositionX.count -= 1)
    : initPositionX.count;
  map.tules = getMapCenterInCoor(initPositionX.count, initPositionY.count);
}

function MoveUp() {
  initPositionY.count < MAXY - 3
    ? (initPositionY.count += 1)
    : initPositionY.count;
  map.tules = getMapCenterInCoor(initPositionX.count, initPositionY.count);
}

function MoveDown() {
  initPositionY.count > -MAXY + 3
    ? (initPositionY.count -= 1)
    : initPositionY.count;
  map.tules = getMapCenterInCoor(initPositionX.count, initPositionY.count);
}

const disabled = ref(false);
</script>

<template>
  <div class="greetings">
    <h1 class="green">The MAP !</h1>
    <div id="container-map">
      <v-btn
        variant="outlined"
        prepend-icon="mdi-vuetify"
        class="up-btn"
        @click="MoveUp"
        icon="mdi-arrow-up-bold-circle-outline"
        color="info"
        size="large"
      ></v-btn>
      <div class="d-flex align-center">
        <v-btn
          variant="outlined"
          prepend-icon="mdi-vuetify"
          class="left-btn"
          @click="MoveLeft"
          icon="mdi-arrow-left-bold-circle-outline"
          color="info"
          size="large"
        ></v-btn>
        <div id="map" class="grid-container ma-4">
          <div
            class="grid-item"
            :class="{ appear: disabled, isMyVillage: line.isMyVillage }"
            v-for="(line, id) in map.tules"
            :key="id"
          >
            <img
              v-if="line.isVillage"
              src="./../assets/map/village.png"
              alt=""
            />
            <img v-else src="./../assets/map/grass.png" alt="" />
          </div>
        </div>
        <v-btn
          variant="outlined"
          prepend-icon="mdi-vuetify"
          class="right-btn"
          @click="MoveRight"
          icon="mdi-arrow-right-bold-circle-outline"
          color="info"
          size="large"
        ></v-btn>
      </div>
      <v-btn
        variant="outlined"
        prepend-icon="mdi-vuetify"
        class="down-btn"
        @click="MoveDown"
        icon="mdi-arrow-down-bold-circle-outline"
        color="info"
        size="large"
      ></v-btn>
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
  width: 480px;
  height: 480px;
}
.grid-item {
  width: 96px;
  height: 96px;
  text-align: center;
}
.isMyVillage {
  outline: 0.1rem solid goldenrod;
  z-index: 2;
}
</style>
