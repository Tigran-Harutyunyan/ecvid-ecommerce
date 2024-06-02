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
        class="absolute bottom-0 right-0 mb-2 mr-2"
      />

      <RouterLink :to="`/product/${product.id}`" class="block">
        <img
          :src="product?.imageUrl"
          :alt="product?.name"
          class="block aspect-square h-auto rounded-md object-cover"
        />
      </RouterLink>
    </div>
    <div class="border-t border-neutral-200 p-5">
      <RouterLink
        :to="`/product/${product.id}`"
        variant="secondary"
        class="line-clamp-1 text-sm"
      >
        {{ product?.name }}
      </RouterLink>

      <span
        class="mt-2 block pb-2 font-semibold text-primary-700 typography-text-lg"
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
