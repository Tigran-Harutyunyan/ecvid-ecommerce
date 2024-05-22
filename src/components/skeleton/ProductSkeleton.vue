<script setup lang="ts">
import Card from "@/components/Card.vue";
import SkeletonImageIcon from "@/components/ui/icons/SkeletonImageIcon.vue";
</script>
<template>
  <Card class="max-w-[1100px] mb-10">
    <div
      class="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mt-10 mb-10 space-y-2"
    >
      <div class="max-h-[600px] aspect-[4/3] bg-gray-200 rounded-md">
        <SkeletonImageIcon />
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
