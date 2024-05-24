<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { ref, onMounted } from "vue";
import { SfButton, SfInput, SfIconSearch } from "@storefront-ui/vue";
import queryString from "query-string";
import { useRouter } from "vue-router";
// @ts-ignore
import { debounceTimeout } from "@/lib/constants";

const inputValue = ref();
const router = useRouter();

const search = () => {
  let parsedQueryParams = queryString.parse(location.search);
  parsedQueryParams.keyword = inputValue.value;

  router.push({
    path: location.pathname,
    query: parsedQueryParams,
  });
};

const debouncedFn = useDebounceFn(() => {
  search();
}, debounceTimeout);

onMounted(() => {
  let parsedQueryParams = queryString.parse(location.search);
  if (parsedQueryParams.keyword) {
    inputValue.value = parsedQueryParams.keyword;
  }
});
</script>

<template>
  <form
    role="search"
    class="flex flex-[100%] order-last lg:order-3 mt-2 lg:mt-0 pb-2 lg:pb-0"
    @submit.prevent="search"
  >
    <SfInput
      v-model="inputValue"
      @input="debouncedFn"
      type="search"
      class="[&::-webkit-search-cancel-button]:appearance-none"
      placeholder="Search by keyword"
      wrapper-class="flex-1 h-10 pr-0"
      size="base"
    >
      <template #suffix>
        <span class="flex items-center">
          <SfButton
            variant="tertiary"
            square
            aria-label="search"
            type="submit"
            class="rounded-l-none hover:bg-transparent active:bg-transparent"
          >
            <SfIconSearch />
          </SfButton>
        </span>
      </template>
    </SfInput>
  </form>
</template>
