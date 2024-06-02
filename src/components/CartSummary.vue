<script lang="ts" setup>
import { ref, computed } from "vue";
import Card from "@/components/Card.vue";
import { SfButton, SfInput, SfLoaderCircular } from "@storefront-ui/vue";
import { useNotifications } from "@/composables/useNotifications";
import { storeToRefs } from "pinia";
import { useCart } from "@/stores/cart";

const { showSuccess, showError } = useNotifications();

const emit = defineEmits(["purchased"]);

const { totalPrice, totalItems } = storeToRefs(useCart());
const { clearCart } = useCart();

const DEMO_CODE = "VSF2020";
const inputValue = ref(DEMO_CODE);
const promoCode = ref(0);
const total = computed(() => totalPrice.value + promoCode.value);
const isLoading = ref(false);

const checkPromoCode = () => {
  if (
    (promoCode.value === -100 &&
      inputValue.value.toUpperCase() === DEMO_CODE) ||
    !inputValue.value
  )
    return;
  if (inputValue.value.toUpperCase() === DEMO_CODE) {
    promoCode.value = -100;
    showSuccess({
      text: "Applied promo code ",
    });
  } else {
    showError({
      title: " ",
      text: "Incorrect promo code",
    });
  }
};

const removePromoCode = () => {
  promoCode.value = 0;
  showSuccess({
    text: "Removed promo code ",
  });
};

const formatPrice = (price: number) => {
  // This should be dynamic, based on locale
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
    window.scroll({ top: 0, behavior: "smooth" });
  }, 1000);
};
</script>

<template>
  <div>
    <Card>
      <div
        class="flex items-end justify-between bg-neutral-100 px-4 py-2 md:bg-transparent md:px-6 md:pb-4 md:pt-6"
      >
        <p class="font-bold typography-headline-4 md:typography-headline-3">
          Order Summary
        </p>
        <p class="font-medium typography-text-base">
          (Items: {{ totalItems }})
        </p>
      </div>
      <div class="mt-3 px-4 pb-4 md:mt-0 md:px-6 md:pb-6">
        <div class="flex justify-between pb-4 typography-text-base">
          <div class="flex grow flex-col pr-2">
            <p>Items Subtotal</p>
            <p class="text-neutral-500 typography-text-xs">Original Price</p>
          </div>
          <div class="flex flex-col text-right">
            <p>{{ formatPrice(total) }}</p>
            <p class="text-neutral-500 typography-text-xs">
              {{ formatPrice(totalPrice) }}
            </p>
          </div>
        </div>
        <div
          v-if="promoCode"
          class="mb-5 flex items-center border-y border-neutral-200 py-5"
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
          class="mb-4 flex gap-x-2 border-y border-neutral-200 py-4"
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
          class="mb-4 flex justify-between border-b border-neutral-200 pb-4 font-bold text-primary-700 typography-headline-4 md:typography-headline-3"
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
