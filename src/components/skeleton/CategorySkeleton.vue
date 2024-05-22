<script>
import SkeletonImageIcon from "@/components/ui/icons/SkeletonImageIcon.vue";
</script>
<template>
  <div class="space-y-2 py-2">
    <div
      v-for="n in 3"
      :key="n"
      class="animate-pulse space-x-4 md:flex md:items-center px-2"
    >
      <div
        class="flex w-10 h-10 items-center justify-center flex-shrink-0 bg-gray-200 rounded"
      >
        <SkeletonImageIcon />
      </div>
      <div class="w-64">
        <div class="h-2.5 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  </div>
</template>
