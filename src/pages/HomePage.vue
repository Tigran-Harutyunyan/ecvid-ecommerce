<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import ProductList from "@/components/ProductList.vue";
import Search from "@/components/Search.vue";
</script>

<template>
  <div class="md:flex md:justify-start gap-6 pb-4">
    <Sidebar />

    <div class="flex-1">
      <Search class="mb-6" />
      <ProductList />
    </div>
  </div>
</template>
