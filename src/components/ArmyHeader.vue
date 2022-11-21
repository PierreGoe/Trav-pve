<template>
  <div id="containerArmys">
    <div class="armyList">
      <div v-for="(army, key) in armyStore.army" :key="key" class="army">
        <v-icon>mdi-{{ armyStore[key].icon }}</v-icon>
        <span>{{ Math.floor(army) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useArmyStore } from "../stores/army";

defineProps({
  title: String,
});

const armyStore = useArmyStore();
</script>

<style>
.armyList {
  display: flex;
  flex-direction: row;
}
.army {
  padding: 10px;
}
</style>
