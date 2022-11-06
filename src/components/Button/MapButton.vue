<template>
  <v-btn @click="goMap()"> Map </v-btn>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goMap() {
  router.push(`/map`);
}
</script>
