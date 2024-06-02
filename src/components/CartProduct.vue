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
    class="product-card flex min-w-[320px] border-b-[1px] border-neutral-200 p-4 hover:shadow-lg"
  >
    <div class="relative w-[100px] overflow-hidden rounded-md lg:w-[176px]">
      <RouterLink :to="`product/${product.id}`">
        <img
          class="h-auto w-full rounded-md border border-neutral-200"
          :src="product.imageUrl"
          :alt="product.name"
        />
      </RouterLink>
    </div>
    <div class="flex min-w-[180px] flex-1 flex-col pl-4">
      <RouterLink
        :to="`product/${product.id}`"
        variant="secondary"
        class="text-title no-underline typography-text-sm sm:typography-text-lg"
      >
        {{ product.name }}
      </RouterLink>

      <div class="items-center sm:mt-auto sm:flex">
        <span
          class="flex-shrink-0 text-primary-700 typography-text-sm sm:order-1 sm:ml-auto sm:typography-text-lg"
          >{{ product.defaultDisplayedPriceFormatted }}
        </span>
        <div class="mt-4 flex items-center justify-between sm:mt-0">
          <CartAmountUpdater :amount="amount" :productId="product.id" />
          <button
            @click="removeFromCart(product.id)"
            aria-label="Remove"
            type="button"
            class="ml-auto flex items-center px-3 py-1.5 font-light text-neutral-500 typography-text-xs"
          >
            <SfIconDelete />
            <span class="ml-1.5 hidden lg:block"> Remove </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
