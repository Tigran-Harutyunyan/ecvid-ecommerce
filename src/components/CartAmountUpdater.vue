<script setup lang="ts">
import { SfInput } from "@storefront-ui/vue";
import { useCart } from "@/stores/cart";
import { useDebounceFn } from "@vueuse/core";

interface Props {
  amount: number;
  productId: number;
}

const { productId, amount } = defineProps<Props>();

const { updateCartItem } = useCart();

const debouncedFn = useDebounceFn((val) => {
  updateCartItem(productId, Number(val));
}, 400);

const onKeyPress = (evt) => {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
  } else {
    debouncedFn(evt.target.value);

    return true;
  }
};
</script>

<template>
  <SfInput
    size="sm"
    aria-label="Label size sm"
    :model-value="amount"
    @keyup="onKeyPress"
  />
</template>

<style lang="scss" scoped></style>
