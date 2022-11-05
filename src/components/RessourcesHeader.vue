<script setup lang="ts">
import { useRessourcesStore } from "../stores/ressources";
import { useProductionStore } from "../stores/production";

defineProps({
  title: String,
});

const ressourcesStore = useRessourcesStore();
const productionStore = useProductionStore();
</script>
<template>
  <div id="containerRessources">
    <div class="ressourcesList">
      <div
        v-for="(ressource, key) in ressourcesStore.ressources"
        :key="key"
        class="ressource"
      >
        <v-icon>{{ ressource.icon }}</v-icon>
        <span>{{ Math.floor(ressource.value) }}</span>
        <span> +{{ productionStore.returnProdcution(ressource.name) }}</span>
      </div>
    </div>
  </div>
</template>
<style>
.ressourcesList {
  display: flex;
  flex-direction: row;
}
.ressource {
  padding: 10px;
}
</style>
