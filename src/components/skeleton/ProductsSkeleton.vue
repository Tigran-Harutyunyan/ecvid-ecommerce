<script setup lang="ts">
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import Card from "../../components/Card.vue";

const { width } = useWindowSize();

const count = computed(() => {
  if (width.value >= 1100) {
    return 3;
  } else if (width.value >= 480 && width.value < 1100) {
    return 2;
  }

  return 1;
});
</script>
<template>
  <div
    class="2xs:grid-cols-2 mb-10 grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 md:mb-5 md:grid-cols-2 md:gap-6 min-[1100px]:grid-cols-3"
  >
    <Card class="relative animate-pulse" v-for="n in count" :key="n">
      <div class="block h-80 w-full bg-gray-200"></div>

      <div class="mt-2 space-y-5 p-5">
        <div class="h-20 rounded-md bg-gray-200"></div>
        <div class="h-10 rounded-md bg-gray-200"></div>
      </div>
    </Card>
  </div>
</template>
