<script setup lang="ts">
import ErrorIcon from "@/components/ui/icons/ErrorIcon.vue";

const { error } = defineProps<{
  error: string;
}>();
</script>

<template>
  <div class="flex items-center my-10">
    <ErrorIcon />
    <p class="ml-2 text-red-500">{{ error }}</p>
  </div>
</template>
