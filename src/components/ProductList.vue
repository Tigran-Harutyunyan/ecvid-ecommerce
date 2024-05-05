<script setup lang="ts">
import queryString from "query-string";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import ProductCard from "@/components/ProductCard.vue";
import { useAPI } from "@/composables/useAPI";
import Pagination from "@/components/Pagination.vue";
import Card from "@/components/Card.vue";

interface Iproduct {
  id: number;
  name: string;
  imageUrl: string;
  defaultDisplayedPriceFormatted: string;
  description: string;
}

interface IpaginationPayload {
  limit: number;
  offset: number;
}

const products = ref<Iproduct[]>([]);
const pagination = ref();
const isLoading = ref(true);
const ITEMS_PER_PAGE = 5;

const router = useRouter();
const route = useRoute();

const onPaginationChange = (query: IpaginationPayload) => {
  router.push({
    path: "/",
    query,
  });
};

const getProducts = async (queryParams?: string) => {
  isLoading.value = true;

  let url = "/products";
  if (queryParams) url += `?${queryParams}`;

  try {
    const data = await useAPI(url);

    if (data?.items && Array.isArray(data?.items)) {
      const { items, limit, offset, total, count } = data;
      products.value = items as Iproduct[];
      pagination.value = {
        limit,
        offset,
        total,
        count,
      };
    }
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};

const getQueryParams = () => {
  let parsedQueryParams = queryString.parse(location.search);

  if (parsedQueryParams !== null) {
    parsedQueryParams.limit =
      "limit" in parsedQueryParams
        ? parsedQueryParams.limit
        : String(ITEMS_PER_PAGE);
    parsedQueryParams.offset =
      "offset" in parsedQueryParams ? parsedQueryParams.offset : String(0);
  }

  return queryString.stringify(parsedQueryParams);
};

watch(
  () => route.params,
  () => {
    getProducts(getQueryParams());
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div
    v-if="isLoading"
    class="grid gap-8 grid-cols-1 min-[480px]:grid-cols-2 2xs:grid-cols-2 md:gap-6 md:grid-cols-2 min-[1100px]:grid-cols-3 mb-10 md:mb-5"
  >
    <Card class="relative animate-pulse" v-for="n in 10" :key="n">
      <div class="block h-80 w-full bg-gray-200 rounded-md"></div>
    </Card>
  </div>

  <template v-else>
    <div v-if="pagination.count === 0" class="text-secondary">
      <h2 class="mb-1">Product not found 🕵🏻‍♀️</h2>
      <p>Oops! The requested product was not found.</p>
    </div>
    <div
      v-if="products.length"
      class="grid gap-8 grid-cols-1 min-[480px]:grid-cols-2 2xs:grid-cols-2 md:gap-6 md:grid-cols-2 min-[1100px]:grid-cols-3 mb-10 md:mb-5"
    >
      <ProductCard v-for="product in products" :product="product" />
    </div>

    <Pagination
      v-if="pagination.count !== 0"
      :totalItems="pagination.total"
      :currentPage="pagination.offset + 1"
      :pageSize="pagination.limit"
      :maxPages="pagination.count"
      @change="onPaginationChange"
      class="mt-8 mb-3"
    />
  </template>
</template>