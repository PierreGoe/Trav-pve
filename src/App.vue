<script setup lang="ts">
import ressourcesHeader from "./components/RessourcesHeader.vue";
import ResetButton from "./components/ResetButton.vue";
</script>
<style>
.v-main {
  background: darkslategrey;
}
</style>

<template>
  <v-app>
    <v-main>
      <ResetButton />
      <ressourcesHeader />
      <router-view />
    </v-main>
  </v-app>
</template>
