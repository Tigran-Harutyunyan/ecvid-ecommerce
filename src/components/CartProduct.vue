<script lang="ts" setup>
import { SfIconDelete } from "@storefront-ui/vue";
import { type CartProduct } from "@/types";
import { useCart } from "@/stores/cart";
import CartAmountUpdater from "./CartAmountUpdater.vue";

interface Props {
  cartItem: CartProduct;
}
const { cartItem } = defineProps<Props>();
const { product, amount } = cartItem;

const { removeFromCart } = useCart();
</script>

<template>
  <div
    class="product-card flex border-b-[1px] border-neutral-200 hover:shadow-lg min-w-[320px] p-4"
  >
    <div class="relative overflow-hidden rounded-md w-[100px] lg:w-[176px]">
      <RouterLink :to="`product/${product.id}`">
        <img
          class="w-full h-auto border rounded-md border-neutral-200"
          :src="product.imageUrl"
          :alt="product.name"
        />
      </RouterLink>
    </div>
    <div class="flex flex-col pl-4 min-w-[180px] flex-1">
      <RouterLink
        :to="`product/${product.id}`"
        variant="secondary"
        class="no-underline typography-text-sm sm:typography-text-lg text-title"
      >
        {{ product.name }}
      </RouterLink>

      <div class="items-center sm:mt-auto sm:flex">
        <span
          class="text-primary-700 sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg flex-shrink-0"
          >{{ product.defaultDisplayedPriceFormatted }}
        </span>
        <div class="flex items-center justify-between mt-4 sm:mt-0">
          <CartAmountUpdater :amount="amount" :productId="product.id" />
          <button
            @click="removeFromCart(product.id)"
            aria-label="Remove"
            type="button"
            class="text-neutral-500 typography-text-xs font-light ml-auto flex items-center px-3 py-1.5"
          >
            <SfIconDelete />
            <span class="hidden ml-1.5 lg:block"> Remove </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
