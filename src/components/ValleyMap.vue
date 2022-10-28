<template>
  <div>{{ worldMapStore.worldMap.tiles[indexOfValley] }}</div>
  <div
    class="valley-item"
    v-for="(tile, id) in valley.templateValley"
    :key="id"
  >
    <div>{{ tile }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useWorldMapStore } from "../stores/worldMap";

const worldMapStore = useWorldMapStore();
const route = useRoute();
const IDtiles = route.params.id.toString();
const indexOfValley = worldMapStore.worldMap.tiles.findIndex((valley) => {
  return valley.id.includes(IDtiles);
});
const valley = worldMapStore.worldMap.tiles[indexOfValley];
</script>
