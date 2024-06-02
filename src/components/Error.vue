<script setup lang="ts">
import ErrorIcon from "@/components/ui/icons/ErrorIcon.vue";

const { error } = defineProps<{
  error: string;
}>();
</script>

<template>
  <div class="my-10 flex items-center">
    <ErrorIcon />
    <p class="ml-2 text-red-500">{{ error }}</p>
  </div>
</template>
