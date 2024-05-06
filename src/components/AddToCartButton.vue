<script setup lang="ts">
import { type Product } from "@/types";
import { SfButton, SfIconShoppingCart } from "@storefront-ui/vue";
import { useCart } from "@/stores/cart";
const { addToCart } = useCart();

interface Props {
  product: Product;
  count: number;
  size?: "sm" | "lg";
  disabled?: boolean;
}

const { count, product, disabled, size = "sm" } = defineProps<Props>();
</script>

<template>
  <SfButton
    :size="size"
    @click="addToCart(product, count)"
    :disabled="disabled"
  >
    <template #prefix>
      <SfIconShoppingCart size="sm" />
    </template>
    <span class="hidden sm:inline-block">Add to cart</span>
  </SfButton>
</template>
