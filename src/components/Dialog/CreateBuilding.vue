<template>
  <div class="text-center">
    <v-dialog v-model="props.dialog" activator="parent">
      <v-card>
        <v-card-title class="headline"
          >Create building {{ props.build.type }} - Level
          {{ props.build.level }}</v-card-title
        >

        <v-card-actions>
          <v-btn color="error" @click="$emit('cancel')">Cancel</v-btn>
          <v-btn
            color="primary"
            @click="createBuilding('barrack')"
            v-if="!isAlreadyInTown('barrack')"
          >
            Barrack</v-btn
          >

          <v-btn
            color="primary"
            @click="createBuilding('cityHall')"
            v-if="!isAlreadyInTown('cityHall')"
          >
            City Hall</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import { useRessourcesStore } from "../../stores/ressources";
import { useWorldMapStore } from "../../stores/worldMap";
import { useProductionStore } from "../../stores/production";
import { useRoute } from "vue-router";

const worldMapStore = useWorldMapStore();
const ressourcesStore = useRessourcesStore();
const productionStore = useProductionStore();
const { ressources } = ressourcesStore;

const route = useRoute();

const props = defineProps({
  build: {
    type: Object,
    required: true,
  },
  buildAlreadInTown: {
    type: Array,
    required: true,
  },
  dialog: {
    type: Boolean,
    required: true,
  },
});
function isAlreadyInTown(build: string): boolean {
  return props.buildAlreadInTown.includes(build);
}
//TODO Create Matrix of cost for each building
const buildList = {
  barrack: { crops: 100, wood: 10, stone: 10, gold: 10 },
  cityHall: { crops: 10, wood: 10, stone: 10, gold: 10 },
};

function createBuilding(typeOfBuild: string) {
  const costBuild = buildList[typeOfBuild];
  if (!checkForRessources(costBuild)) {
    return;
  }

  worldMapStore.updateTown(
    route.params.id.toString(),
    props.build.id,
    typeOfBuild
  );

  ressourcesStore.removeRessources({
    crops: costBuild.crops,
    wood: costBuild.wood,
    stone: costBuild.stone,
    gold: costBuild.gold,
  });
  productionStore.update();
  closeDialog();
}
const emit = defineEmits(["test", "cancel"]);
function closeDialog() {
  emit("cancel");
}

function checkForRessources(costBuild) {
  // check if player has enough resources
  // if yes, upgrade building
  // if no, show error message

  if (ressources.wood.value < costBuild.wood) {
    console.warn("not enough wood");
    return false;
  }
  if (ressources.crops.value < costBuild.crops) {
    console.warn("not enough crops");
    return false;
  }
  if (ressources.stone.value < costBuild.stone) {
    console.warn("not enough stone");
    return false;
  }
  if (ressources.gold.value < costBuild.gold) {
    console.warn("not enough gold");
    return false;
  }
  return true;
}
</script>
