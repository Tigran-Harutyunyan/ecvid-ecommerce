<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import Search from "@/components/Search.vue";
import ProductList from "@/components/ProductList.vue";
import CategoryInfo from "@/components/CategoryInfo.vue";
import { useAPI } from "@/composables/useAPI";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

const route = useRoute();
const category = ref();
const isLoading = ref(true);

const breadcrumps = [
  {
    label: "Category details",
    link: "",
  },
];

const filters = computed(() => {
  return {
    categories: route.params.categoryID as string,
  };
});

const getCategory = async () => {
  isLoading.value = true;
  try {
    const data = await useAPI(
      `/categories/${route.params.categoryID as string}`
    );
    if (data) {
      category.value = data;
    }
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => route.params,
  () => {
    getCategory();
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <Breadcrumbs :breadcrumps="breadcrumps" />
  <div class="md:flex md:justify-start gap-6 mt-6">
    <CategoryInfo :category="category" :loading="isLoading" />

    <div class="flex-1 mt-8 md:mt-0">
      <Search class="mb-6" />
      <ProductList :filters="filters" />
    </div>
  </div>
</template>
