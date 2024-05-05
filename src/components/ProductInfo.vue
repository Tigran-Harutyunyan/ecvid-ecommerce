<script setup lang="ts">
import { ref, toRaw, computed } from "vue";
import { storeToRefs } from "pinia";
import { SfIconShoppingCartCheckout, SfIconPackage } from "@storefront-ui/vue";

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
    <h1 class="mb-1 text-title text-xl">
      {{ product.name }}
    </h1>

    <strong class="block text-xl mt-3 text-primary-700">{{
      product.defaultDisplayedPriceFormatted
    }}</strong>

    <p
      class="mb-6 font-normal typography-text-sm mt-4 text-secondary"
      v-html="product.description"
    ></p>

    <div class="my-4" v-for="option in product.options">
      <ProductOptions :option="option" class="my-2" />
    </div>

    <div class="py-4 mb-4 border-gray-200 border-y">
      <div
        v-if="currentProductCountInCart"
        class="bg-primary-100 text-primary-700 flex justify-center gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md"
      >
        <SfIconShoppingCartCheckout />
        {{ currentProductCountInCart }} in cart
      </div>
      <div class="items-start xs:flex" v-if="product.inStock">
        <div
          class="flex flex-col items-stretch xs:items-center xs:inline-flex mt-0.5"
        >
          <QuantitySelector @update="onQuantityUpdate" />
        </div>

        <AddToCartButton
          :product="product"
          :count="count"
          size="lg"
          class="xs:ml-4"
        />
      </div>
    </div>

    <div class="flex first:mt-4" v-if="product.hasFreeShipping">
      <SfIconPackage size="sm" class="flex-shrink-0 mr-1 text-neutral-500" />
      <p class="text-sm">Free shipping</p>
    </div>
  </section>
</template>
