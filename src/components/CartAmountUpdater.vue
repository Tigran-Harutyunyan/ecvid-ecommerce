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

const handelKeyUp = (evt: KeyboardEvent) => {
  let charCode = evt.which ? evt.which : evt.keyCode;

  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
  }
};

const onBlur = (evt: KeyboardEvent) => {
  const target = <HTMLInputElement>evt.target;
  debouncedFn(target.value);
};
</script>

<template>
  <SfInput
    size="sm"
    aria-label="Label size sm"
    :model-value="amount"
    type="number"
    @keyup="handelKeyUp"
    @blur="onBlur"
    class="max-w-[60px] min-w-[60px]"
  />
</template>
