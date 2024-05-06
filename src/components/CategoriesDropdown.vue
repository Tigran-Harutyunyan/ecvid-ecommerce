<script setup lang="ts">
import { computed } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useMain } from "@/stores/main";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { SfCounter } from "@storefront-ui/vue";

const { categories } = storeToRefs(useMain());

const router = useRouter();
const route = useRoute();

const currentCategoryID = computed(() => {
  return route.params.categoryID ? Number(route.params.categoryID) : -1;
});

console.log(route.params);
</script>
<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        Categories

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
        >
          <path
            fill-rule="evenodd"
            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="z-10 absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div class="p-2 space-y-1">
          <MenuItem
            v-slot="{ active }"
            v-for="{ name, imageUrl, link, productCount, id } in categories"
          >
            <a @click="router.push(link)" class="inline-block w-full">
              <button
                :class="[
                  active || currentCategoryID === id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <span class="flex items-center my-1">
                  <img
                    :src="imageUrl"
                    alt="category image"
                    class="w-8 h-8 mr-3"
                  />
                  {{ name }}

                  <SfCounter
                    class="ml-2 typography-text-sm font-normal"
                    :class="{
                      'text-white': active || currentCategoryID === id,
                    }"
                  >
                    {{ productCount }}
                  </SfCounter>
                </span>
              </button>
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
