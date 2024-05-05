<script setup lang="ts">
import { useCart } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { SfBadge, SfButton, SfIconShoppingCart } from "@storefront-ui/vue";
const { totalItems } = storeToRefs(useCart());
</script>

<template>
  <RouterLink to="/shopping-cart">
    <SfButton
      class="relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 mr-2 -ml-0.5 rounded-md"
      aria-label="Cart"
      variant="tertiary"
      square
    >
      <SfIconShoppingCart />
      <SfBadge :content="totalItems" class="bg-white cart-badge" />
    </SfButton>
  </RouterLink>
</template>
