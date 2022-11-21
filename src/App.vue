<script setup lang="ts">
import ressourcesHeader from "./components/RessourcesHeader.vue";
import ResetButton from "./components/Button/ResetButton.vue";
import MapButton from "./components/Button/MapButton.vue";
import armyHeader from "./components/ArmyHeader.vue";
import { useTimeStore } from "./stores/timer";
const timeStore = useTimeStore();
</script>
<style>
.v-main {
  min-width: 320px;
}
</style>

<template>
  <v-app>
    <v-main>
      <ResetButton />
      <MapButton />
      <ressourcesHeader />
      <armyHeader />
      <router-view />
    </v-main>
  </v-app>
</template>
