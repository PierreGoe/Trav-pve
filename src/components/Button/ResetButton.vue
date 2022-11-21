<template>
  <v-btn @click="resetGame()"> reset game </v-btn>
</template>
<script setup lang="ts">
import { useRessourcesStore } from "../../stores/ressources";
import { useWorldMapStore } from "../../stores/worldMap";
import { useProductionStore } from "../../stores/production";
import { useArmyStore } from "../../stores/army";
import { useRouter, useRoute } from "vue-router";
import { useTimeStore } from "../../stores/timer";
const router = useRouter();
const route = useRoute();
const ressourcesStore = useRessourcesStore();
const worldMapStore = useWorldMapStore();
const productionStore = useProductionStore();
const armyStore = useArmyStore();
const timeStore = useTimeStore();

function resetGame() {
  ressourcesStore.resetRessources();
  worldMapStore.resetWorldMap();
  productionStore.resetProduction();
  armyStore.resetArmy();
  timeStore.resetTime();
  router.go(route.path);
}
</script>
