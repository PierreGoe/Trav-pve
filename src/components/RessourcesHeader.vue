<script setup lang="ts">
import { useRessourcesStore } from "../stores/ressources";
import type { Production } from "../modeles/Ressources";

defineProps({
  title: String,
});

const ressourcesStore = useRessourcesStore();

let production: Production = {
  wood: 1,
  stone: 0.3,
  crops: 0.5,
  gold: 0.1,
};

setInterval(() => {
  ressourcesStore.addRessources(production);
}, 1000);


</script>
<template>
  <div id="containerRessources">
    {{ ressourcesStore.test }}
    <ul>
      <li v-for="(ressource, key) in ressourcesStore.ressources" :key="key">
        <v-icon>{{ ressource.icon }}</v-icon>
        <span class="hidden-visually">{{ Math.floor(ressource.value) }}</span>
      </li>
    </ul>
  </div>
</template>
