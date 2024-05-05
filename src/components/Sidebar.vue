<script lang="ts" setup>
import Card from "@/components/Card.vue";
import CategoriesList from "@/components/CategoriesList.vue";
</script>

<template>
  <Card class="md:max-w-[300px] w-full mb-auto">
    <div class="w-full hidden md:block">
      <h2
        class="rounded-md px-6 my-4 text-lg font-semibold block text-primary-700"
      >
        Categories
      </h2>
      <CategoriesList />
    </div>
  </Card>
</template>
