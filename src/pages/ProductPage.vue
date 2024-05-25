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

const getCategory = async (categoryID: number) => {
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

const fetchProduct = async (productId: string) => {
  let url = `/products/${productId}`;
  const cache = getProduct(productId);

  if (cache) {
    product.value = cache;
  } else {
    isLoading.value = true;
  }

  try {
    const data = await useAPI(url);

    if (data.code) {
      showError({
        text: "Product not found",
      });
      router.push("/");
    }

    if (data?.id) {
      product.value = data;
      setProduct({ id: productId, item: data });

      if (data?.defaultCategoryId) {
        getCategory(data?.defaultCategoryId);
      }
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
</template>
