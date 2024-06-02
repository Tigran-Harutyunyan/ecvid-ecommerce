<script setup lang="ts">
import { ref, toRaw, computed } from "vue";
import { storeToRefs } from "pinia";
import { SfIconShoppingCartCheckout, SfIconPackage } from "@storefront-ui/vue";
import WishlistButton from "@/components/WishlistButton.vue";

import ProductOptions from "@/components/ProductOptions.vue";
import QuantitySelector from "@/components/QuantitySelector.vue";
import AddToCartButton from "@/components/AddToCartButton.vue";
import { type Product } from "@/types";
import { useCart } from "@/stores/cart";

const { cart } = storeToRefs(useCart());

const emit = defineEmits(["add", "remove"]);

interface Props {
  product: Product;
}

const { product } = defineProps<Props>();

let count = ref(1);

const onQuantityUpdate = (newCount: number) => {
  count.value = toRaw(newCount);
};

const currentProductCountInCart = computed(() => {
  const foundItem = cart.value.find((item) => item.product.id === product.id);
  return foundItem ? foundItem.amount : 0;
});
</script>

<template>
  <section class="md:max-w-[640px]" v-if="product">
    <h1 class="mb-1 text-xl text-title">
      {{ product.name }}
    </h1>

    <strong class="mt-3 block text-xl text-primary-700">{{
      product.defaultDisplayedPriceFormatted
    }}</strong>

    <p
      class="mb-6 mt-4 font-normal text-secondary typography-text-sm"
      v-html="product.description"
    ></p>

    <div class="my-4" v-for="option in product.options">
      <ProductOptions :option="option" class="my-2" />
    </div>

    <div class="mb-4 border-y border-gray-200 py-4">
      <div
        v-if="currentProductCountInCart"
        class="mb-4 flex items-center justify-center gap-1.5 rounded-md bg-primary-100 py-1.5 text-primary-700 typography-text-sm"
      >
        <SfIconShoppingCartCheckout />
        {{ currentProductCountInCart }} in cart
      </div>
      <div class="items-start xs:flex" v-if="product.inStock">
        <div
          class="mt-0.5 flex flex-col items-stretch xs:inline-flex xs:items-center"
        >
          <QuantitySelector @update="onQuantityUpdate" />
        </div>

        <AddToCartButton
          :product="product"
          :count="count"
          size="lg"
          class="xs:ml-4"
        />

        <WishlistButton :id="product.id" class="ml-auto mt-2" />
      </div>
    </div>

    <div class="flex first:mt-4" v-if="product.hasFreeShipping">
      <SfIconPackage size="sm" class="mr-1 flex-shrink-0 text-neutral-500" />
      <p class="text-sm">Free shipping</p>
    </div>
  </section>
</template>
