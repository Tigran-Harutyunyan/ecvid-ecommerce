<script setup lang="ts">
import Categories from "@/components/Categories.vue";
import ProductList from "@/components/ProductList.vue";
import Card from "@/components/Card.vue";
</script>

<template>
  <div class="mb-10 px-4 md:px-0"></div>

  <div class="md:flex md:justify-start gap-6">
    <Card class="md:max-w-[300px] w-full mb-auto">
      <Categories />
    </Card>

    <div class="flex-1">
      <ProductList />
    </div>
  </div>
</template>
