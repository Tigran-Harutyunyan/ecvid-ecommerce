<script setup lang="ts">
import {
  SfButton,
  SfIconFavorite,
  SfIconFavoriteFilled,
} from "@storefront-ui/vue";
import { useMain } from "@/stores/main";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const { wishList } = storeToRefs(useMain());
const { toggleWishlist } = useMain();

interface Props {
  id: number;
}

const { id } = defineProps<Props>();

const isFavoriteItem = computed(() => {
  return wishList.value.includes(id);
});
</script>

<template>
  <SfButton
    @click="toggleWishlist(id)"
    variant="tertiary"
    size="sm"
    square
    class="bg-white ring-1 ring-inset ring-neutral-200 !rounded-full cursor-pointer"
    aria-label="Add to wishlist"
  >
    <SfIconFavoriteFilled size="sm" v-if="isFavoriteItem" />
    <SfIconFavorite size="sm" v-else />
  </SfButton>
</template>
