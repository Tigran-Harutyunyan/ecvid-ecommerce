<script setup lang="ts">
import Card from "../../components/Card.vue";
</script>
<template>
  <Card>
    <div
      class="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mt-10 mb-10 space-y-2"
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
        <div class="h-8 w-40 bg-gray-200 rounded-md"></div>

        <div class="h-[180px] w-full bg-gray-200 rounded-md"></div>

        <div class="flex gap-4 h-12">
          <div class="w-40 bg-gray-200 rounded-md"></div>
          <div class="w-full bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  </Card>
</template>
