<script setup lang="ts">
import ressourcesHeader from "./components/RessourcesHeader.vue";
import ResetButton from "./components/Button/ResetButton.vue";
import MapButton from "./components/Button/MapButton.vue";
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
      <router-view />
    </v-main>
  </v-app>
</template>
