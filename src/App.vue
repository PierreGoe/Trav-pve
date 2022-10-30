<script setup lang="ts">
import ressourcesHeader from "./components/RessourcesHeader.vue";
</script>
<style>
.v-main {
  background: darkslategrey;
}
</style>

<template>
  <v-app>
    <v-main>
      <ressourcesHeader />
      <router-view />
    </v-main>
  </v-app>
</template>
