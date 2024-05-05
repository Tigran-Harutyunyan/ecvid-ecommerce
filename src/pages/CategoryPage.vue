<script setup lang="ts">
import { ref } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { useRoute, useRouter } from "vue-router";
import ProductCard from "@/components/ProductCard.vue";
import Card from "@/components/Card.vue";
import CategoryPageSkeleton from "@/components/skeleton/CategoryPageSkeleton.vue";
import { useAPI } from "@/composables/useAPI";

const route = useRoute();
const router = useRouter();
const category = ref();
const products = ref();
const isLoading = ref(true);

const getCategory = async () => {
  const data = await useAPI(`/categories/${route.params.id as string}`);
  if (data) {
    category.value = data;
  }
};

const getCategoryProducts = async () => {
  const data = await useAPI(
    `/products?categories=${route.params.id as string}`
  );

  if (data.items && Array.isArray(data.items)) {
    products.value = data.items;
  }

  isLoading.value = false;

  if (data.code) {
    notify({
      type: "error",
      text: "Category not found",
    });
    router.push("/");
  }
};

getCategory();
getCategoryProducts();
</script>

<template>
  <div class="mt-6 mb-16">
    <CategoryPageSkeleton v-if="isLoading" />

    <Card v-else class="p-6">
      <div class="flex flex-wrap gap-4">
        <img :src="category.imageUrl" :alt="category.name" />

        <div class="flex flex-col mt-5">
          <p class="text-title text-3xl">{{ category.name }}</p>
        </div>
      </div>
      <div
        v-if="products.length"
        class="grid gap-8 grid-cols-1 min-[480px]:grid-cols-2 2xs:grid-cols-2 md:gap-6 md:grid-cols-2 min-[1100px]:grid-cols-4 mb-10 md:mb-5 mt-5"
      >
        <ProductCard v-for="product in products" :product="product" />
      </div>
    </Card>
  </div>
</template>
