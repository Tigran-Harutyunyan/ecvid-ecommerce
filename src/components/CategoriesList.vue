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
          class="first-of-type:mt-2 rounded-md active:bg-primary-100"
        >
          <span class="flex items-center my-1">
            <img
              :src="category.imageUrl"
              alt="category image"
              class="w-10 h-10 mr-3"
            />
            {{ category.name }}

            <SfCounter class="ml-2 typography-text-sm font-normal">
              {{ category.productCount }}
            </SfCounter>
          </span>
        </SfListItem>
      </RouterLink>
    </li>
  </ul>
</template>
