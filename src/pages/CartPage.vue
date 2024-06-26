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
  <div>
    <Breadcrumbs :breadcrumps="breadcrumps" class="mb-5" />

    <div v-if="showPaySuccessMessage" class="p-10 text-center">
      <div class="flex items-center justify-center">
        <div>
          <div class="flex flex-col items-center space-y-2">
            <CheckIcon />

            <h1 class="text-2xl font-semibold md:text-4xl">
              Thank you for your purchase!
            </h1>
            <p class="py-2 text-secondary">Item(s) will be shipped soon</p>
            <RouterLink to="/">
              <SfButton> Continue shopping </SfButton>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <template v-else>
      <div
        v-if="cart.length === 0"
        class="mt-10 flex w-full flex-col items-center p-10"
      >
        <SfIconShoppingCart size="2xl" class="mx-auto text-primary-700" />
        <div class="mt-3">Cart is empty</div>
      </div>

      <div
        v-else
        class="mb-10 mt-5 block max-w-[1100px] grid-cols-12 gap-4 min-[900px]:grid"
      >
        <ul class="col-span-6 space-y-4 lg:col-span-8">
          <CartProduct
            :cartItem="item"
            v-for="item in cart"
            :key="item.product.id"
          />
        </ul>

        <CartSummary
          class="col-span-6 max-[900px]:mt-5 lg:col-span-4"
          @purchased="onPurchaseSuccess"
        />
      </div>
    </template>
  </div>
</template>
