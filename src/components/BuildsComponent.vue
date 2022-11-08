<template>
  <div
    class="build d-flex align-center justify-center"
    @click="$emit('buildSelected', build)"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="[{ active: hover }, typeOfBuild]"
  >
    <div v-if="build.level" class="d-flex level align-center justify-center">
      {{ build.level }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const props = defineProps({
  build: {
    type: Object,
    required: true,
  },
});
let hover = ref(false);

const typeOfBuild = computed(() => {
  return props.build.type;
});
</script>

<style>
.build {
  max-width: 96px;
  width: 100vw;
  min-width: 64px;
  aspect-ratio: 1;
  background-size: cover;
}
.level {
  color: white;
  border-radius: 10rem;
  background-color: rgba(0, 0, 0, 0.5);
  width: 2rem;
  height: 2rem;
}
.active {
  transform: scale(1.05);
}
.empty {
  background-image: url(/src/assets/town/empty.png);
}
.barrack {
  background-image: url(/src/assets/town/barrack.png);
}
.cityHall {
  background-image: url(/src/assets/town/cityHall.png);
}
</style>
