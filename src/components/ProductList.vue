<script setup lang="ts">
import queryString from "query-string";
import { ref, watch, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import ProductCard from "@/components/ProductCard.vue";
import ProductsSkeleton from "@/components/skeleton/ProductsSkeleton.vue";
import { useAPI } from "@/composables/useAPI";
import Pagination from "@/components/Pagination.vue";
import Error from "@/components/Error.vue";
import { type Product } from "@/types";
import { useNotifications } from "@/composables/useNotifications";

interface Props {
  filters?: {
    [key: string]: string;
  };
}

const props = defineProps<Props>();
const { filters } = toRefs(props);

interface IpaginationPayload {
  query: {
    limit: number;
    offset: number;
  };
}

const products = ref<Product[]>([]);
const pagination = ref();
const isLoading = ref(true);
const ITEMS_PER_PAGE = 6;
const errorMessage = ref();

const router = useRouter();
const route = useRoute();

const { showError } = useNotifications();

const onPaginationChange = (query: IpaginationPayload) => {
  router.push(`${location.pathname}?${queryString.stringify(query)}`);
};

const getProducts = async (queryParams?: string) => {
  isLoading.value = true;
  errorMessage.value = "";

  let url = "/products";

  if (queryParams) url += `?${queryParams}`;

  try {
    const data = await useAPI(url);

    if (data?.items && Array.isArray(data?.items)) {
      const { items, limit, offset, total, count } = data;
      products.value = items as Product[];
      pagination.value = {
        limit,
        offset,
        total,
        count,
      };
    }
    if (data.code && data.message) {
      errorMessage.value = data.message;
    }
  } catch (error) {
    showError({
      error,
    });
  } finally {
    isLoading.value = false;
  }
};

const getQueryParams = () => {
  let params = queryString.parse(location.search);

  if (params !== null) {
    params.limit = Object.hasOwn(params, "limit")
      ? params.limit
      : String(ITEMS_PER_PAGE);

    params.offset = Object.hasOwn(params, "offset") ? params.offset : String(0);
  }

  if (filters.value) {
    for (const [key, val] of Object.entries(filters.value)) {
      params[key] = val;
    }
  }

  return queryString.stringify(params);
};

watch(
  () => route.params,
  async () => {
    getProducts(getQueryParams());
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <Error v-if="errorMessage" :error="errorMessage" />
  <template v-else>
    <ProductsSkeleton v-if="isLoading" />
    <Transition>
      <div v-if="!isLoading">
        <div v-if="pagination.count === 0" class="text-secondary">
          <h2 class="mb-1">Oops! The requested product was not found. 🕵🏻‍♀️</h2>
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
          :offset="pagination.offset"
          :pageSize="pagination.limit"
          :maxPages="pagination.count"
          @change="onPaginationChange"
          class="mt-8 mb-3"
        />
      </div>
    </Transition>
  </template>
</template>

<style scoped>
.v-enter-active {
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
