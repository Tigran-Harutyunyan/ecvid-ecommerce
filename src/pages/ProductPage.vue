<script setup lang="ts">
import { ref, watch } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { useRouter, useRoute } from "vue-router";

import { useAPI } from "@/composables/useAPI";
import ProductImages from "@/components/ProductImages.vue";
import ProductInfo from "@/components/ProductInfo.vue";
import { type Product } from "@/types";
import Card from "@/components/Card.vue";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton.vue";

const route = useRoute();
const isLoading = ref(true);
const product = ref<Product>();
const router = useRouter();

const getProduct = async (productId: string) => {
  isLoading.value = true;

  let url = `/products/${productId}`;

  try {
    const data = await useAPI(url);

    if (data.code) {
      notify({
        type: "error",
        text: "Product not found",
      });
      router.push("/");
    }

    if (data?.id) {
      product.value = data;
    }
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => route.params,
  () => {
    if (route.params.id) {
      getProduct(route.params.id as string);
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <ProductSkeleton v-if="isLoading" />

  <Card
    v-if="!isLoading && product"
    class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mt-10 mb-10"
  >
    <ProductImages
      v-if="product?.galleryImages"
      :images="product?.galleryImages"
    />
    <ProductInfo :product="product" />
  </Card>
</template>
