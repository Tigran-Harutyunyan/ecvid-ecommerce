<script setup lang="ts">
import { SfCounter, SfListItem } from "@storefront-ui/vue";
import { RouterLink } from "vue-router";
import { useMain } from "@/stores/main";
import { storeToRefs } from "pinia";

const { categories } = storeToRefs(useMain());
</script>

<template>
  <ul>
    <li v-for="category in categories" :key="category.id">
      <RouterLink :to="category.link">
        <SfListItem
          size="sm"
          tag="div"
          class="rounded-md first-of-type:mt-2 active:bg-primary-100"
        >
          <span class="my-1 flex items-center">
            <img
              :src="category.imageUrl"
              alt="category image"
              class="mr-3 h-10 w-10"
            />
            {{ category.name }}

            <SfCounter class="ml-2 font-normal typography-text-sm">
              {{ category.productCount }}
            </SfCounter>
          </span>
        </SfListItem>
      </RouterLink>
    </li>
  </ul>
</template>
