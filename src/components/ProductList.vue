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
import { useCollections } from "@/stores/collections";

const { setProductList, getProductList } = useCollections();

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
const isLoading = ref(false);
const ITEMS_PER_PAGE = 6;
const errorMessage = ref();

const router = useRouter();
const route = useRoute();

const { showError } = useNotifications();

const onPaginationChange = (query: IpaginationPayload) => {
  router.push(`${location.pathname}?${queryString.stringify(query)}`);
};

/**
 * Fetches a list of products from an API endpoint, handles caching, updates the product list and pagination data,
 * and manages loading and error states.
 * @param queryParams Optional query parameters for the API request.
 */
const getProducts = async (queryParams?: string): Promise<void> => {
  try {
    const url = queryParams ? `/products?${queryParams}` : "/products";
    errorMessage.value = "";
    pagination.value = null;
    const cache = getProductList(queryParams as string);

    if (cache) {
      products.value = cache;
    } else {
      isLoading.value = true;
    }

    const data = await useAPI(url);

    if (data?.items && Array.isArray(data.items)) {
      const { items, limit, offset, total, count } = data;
      products.value = items as Product[];
      setProductList({ id: queryParams as string, items });
      pagination.value = { limit, offset, total, count };
    }

    if (data.code && data.message) {
      errorMessage.value = data.message;
    }
  } catch (error) {
    showError({ error });
  } finally {
    isLoading.value = false;
  }
};

/**
 * Parses the current URL's query parameters, sets default values for `limit` and `offset` if they are not present,
 * and merges any additional filters provided via props. Returns the updated query parameters as a string.
 * @returns {string} Updated query parameters as a string.
 */
const getQueryParams = (): string => {
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
  },
);
</script>

<template>
  <Error v-if="errorMessage" :error="errorMessage" />
  <template v-else>
    <ProductsSkeleton v-if="isLoading" />
    <Transition>
      <div v-if="!isLoading">
        <div v-if="pagination && pagination.count === 0" class="text-secondary">
          <h2 class="mb-1">Oops! The requested product was not found. 🕵🏻‍♀️</h2>
        </div>
        <div
          v-if="products.length"
          class="2xs:grid-cols-2 mb-10 grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 md:mb-5 md:grid-cols-2 md:gap-6 min-[1100px]:grid-cols-3"
        >
          <ProductCard v-for="product in products" :product="product" />
        </div>

        <Pagination
          v-if="pagination && pagination.count !== 0"
          :totalItems="pagination.total"
          :offset="pagination.offset"
          :pageSize="pagination.limit"
          :maxPages="pagination.count"
          @change="onPaginationChange"
          class="mb-3 mt-8"
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
