<script setup lang="ts">
import { reactive, ref } from 'vue';

type Tules = {
  id: string;
  x: number;
  y: number;
  isVillage: boolean;
  isMyVillage: boolean;
};

let initPositionX = reactive({ count: 0 });
let initPositionY = reactive({ count: 0 });
let testRed = 'red';

function createAllTules(): Tules[] {
  const tules: Tules[] = [];
  for (let x = -20; x < 20; x++) {
    for (let y = -20; y < 20; y++) {
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
  initPositionX.count += 1;
  map.tules = getMapCenterInCoor(initPositionX.count, initPositionY.count);
  warnDisabled();
}

function MoveLeft() {
  initPositionX.count -= 1;
  map.tules = getMapCenterInCoor(initPositionX.count, initPositionY.count);
  warnDisabled();
}

function MoveUp() {
  initPositionY.count += 1;
  map.tules = getMapCenterInCoor(initPositionX.count, initPositionY.count);
  warnDisabled();
}

function MoveDown() {
  initPositionY.count -= 1;
  map.tules = getMapCenterInCoor(initPositionX.count, initPositionY.count);
  warnDisabled();
}

const disabled = ref(false);

function warnDisabled() {
  disabled.value = true;
  setTimeout(() => {
    disabled.value = false;
  }, 1500);
}
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
        >Up</v-btn
      >
      <div class="d-flex">
        <v-btn
          variant="outlined"
          prepend-icon="mdi-vuetify"
          class="left-btn"
          @click="MoveLeft"
          >Left</v-btn
        >
        <div id="map" class="grid-container">
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
          >Right</v-btn
        >
      </div>
      <v-btn
        variant="outlined"
        prepend-icon="mdi-vuetify"
        class="down-btn"
        @click="MoveDown"
        >Down</v-btn
      >
    </div>
  </div>
</template>

<style>
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

.appear {
  animation: Appear 0.1s ease 0s 1 normal forwards;
}

@keyframes Appear {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
.myVillage {
  outline: 1px solid v-bind(testRed);
  z-index: 2;
}
</style>
