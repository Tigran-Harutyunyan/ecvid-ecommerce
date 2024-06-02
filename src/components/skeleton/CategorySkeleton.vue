<script>
import SkeletonImageIcon from "@/components/ui/icons/SkeletonImageIcon.vue";
</script>
<template>
  <div class="space-y-2 py-2">
    <div
      v-for="n in 3"
      :key="n"
      class="animate-pulse space-x-4 px-2 md:flex md:items-center"
    >
      <div
        class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-gray-200"
      >
        <SkeletonImageIcon />
      </div>
      <div class="w-64">
        <div class="h-2.5 rounded-full bg-gray-200"></div>
      </div>
    </div>
  </div>
</template>
