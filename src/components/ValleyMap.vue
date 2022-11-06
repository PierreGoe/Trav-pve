<template>
  <div id="container-valley" class="grid-container">
    <fieldsComponent
      :field="tile"
      class="grid-item"
      v-for="(tile, id) in valley?.templateValley"
      :key="id"
      @fieldSelected="getSelectedField"
    />
  </div>
  <UpgradeBuilding
    :dialog="dialog"
    :build="fieldSelected"
    @cancel="dialog = !dialog"
    @upgrade="upgradeBuilding"
  />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useWorldMapStore } from "../stores/worldMap";
import fieldsComponent from "./FieldsComponent.vue";
import UpgradeBuilding from "./Dialog/UpgradeBuilding.vue";
import { ref } from "vue";

const dialog = ref(false);
const worldMapStore = useWorldMapStore();
const route = useRoute();
const IDtiles = route.params.id.toString();
const valley = worldMapStore.worldMap.tiles.find((valley) => {
  return valley.id.includes(IDtiles);
});
const production = worldMapStore.getProductionOfTiles(IDtiles);
let fieldSelected = ref();

function getSelectedField(payload: any) {
  fieldSelected.value = payload;
  //TODO Routing to center Town
  if (fieldSelected.value.type === "center") {
    return;
  }

  dialog.value = !dialog.value;
}
</script>

<style>
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
}
</style>
