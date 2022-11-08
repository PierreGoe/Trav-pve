<template>
  <div id="container-town" class="grid-container">
    <buildsComponent
      v-for="(buildingSlot, id) in buildingSlots"
      :build="buildingSlot"
      class="grid-item"
      :key="id"
      @buildSelected="getSelectedbuild"
    />
    <UpgradeBuilding
      :dialog="dialog"
      :build="buildSelected"
      @cancel="dialog = !dialog"
    />
    <CreateBuilding
      :dialog="dialogCreate"
      :build="buildSelected"
      @cancel="dialogCreate = !dialogCreate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useWorldMapStore } from "../stores/worldMap";
import { useRoute } from "vue-router";
import buildsComponent from "./BuildsComponent.vue";
import UpgradeBuilding from "./Dialog/UpgradeBuilding.vue";
import CreateBuilding from "./Dialog/CreateBuilding.vue";
const dialog = ref(false);
const dialogCreate = ref(false);

const route = useRoute();

const worldMapStore = useWorldMapStore();
const buildingSlots = worldMapStore.getTown(route.params.id.toString());
let buildSelected = ref();

function getSelectedbuild(payload: any) {
  buildSelected.value = payload;
  if (!buildSelected.value.isEmpty) {
    dialog.value = !dialog.value;
  } else {
    dialogCreate.value = !dialogCreate.value;
  }
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
