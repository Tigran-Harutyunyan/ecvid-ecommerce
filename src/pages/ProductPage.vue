<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useNotifications } from "@/composables/useNotifications";
import { useRouter, useRoute } from "vue-router";

import { useAPI } from "@/composables/useAPI";
import ProductImages from "@/components/ProductImages.vue";
import ProductInfo from "@/components/ProductInfo.vue";
import { type Product } from "@/types";
import Card from "@/components/Card.vue";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { useCollections } from "@/stores/collections";

const { setProduct, getProduct } = useCollections();

const { showError } = useNotifications();
const route = useRoute();
const isLoading = ref(false);
const product = ref<Product>();
const productCategory = ref();
const router = useRouter();

const breadcrumps = computed(() => {
  if (!productCategory.value || !product.value) return [];

  return [
    {
      label: productCategory.value?.name,
      link: `/category/${productCategory.value.id}`,
    },
    {
      label: product.value.name,
      link: "",
    },
  ];
});

/**
 * Fetches category data from an API based on the given category ID.
 * Updates the productCategory state with the retrieved data.
 * Handles errors by displaying them and manages the loading state.
 * @param {number} categoryID - The ID of the category to fetch.
 */
const getCategory = async (categoryID: string) => {
  try {
    const data = await useAPI(`/categories/${categoryID}`);
    if (data) {
      productCategory.value = data;
    }
  } catch (error) {
    showError({
      error,
    });
  } finally {
    isLoading.value = false;
  }
};

/**
 * Retrieves product data based on the given product ID.
 * @param {string} productId - The ID of the product to fetch.
 */
const fetchProduct = async (productId: string) => {
  // Construct the API URL using the productId
  let url = `/products/${productId}`;

  // Check if the product is cached
  const cache = getProduct(productId);

  // If cached, use the cached data; otherwise, set loading state to true
  if (cache) {
    product.value = cache;
  } else {
    isLoading.value = true;
  }

  try {
    // Fetch product data from the API
    const data = await useAPI(url);

    // Handle cases where product is not found
    if (data.code) {
      showError({
        text: "Product not found",
      });
      router.push("/");
    }

    // If product is found, update product state and cache it
    if (data?.id) {
      product.value = data;
      setProduct({ id: productId, item: data });

      // Optionally fetch the product's category
      if (data?.defaultCategoryId) {
        getCategory(data?.defaultCategoryId);
      }
    }
  } catch (error) {
    // Handle errors by showing error messages
    showError({
      error,
    });
  } finally {
    // Set isLoading state to false after the operation
    isLoading.value = false;
  }
};

watch(
  () => route.params,
  () => {
    if (route.params.id) {
      fetchProduct(route.params.id as string);
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div>
    <Breadcrumbs :breadcrumps="breadcrumps" class="mb-5" />

    <ProductSkeleton v-if="isLoading" />

    <Card
      v-if="!isLoading && product"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mb-10 max-w-[1100px]"
    >
      <ProductImages
        v-if="product?.galleryImages"
        :images="product?.galleryImages"
      />
      <ProductInfo :product="product" />
    </Card>
  </div>
</template>
