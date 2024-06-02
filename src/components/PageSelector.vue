<script lang="ts" setup>
import { ref, onMounted, type Ref } from "vue";
import { unrefElement } from "@vueuse/core";
// @ts-ignore
import { numbersPerPage } from "@/lib/constants";
import {
  useDropdown,
  useDisclosure,
  SfIconExpandMore,
  SfListItem,
  SfIconCheck,
  useId,
  useTrapFocus,
} from "@storefront-ui/vue";

const emit = defineEmits(["change"]);

const { pageSize } = defineProps<{ pageSize: string | number }>();

type SelectOption = {
  label: string;
  value: number;
};

const options: SelectOption[] = numbersPerPage;

const { close, toggle, isOpen } = useDisclosure({ initialValue: false });
const selectedOption = ref<SelectOption>();
const id = useId();
const listboxId = `select-dropdown-${id}`;
const selectTriggerRef = ref<HTMLDivElement>();

const {
  referenceRef,
  floatingRef,
  style: dropdownStyle,
} = useDropdown({
  isOpen,
  onClose: close,
});

useTrapFocus(floatingRef as Ref<HTMLUListElement>, {
  arrowKeysUpDown: true,
  activeState: isOpen,
  initialFocusContainerFallback: true,
});

const selectOption = (option: SelectOption) => {
  selectedOption.value = option;
  close();
  unrefElement(selectTriggerRef as Ref<HTMLDivElement>)?.focus();
  emit("change", option.value);
};

onMounted(() => {
  if (pageSize) {
    const foundIndex: number | undefined = options.findIndex(
      (item) => item.value === pageSize,
    );

    if (foundIndex !== undefined) {
      selectedOption.value = options.at(foundIndex);
    }
  }
});
</script>

<template>
  <div ref="referenceRef" class="relative">
    <div
      :id="id"
      ref="selectTriggerRef"
      role="combobox"
      :aria-controls="listboxId"
      :aria-expanded="isOpen"
      aria-label="Select one option"
      :aria-activedescendant="
        selectedOption ? `${listboxId}-${selectedOption.value}` : undefined
      "
      class="relative mt-0.5 flex cursor-pointer items-center gap-8 rounded-md px-4 py-2 font-normal ring-1 ring-inset ring-neutral-300 typography-text-base hover:ring-primary-700 focus:ring-2 focus:ring-primary-700 focus-visible:outline focus-visible:outline-offset active:ring-2 active:ring-primary-700"
      tabindex="0"
      @keydown.space="toggle()"
      @click="toggle()"
    >
      <template v-if="selectedOption">{{ selectedOption.label }}</template>
      <SfIconExpandMore
        class="ml-auto text-neutral-500 transition-transform duration-300 ease-in-out"
        :class="{ 'rotate-180': isOpen }"
      />
    </div>
    <ul
      v-show="isOpen"
      :id="listboxId"
      ref="floatingRef"
      role="listbox"
      aria-label="Select one option"
      class="z-10 w-full rounded-md border border-neutral-100 bg-white py-2 shadow-md"
      :style="dropdownStyle"
    >
      <SfListItem
        v-for="option in options"
        :id="`${listboxId}-${option.value}`"
        :key="option.value"
        role="option"
        tabindex="0"
        :aria-selected="option.value === selectedOption?.value"
        class="block"
        :class="{ 'font-medium': option.value === selectedOption?.value }"
        @click="selectOption(option)"
        @keydown.enter="selectOption(option)"
        @keydown.space="selectOption(option)"
      >
        {{ option.label }}
        <template #suffix>
          <SfIconCheck
            v-if="option.value === selectedOption?.value"
            class="text-primary-700"
          />
        </template>
      </SfListItem>
    </ul>
  </div>
</template>
