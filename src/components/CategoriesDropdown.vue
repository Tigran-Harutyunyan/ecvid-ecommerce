<script setup lang="ts">
import { computed } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useMain } from "@/stores/main";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { SfCounter } from "@storefront-ui/vue";
import CategoryDropdownIcon from "@/components/ui/icons/CategoryDropdownIcon.vue";
const { categories } = storeToRefs(useMain());

const router = useRouter();
const route = useRoute();

const currentCategoryID = computed(() => {
  return route.params.categoryID ? Number(route.params.categoryID) : -1;
});
</script>
<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center rounded-md bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        Categories
        <CategoryDropdownIcon />
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
        class="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div class="space-y-1 p-2">
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
                <span class="my-1 flex items-center">
                  <img
                    :src="imageUrl"
                    alt="category image"
                    class="mr-3 h-8 w-8"
                  />
                  {{ name }}

                  <SfCounter
                    class="ml-2 font-normal typography-text-sm"
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
