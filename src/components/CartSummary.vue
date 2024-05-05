<script lang="ts" setup>
import { ref, computed } from "vue";
import Card from "@/components/Card.vue";
import { SfButton, SfInput, SfLoaderCircular } from "@storefront-ui/vue";
import { notify } from "@kyvg/vue3-notification";
import { storeToRefs } from "pinia";
import { useCart } from "@/stores/cart";

const emit = defineEmits(["purchased"]);

const { totalPrice, totalItems } = storeToRefs(useCart());
const { clearCart } = useCart();

const inputValue = ref("VSF2020");
const promoCode = ref(0);
const total = computed(() => totalPrice.value + promoCode.value);
const isLoading = ref(false);

const checkPromoCode = () => {
  if (
    (promoCode.value === -100 &&
      inputValue.value.toUpperCase() === "VSF2020") ||
    !inputValue.value
  )
    return;
  if (inputValue.value.toUpperCase() === "VSF2020") {
    promoCode.value = -100;
    notify({
      type: "success",
      text: "Applied promo code ",
    });
  } else {
    notify({
      type: "error",
      text: "Incorrect promo code",
    });
  }
};

const removePromoCode = () => {
  promoCode.value = 0;
  notify({
    type: "success",
    text: "Removed promo code ",
  });
};

const formatPrice = (price: number) => {
  // This should be dynamic, based on  locale
  return new Intl.NumberFormat("ru", {
    style: "currency",
    currency: "RUB",
  }).format(price);
};

const pay = () => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    emit("purchased");
    clearCart();
  }, 1000);
};
</script>

<template>
  <div>
    <Card>
      <div
        class="flex justify-between items-end bg-neutral-100 md:bg-transparent py-2 px-4 md:px-6 md:pt-6 md:pb-4"
      >
        <p class="typography-headline-4 font-bold md:typography-headline-3">
          Order Summary
        </p>
        <p class="typography-text-base font-medium">
          (Items: {{ totalItems }})
        </p>
      </div>
      <div class="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
        <div class="flex justify-between typography-text-base pb-4">
          <div class="flex flex-col grow pr-2">
            <p>Items Subtotal</p>
            <p class="typography-text-xs text-neutral-500">Original Price</p>
          </div>
          <div class="flex flex-col text-right">
            <p>{{ formatPrice(total) }}</p>
            <p class="typography-text-xs text-neutral-500">
              {{ formatPrice(totalPrice) }}
            </p>
          </div>
        </div>
        <div
          v-if="promoCode"
          class="flex items-center mb-5 py-5 border-y border-neutral-200"
        >
          <p>PromoCode</p>
          <SfButton
            size="sm"
            variant="tertiary"
            class="ml-auto mr-2"
            @click="removePromoCode"
            >Remove</SfButton
          >
          <p>{{ formatPrice(promoCode) }}</p>
        </div>
        <form
          v-else
          class="flex gap-x-2 py-4 border-y border-neutral-200 mb-4"
          @submit.prevent="checkPromoCode"
        >
          <SfInput
            v-model="inputValue"
            placeholder="Enter Promo Code"
            wrapper-class="grow"
          />
          <SfButton type="submit" variant="secondary">Apply</SfButton>
        </form>

        <div
          class="flex justify-between typography-headline-4 md:typography-headline-3 font-bold pb-4 mb-4 border-b text-primary-700 border-neutral-200"
        >
          <p>Total</p>
          <p>{{ formatPrice(total) }}</p>
        </div>

        <SfButton size="lg" class="w-full" @click="pay()">
          <SfLoaderCircular size="xs" v-if="isLoading" />
          {{ isLoading ? "Precessing..." : "Place Order And Pay" }}
        </SfButton>
      </div>
    </Card>
  </div>
</template>
