<script setup lang="ts">
import type { Category } from "../types";
import Card from "@/components/Card.vue";
import CategoryInfoIcon from "@/components/ui/icons/CategoryInfoIcon.vue";

interface Props {
  category: Category | undefined;
  loading: boolean;
}

const { category, loading } = defineProps<Props>();
</script>

<template>
  <Card class="md:max-w-[300px] w-full mb-auto p-3">
    <div class="animate-pulse" v-if="loading">
      <div class="max-h-[600px] aspect-[4/3] bg-gray-200 rounded-md">
        <CategoryInfoIcon />
      </div>

      <div class="space-y-5 mt-5">
        <div class="h-8 bg-gray-200 rounded-md"></div>
      </div>
    </div>
    <div class="pb-6" v-else>
      <img
        :src="category.imageUrl"
        :alt="category.name"
        class="mx-auto max-w-[200px] md:max-auto"
      />

      <p class="text-title text-xl w-full px-4 text-center mt-4">
        {{ category.name }}
      </p>
    </div>
  </Card>
</template>
