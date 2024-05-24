<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import Search from "@/components/Search.vue";
import ProductList from "@/components/ProductList.vue";
import CategoryInfo from "@/components/CategoryInfo.vue";
import { useAPI } from "@/composables/useAPI";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import Error from "@/components/Error.vue";
import { useNotifications } from "@/composables/useNotifications";

const route = useRoute();
const category = ref();
const isLoading = ref(true);
const errorMessage = ref();
const { showError } = useNotifications();

const breadcrumps = computed(() => {
  if (!category.value) return [];

  return [
    {
      label: category.value.name,
      link: "",
    },
  ];
});

const filters = computed(() => {
  return {
    categories: route.params.categoryID as string,
  };
});

const getCategory = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const data = await useAPI(
      `/categories/${route.params.categoryID as string}`
    );

    if (data.code && data.message) {
      errorMessage.value = data.message;
    } else {
      category.value = data;
    }
  } catch (error) {
    showError({
      error,
    });
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
  <Error v-if="errorMessage" :error="errorMessage" />

  <template v-else>
    <Breadcrumbs :breadcrumps="breadcrumps" />
    <div class="md:flex md:justify-start gap-6 mt-6">
      <CategoryInfo :category="category" :loading="isLoading" />

      <div class="flex-1 mt-8 md:mt-0">
        <Search class="mb-6" />
        <ProductList :filters="filters" />
      </div>
    </div>
  </template>
</template>
