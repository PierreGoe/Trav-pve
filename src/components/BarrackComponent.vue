<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            v-for="(army, key) in armyStore.army"
            type="number"
            min="0"
            :key="key"
            :ref="key"
            v-model="armyPayload[key]"
            :rules="[() => !!key || 'This field is required']"
            :label="key"
            required
          >
            <template #prepend-inner>
              <v-icon>mdi-{{ armyStore[key].icon }} </v-icon>
              <v-tooltip activator="parent" location="end">
                <li>Crops : {{ armyStore[key].cost.crops }}</li>
                <li>Wood : {{ armyStore[key].cost.wood }}</li>
                <li>Stone : {{ armyStore[key].cost.stone }}</li>
                <li>Gold : {{ armyStore[key].cost.gold }}</li>
                <li>Attack : {{ armyStore[key].attack }}</li>
                <li>Defense : {{ armyStore[key].defense }}</li>
                <li>Speed : {{ armyStore[key].speed }}</li>
              </v-tooltip>
            </template>
          </v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text> Cancel </v-btn>
          <v-spacer></v-spacer>
          <v-chip class="headv-chipne text-capitalize">
            crops : {{ countCost.crops }}
          </v-chip>
          <v-chip class="headv-chipne text-capitalize">
            wood : {{ countCost.wood }}
          </v-chip>
          <v-chip class="headv-chipne text-capitalize">
            stone : {{ countCost.stone }}
          </v-chip>
          <v-chip class="headv-chipne text-capitalize">
            gold : {{ countCost.gold }}
          </v-chip>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            @click="submit"
            :disabled="!checkForRessources"
          >
            Pay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useArmyStore } from "../stores/army";
import type { ArmyPayload } from "@/src/modeles/Army";
import { useRessourcesStore } from "../stores/ressources";
import { useProductionStore } from "../stores/production";

const armyStore = useArmyStore();
const ressourcesStore = useRessourcesStore();
const productionStore = useProductionStore();

const armyPayload = ref<ArmyPayload>({
  swordsmen: 0,
  archers: 0,
  pikemen: 0,
  cavalry: 0,
});

function submit() {
  armyStore.updateArmy(armyPayload.value);
  ressourcesStore.removeRessources({
    crops: countCost.value.crops,
    wood: countCost.value.wood,
    stone: countCost.value.stone,
    gold: countCost.value.gold,
  });
  armyPayload.value = {
    swordsmen: 0,
    archers: 0,
    pikemen: 0,
    cavalry: 0,
  };
  productionStore.update();
}

const countCost = computed(() => {
  let crops = 0;
  let wood = 0;
  let stone = 0;
  let gold = 0;

  for (const key in armyPayload.value) {
    crops += armyStore[key].cost.crops * armyPayload.value[key];
    wood += armyStore[key].cost.wood * armyPayload.value[key];
    stone += armyStore[key].cost.stone * armyPayload.value[key];
    gold += armyStore[key].cost.gold * armyPayload.value[key];
  }

  return {
    crops,
    wood,
    stone,
    gold,
  };
});

const checkForRessources = computed(() => {
  // check if player has enough resources
  if (
    ressourcesStore.ressources.crops.value < countCost.value.crops ||
    ressourcesStore.ressources.wood.value < countCost.value.wood ||
    ressourcesStore.ressources.stone.value < countCost.value.stone ||
    ressourcesStore.ressources.gold.value < countCost.value.gold
  ) {
    return false;
  }
  return true;
});
</script>
