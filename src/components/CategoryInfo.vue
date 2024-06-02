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
  <Card class="mb-auto w-full p-3 md:max-w-[300px]">
    <div class="animate-pulse" v-if="loading">
      <div class="aspect-[4/3] max-h-[600px] rounded-md bg-gray-200">
        <CategoryInfoIcon />
      </div>

      <div class="mt-5 space-y-5">
        <div class="h-8 rounded-md bg-gray-200"></div>
      </div>
    </div>
    <div class="pb-6" v-else>
      <img
        :src="category?.imageUrl"
        :alt="category?.name"
        class="md:max-auto mx-auto max-w-[200px]"
      />

      <p class="mt-4 w-full px-4 text-center text-xl text-title">
        {{ category?.name }}
      </p>
    </div>
  </Card>
</template>
