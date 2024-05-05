<script setup lang="ts">
import Card from "../../components/Card.vue";
</script>
<template>
  <Card class="p-6">
    <div
      class="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-10 space-y-2"
    >
      <div class="max-h-[600px] aspect-[4/3] bg-gray-200 rounded-md">
        <svg
          class="text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path
            d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
          />
        </svg>
      </div>

      <div class="space-y-5">
        <div class="h-8 bg-gray-200 rounded-md"></div>

        <div class="h-32 bg-gray-200 rounded-md"></div>
      </div>
    </div>

    <div
      class="grid gap-8 grid-cols-1 min-[480px]:grid-cols-2 2xs:grid-cols-2 md:gap-6 md:grid-cols-2 min-[1100px]:grid-cols-3 mb-10 md:mb-5"
    >
      <Card class="relative animate-pulse" v-for="n in 3" :key="n">
        <div class="block h-80 w-full bg-gray-200 rounded-md"></div>
      </Card>
    </div>
  </Card>
</template>
