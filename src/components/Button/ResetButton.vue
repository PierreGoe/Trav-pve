<template>
  <v-btn @click="resetGame()"> reset game </v-btn>
</template>
<script setup lang="ts">
import { useRessourcesStore } from "../../stores/ressources";
import { useWorldMapStore } from "../../stores/worldMap";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const ressourcesStore = useRessourcesStore();
const worldMapStore = useWorldMapStore();

function resetGame() {
  ressourcesStore.resetRessources();
  worldMapStore.resetWorldMap();
  router.go(route.path);
}
</script>
