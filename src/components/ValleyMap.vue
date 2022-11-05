<template>
  <div>{{ worldMapStore.worldMap.tiles[indexOfValley] }}</div>
  <div id="container-valley" class="grid-container">
    <fieldsComponent
      :field="tile"
      class="grid-item"
      v-for="(tile, id) in valley.templateValley"
      :key="id"
      @fieldSelected="getSelectedField"
    />
  </div>
  <pre>---{{ fieldSelected }}</pre>
  <pre>{{ production }}</pre>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useWorldMapStore } from "../stores/worldMap";
import fieldsComponent from "./FieldsComponent.vue";

const worldMapStore = useWorldMapStore();
const route = useRoute();
const IDtiles = route.params.id.toString();
// const idOfValley = worldMapStore.worldMap.tiles.findIndex((valley) => {
//   return valley.id.includes(IDtiles);
// });
const valley = worldMapStore.worldMap.tiles.find((valley) => {
  return valley.id.includes(IDtiles);
});
const production = worldMapStore.getProductionOfTiles(IDtiles);
let fieldSelected = valley!.templateValley[0];

function getSelectedField(payload: any) {
  fieldSelected = payload;
}
</script>

<style>
.grid-container {
  grid-area: map;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  justify-content: center;
  max-width: 576px;
}
</style>
