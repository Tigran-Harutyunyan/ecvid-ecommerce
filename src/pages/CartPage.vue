<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { SfButton, SfIconShoppingCart } from "@storefront-ui/vue";

import Breadcrumbs from "@/components/Breadcrumbs.vue";
import CartProduct from "@/components/CartProduct.vue";
import CartSummary from "@/components/CartSummary.vue";
import CheckIcon from "@/components/ui/icons/CheckIcon.vue";
import { useCart } from "@/stores/cart";

const { cart } = storeToRefs(useCart());
const showPaySuccessMessage = ref(false);

const onPurchaseSuccess = () => {
  showPaySuccessMessage.value = true;
};

const breadcrumps = [
  {
    label: "Shopping cart",
    link: "",
  },
];
</script>

<template>
  <Breadcrumbs :breadcrumps="breadcrumps" class="mb-5" />

  <div v-if="showPaySuccessMessage" class="text-center p-10">
    <div class="flex items-center justify-center">
      <div>
        <div class="flex flex-col items-center space-y-2">
          <CheckIcon />

          <h1 class="text-4xl font-semibold">Thank you for your purchase !</h1>
          <p class="py-2 text-secondary">Item(s) will be shipped soon</p>
          <RouterLink to="/">
            <SfButton> Home </SfButton>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <template v-else>
    <div
      v-if="cart.length === 0"
      class="w-full flex flex-col items-center mt-10 p-10"
    >
      <SfIconShoppingCart size="2xl" class="text-primary-700 mx-auto" />
      <div class="mt-3">Cart is empty</div>
    </div>

    <div
      v-else
      class="block min-[900px]:grid grid-cols-12 gap-4 mt-5 mb-10 max-w-[1100px]"
    >
      <ul class="space-y-4 lg:col-span-8 col-span-6">
        <CartProduct
          :cartItem="item"
          v-for="item in cart"
          :key="item.product.id"
        />
      </ul>

      <CartSummary
        class="lg:col-span-4 col-span-6 max-[900px]:mt-5"
        @purchased="onPurchaseSuccess"
      />
    </div>
  </template>
</template>
