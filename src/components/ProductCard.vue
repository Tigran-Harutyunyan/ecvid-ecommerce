<script lang="ts" setup>
import AddToCartButton from "@/components/AddToCartButton.vue";
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
      <RouterLink :to="`/product/${product.id}`" class="block">
        <img
          :src="product?.imageUrl"
          :alt="product?.name"
          class="block object-cover h-auto rounded-md aspect-square"
        />
      </RouterLink>
    </div>
    <div class="p-5 border-t border-neutral-200">
      <RouterLink
        :to="`/product/${product.id}`"
        variant="secondary"
        class="no-underline line-clamp-1"
      >
        {{ product?.name }}
      </RouterLink>

      <p
        class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700"
      ></p>
      <span class="block pb-2 typography-text-lg text-primary-700">{{
        product.defaultDisplayedPriceFormatted
      }}</span>

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
