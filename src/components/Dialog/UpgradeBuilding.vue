<template>
  <div class="text-center">
    <v-dialog v-model="props.dialog" activator="parent">
      <v-card>
        <v-card-title class="headline"
          >Upgrade building {{ props.build.type }} - Level
          {{ props.build.level }}</v-card-title
        >
        <v-card-text> Next level cost </v-card-text>
        <ul>
          <li>crops: {{ costBuild[props.build.level].crops }}</li>
          <li>wood: {{ costBuild[props.build.level].wood }}</li>
          <li>stone: {{ costBuild[props.build.level].stone }}</li>
          <li>gold: {{ costBuild[props.build.level].gold }}</li>
        </ul>
        <v-card-actions>
          <v-btn color="error" @click="$emit('cancel')">Cancel</v-btn>
          <v-btn color="primary" @click="upgradeBuilding"> Upgrade</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import { useRessourcesStore } from "../../stores/ressources";
import { useWorldMapStore } from "../../stores/worldMap";
import { useProductionStore } from "../../stores/production";
import type { matrixBuildCost } from "@/src/modeles/Cost";
import { useRoute } from "vue-router";

const worldMapStore = useWorldMapStore();
const ressourcesStore = useRessourcesStore();
const productionStore = useProductionStore();
const route = useRoute();
const { ressources } = ressourcesStore;

const props = defineProps({
  build: {
    type: Object,
    required: true,
  },
  dialog: {
    type: Boolean,
    required: true,
  },
});
//TODO Create Matrix of cost for each building
const costBuild: matrixBuildCost = {
  1: {
    crops: 10,
    wood: 10,
    stone: 10,
    gold: 10,
  },
  2: {
    crops: 20,
    wood: 20,
    stone: 20,
    gold: 20,
  },
  3: {
    crops: 30,
    wood: 30,
    stone: 30,
    gold: 30,
  },
  4: {
    crops: 40,
    wood: 40,
    stone: 40,
    gold: 40,
  },
  5: {
    crops: 50,
    wood: 50,
    stone: 50,
    gold: 50,
  },
};
function upgradeBuilding() {
  const levelBuilding = props.build.level;
  if (!checkForMaxLevel()) {
    return;
  }
  if (!checkForRessources()) {
    return;
  }
  //check if player is in valley or town
  route.path.includes("valley")
    ? worldMapStore.upgradeValley("[0,0]", props.build.id, levelBuilding + 1)
    : worldMapStore.upgradeTown("[0,0]", props.build.id, levelBuilding + 1);

  ressourcesStore.removeRessources({
    crops: costBuild[levelBuilding].crops,
    wood: costBuild[levelBuilding].wood,
    stone: costBuild[levelBuilding].stone,
    gold: costBuild[levelBuilding].gold,
  });
  productionStore.update();
}

function checkForRessources() {
  // check if player has enough resources
  // if yes, upgrade building
  // if no, show error message

  if (ressources.wood.value < costBuild[props.build.level].wood) {
    console.warn("not enough wood");
    return false;
  }
  if (ressources.crops.value < costBuild[props.build.level].crops) {
    console.warn("not enough crops");
    return false;
  }
  if (ressources.stone.value < costBuild[props.build.level].stone) {
    console.warn("not enough stone");
    return false;
  }
  if (ressources.gold.value < costBuild[props.build.level].gold) {
    console.warn("not enough gold");
    return false;
  }
  return true;
}

function checkForMaxLevel() {
  // check if building is at max level
  // if yes, show error message
  // if no, upgrade building
  if (props.build.level === 5) {
    console.warn("max level reached");
    return false;
  }
  return true;
}
</script>
