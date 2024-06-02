<script setup lang="ts">
import { useCart } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { SfBadge, SfButton, SfIconShoppingCart } from "@storefront-ui/vue";
const { totalItems } = storeToRefs(useCart());
</script>

<template>
  <RouterLink to="/shopping-cart">
    <SfButton
      class="relative -ml-0.5 mr-2 rounded-md text-white hover:bg-primary-800 hover:text-white active:bg-primary-900 active:text-white"
      aria-label="Cart"
      variant="tertiary"
      square
    >
      <SfIconShoppingCart />
      <SfBadge :content="totalItems" class="cart-badge bg-white" />
    </SfButton>
  </RouterLink>
</template>
