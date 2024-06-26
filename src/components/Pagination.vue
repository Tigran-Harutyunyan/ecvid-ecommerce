<script lang="ts" setup>
import PageSelector from "@/components/PageSelector.vue";

import {
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  usePagination,
} from "@storefront-ui/vue";

interface PaginationProps {
  totalItems: number;
  offset: number;
  pageSize: number;
  maxPages: number;
}

const { totalItems, offset, pageSize, maxPages } =
  defineProps<PaginationProps>();

const currentPage = offset >= totalItems ? -1 : offset / pageSize + 1;

const emit = defineEmits(["change"]);

const { totalPages, pages, selectedPage, startPage, endPage, maxVisiblePages } =
  usePagination({
    totalItems,
    currentPage,
    pageSize,
    maxPages,
  });

const onShowPage = (pageSize: string) => {
  emit("change", {
    limit: pageSize,
    offset: 0,
  });
};

const setPage = (pageNumber: number) => {
  emit("change", {
    limit: pageSize,
    offset: pageSize * (pageNumber - 1),
  });
};
</script>
<template>
  <nav
    v-show="totalItems > maxPages"
    class="flex items-end justify-between border-t border-neutral-200"
    role="navigation"
    aria-label="pagination"
  >
    <SfButton
      size="lg"
      aria-label="Go to previous page"
      :disabled="selectedPage <= 1"
      variant="tertiary"
      class="gap-3 !px-3 sm:px-6"
      @click="setPage(selectedPage - 1)"
    >
      <template #prefix>
        <SfIconChevronLeft />
      </template>
      <span class="hidden sm:inline-flex"> Previous </span>
    </SfButton>
    <div class="flex items-center">
      <ul class="mr-2 flex justify-center">
        <li v-if="!pages.includes(1)">
          <div
            :class="[
              'flex border-t-4 border-transparent pt-1',
              {
                'border-t-4 !border-primary-500 font-medium':
                  selectedPage === 1,
              },
            ]"
          >
            <button
              type="button"
              class="min-w-[38px] rounded-md px-3 py-3 text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 sm:px-4 md:w-12"
              :aria-current="selectedPage === 1"
              @click="setPage(1)"
            >
              1
            </button>
          </div>
        </li>
        <li v-if="startPage > 2">
          <div class="flex border-t-4 border-transparent pt-1">
            <button
              type="button"
              disabled
              aria-hidden="true"
              class="rounded-md px-4 py-3 text-neutral-500 md:w-12"
            >
              ...
            </button>
          </div>
        </li>
        <li v-if="maxVisiblePages === 1 && selectedPage === totalPages">
          <div class="flex border-t-4 border-transparent pt-1">
            <button
              type="button"
              class="min-w-[38px] rounded-md px-3 py-3 text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 sm:px-4 md:w-12"
              :aria-current="endPage - 1 === selectedPage"
              @click="setPage(endPage - 1)"
            >
              {{ endPage - 1 }}
            </button>
          </div>
        </li>
        <li v-for="page in pages" :key="`page-${page}`">
          <div
            :class="[
              'flex border-t-4 border-transparent pt-1',
              {
                'border-t-4 !border-primary-700 font-medium':
                  selectedPage === page,
              },
            ]"
          >
            <button
              type="button"
              :class="[
                'min-w-[38px] rounded-md px-3 py-3 text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 sm:px-4 md:w-12',
                {
                  '!text-neutral-900 hover:!text-primary-800 active:!text-primary-900':
                    selectedPage === page,
                },
              ]"
              :aria-label="`Page ${page} of ${totalPages}`"
              :aria-current="selectedPage === page"
              @click="setPage(page)"
            >
              {{ page }}
            </button>
          </div>
        </li>
        <li v-if="maxVisiblePages === 1 && selectedPage === 1">
          <div class="flex border-t-4 border-transparent pt-1">
            <button
              type="button"
              class="min-w-[38px] rounded-md px-3 py-3 text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 sm:px-4 md:w-12"
              :aria-label="`Page 2 of ${totalPages}`"
              @click="setPage(2)"
            >
              2
            </button>
          </div>
        </li>
        <li v-if="endPage < totalPages - 1">
          <div class="flex border-t-4 border-transparent pt-1">
            <button
              type="button"
              disabled
              aria-hidden="true"
              class="rounded-md px-4 py-3 text-neutral-500 md:w-12"
            >
              ...
            </button>
          </div>
        </li>
        <li v-if="!pages.includes(totalPages)">
          <div
            :class="[
              'flex border-t-4 border-transparent pt-1',
              {
                'border-t-4 !border-primary-500 font-medium':
                  selectedPage === totalPages,
              },
            ]"
          >
            <button
              type="button"
              class="min-w-[38px] rounded-md px-3 py-3 text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 sm:px-4 md:w-12"
              :aria-current="totalPages === selectedPage"
              @click="setPage(totalPages)"
            >
              {{ totalPages }}
            </button>
          </div>
        </li>
      </ul>

      <PageSelector :pageSize="pageSize" @change="onShowPage" />
    </div>
    <SfButton
      size="lg"
      aria-label="Go to next page"
      :disabled="selectedPage >= totalPages"
      variant="tertiary"
      class="gap-3 !px-3 sm:px-6"
      @click="setPage(selectedPage + 1)"
    >
      <span class="hidden sm:inline-flex"> Next </span>
      <template #suffix>
        <SfIconChevronRight />
      </template>
    </SfButton>
  </nav>
</template>
