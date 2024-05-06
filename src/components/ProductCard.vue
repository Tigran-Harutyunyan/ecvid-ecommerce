<script lang="ts" setup>
import AddToCartButton from "@/components/AddToCartButton.vue";
import WishlistButton from "@/components/WishlistButton.vue";
import { type Product } from "@/types";
import { useProduct } from "@/composables/useProduct";

interface ProductProp {
  product: Product;
}

const { product } = defineProps<ProductProp>();

const { hasRequiredOption } = useProduct(product);
</script>

<template>
  <div class="product-card">
    <div class="relative">
      <WishlistButton
        :id="product.id"
        class="absolute bottom-0 right-0 mr-2 mb-2"
      />

      <RouterLink :to="`/product/${product.id}`" class="block">
        <img
          v-lazy="product?.imageUrl"
          :alt="product?.name"
          class="block object-cover h-auto rounded-md aspect-square"
        />
      </RouterLink>
    </div>
    <div class="p-5 border-t border-neutral-200">
      <RouterLink
        :to="`/product/${product.id}`"
        variant="secondary"
        class="line-clamp-1 text-sm"
      >
        {{ product?.name }}
      </RouterLink>

      <span
        class="block pb-2 mt-2 typography-text-lg text-primary-700 font-semibold"
        >{{ product.defaultDisplayedPriceFormatted }}</span
      >

      <AddToCartButton
        v-if="!hasRequiredOption"
        :product="product"
        :count="1"
        size="sm"
        class="mx-auto w-full"
      />
    </div>
  </div>
</template>
