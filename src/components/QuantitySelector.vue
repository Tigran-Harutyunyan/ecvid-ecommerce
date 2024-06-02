<script lang="ts" setup>
import { ref } from "vue";
import { clamp } from "@storefront-ui/shared";
import { useCounter } from "@vueuse/core";
import { SfButton, SfIconAdd, SfIconRemove, useId } from "@storefront-ui/vue";

const emit = defineEmits(["update"]);
interface Props {
  min?: number;
  max?: number;
}
const { min, max } = withDefaults(defineProps<Props>(), {
  min: 1,
  max: 999,
});

const showStock = ref(false);
const inputId = useId();

const { count, inc, dec, set } = useCounter(1, {
  min: min,
  max: max,
});

const handleOnChange = (event: Event) => {
  const currentValue = (event.target as HTMLInputElement)?.value;
  const nextValue = parseFloat(currentValue);
  set(clamp(nextValue, min, max));
};

const onDecrement = () => {
  dec();
  emit("update", count.value);
};

const onIncrement = () => {
  inc();
  emit("update", count.value);
};
</script>

<template>
  <div class="inline-flex flex-col items-center">
    <div class="flex rounded-md border border-neutral-300">
      <SfButton
        variant="tertiary"
        :disabled="count <= min"
        square
        class="rounded-r-none"
        :aria-controls="inputId"
        aria-label="Decrease value"
        @click="onDecrement()"
      >
        <SfIconRemove />
      </SfButton>
      <input
        :id="inputId"
        v-model="count"
        type="number"
        readonly
        class="[&::-webkit-inner-spin-button]:display-none [&::-webkit-outer-spin-button]:display-none mx-2 w-8 appearance-none bg-transparent text-center font-medium [-moz-appearance:textfield] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-offset disabled:placeholder-disabled-900 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        :min="min"
        :max="max"
        @input="handleOnChange"
      />
      <SfButton
        variant="tertiary"
        :disabled="count >= max"
        square
        class="rounded-l-none"
        :aria-controls="inputId"
        aria-label="Increase value"
        @click="onIncrement()"
      >
        <SfIconAdd />
      </SfButton>
    </div>
    <p class="mt-2 text-xs text-neutral-500" v-if="showStock">
      <strong class="text-neutral-900">{{ max }}</strong> in stock
    </p>
  </div>
</template>
