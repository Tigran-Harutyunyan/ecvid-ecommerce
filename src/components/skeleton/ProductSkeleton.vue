<script setup lang="ts">
import Card from "@/components/Card.vue";
import SkeletonImageIcon from "@/components/ui/icons/SkeletonImageIcon.vue";
</script>
<template>
  <Card class="mb-10 max-w-[1100px]">
    <div
      class="mb-10 mt-10 grid animate-pulse grid-cols-1 gap-6 space-y-2 p-6 md:grid-cols-2"
    >
      <div class="aspect-[4/3] max-h-[600px] rounded-md bg-gray-200">
        <SkeletonImageIcon />
      </div>

      <div class="space-y-5">
        <div class="h-8 rounded-md bg-gray-200"></div>
        <div class="h-8 w-40 rounded-md bg-gray-200"></div>

        <div class="h-[180px] w-full rounded-md bg-gray-200"></div>

        <div class="flex h-12 gap-4">
          <div class="w-40 rounded-md bg-gray-200"></div>
          <div class="w-full rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  </Card>
</template>
