<script lang="ts" setup>
import Card from "@/components/Card.vue";
import CategoriesList from "@/components/CategoriesList.vue";
</script>

<template>
  <Card class="mb-auto w-full md:max-w-[300px]">
    <div class="hidden w-full md:block">
      <h2
        class="my-4 block rounded-md px-6 text-lg font-semibold text-primary-700"
      >
        Categories
      </h2>
      <CategoriesList class="p-2" />
    </div>
  </Card>
</template>
