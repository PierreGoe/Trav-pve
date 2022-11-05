<template>
  <div
    class="fields d-flex align-center justify-center"
    @click="$emit('fieldSelected', field)"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="[{ active: hover }, typeOfField]"
  >
    <div class="d-flex level align-center justify-center">
      {{ field.level }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});
let hover = ref(false);

const typeOfField = computed(() => {
  // return props.field.type;
  return "crops";
});
</script>

<style>
.fields {
  max-width: 96px;
  width: 100vw;
  min-width: 64px;
  aspect-ratio: 1;
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
.crops {
  background-image: url(/src/assets/map/crops.png);
}
</style>
