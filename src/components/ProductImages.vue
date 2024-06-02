<script lang="ts" setup>
import { ref } from "vue";
import {
  SfScrollable,
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  type SfScrollableOnDragEndData,
} from "@storefront-ui/vue";
import { unrefElement, useIntersectionObserver } from "@vueuse/core";
import { watch, type ComponentPublicInstance } from "vue";

interface Props {
  images: {
    imageUrl: string;
    thumbnailUrl: string;
  }[];
}

const { images } = defineProps<Props>();

const thumbsRef = ref<HTMLElement>();
const firstThumbRef = ref<HTMLButtonElement>();
const lastThumbRef = ref<HTMLButtonElement>();
const firstThumbVisible = ref(false);
const lastThumbVisible = ref(false);
const activeIndex = ref(0);

watch(
  thumbsRef,
  (thumbsRef) => {
    if (thumbsRef) {
      useIntersectionObserver(
        firstThumbRef,
        ([{ isIntersecting }]) => {
          firstThumbVisible.value = isIntersecting;
        },
        {
          root: unrefElement(thumbsRef),
          rootMargin: "0px",
          threshold: 1,
        },
      );
    }
  },
  { immediate: true },
);

watch(
  thumbsRef,
  (thumbsRef) => {
    if (thumbsRef) {
      useIntersectionObserver(
        lastThumbRef,
        ([{ isIntersecting }]) => {
          lastThumbVisible.value = isIntersecting;
        },
        {
          root: unrefElement(thumbsRef),
          rootMargin: "0px",
          threshold: 1,
        },
      );
    }
  },
  { immediate: true },
);

const onDragged = (event: SfScrollableOnDragEndData) => {
  if (event.swipeRight && activeIndex.value > 0) {
    activeIndex.value -= 1;
  } else if (event.swipeLeft && activeIndex.value < images.length - 1) {
    activeIndex.value += 1;
  }
};

const assignRef = (
  el: Element | ComponentPublicInstance | null,
  index: number,
) => {
  if (!el) return;
  if (index === images.length - 1) {
    lastThumbRef.value = el as HTMLButtonElement;
  } else if (index === 0) {
    firstThumbRef.value = el as HTMLButtonElement;
  }
};
</script>

<template>
  <div class="relative flex aspect-[4/3] max-h-[600px] w-full">
    <SfScrollable
      v-if="images.length > 1"
      ref="thumbsRef"
      class="w-full items-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      direction="vertical"
      :active-index="activeIndex"
      :previous-disabled="activeIndex === 0"
      :next-disabled="activeIndex === images.length - 1"
      buttons-placement="floating"
    >
      <template #previousButton="defaultProps">
        <SfButton
          v-if="!firstThumbVisible"
          v-bind="defaultProps"
          :disabled="activeIndex === 0"
          class="absolute top-4 z-10 rotate-90 !rounded-full bg-white"
          variant="secondary"
          size="sm"
          square
        >
          <SfIconChevronLeft size="sm" />
        </SfButton>
      </template>
      <button
        v-for="({ thumbnailUrl }, index) in images"
        :key="`${index}-thumbnail`"
        :ref="(el) => assignRef(el, index)"
        type="button"
        :aria-current="activeIndex === index"
        :class="`border-1 relative mx-4 shrink-0 flex-grow cursor-pointer snap-start border p-0.5 transition-colors focus-visible:outline focus-visible:outline-offset md:h-auto md:w-[78px] md:flex-grow-0 ${
          activeIndex === index ? 'border-primary-700' : 'border-transparent'
        }`"
        @mouseover="activeIndex = index"
        @focus="activeIndex = index"
      >
        <img width="78" height="78" :src="thumbnailUrl" />
      </button>
      <template #nextButton="defaultProps">
        <SfButton
          v-if="!lastThumbVisible"
          v-bind="defaultProps"
          :disabled="activeIndex === images.length"
          class="absolute bottom-0 z-10 rotate-90 !rounded-full bg-white"
          variant="secondary"
          size="sm"
          square
        >
          <SfIconChevronRight size="sm" />
        </SfButton>
      </template>
    </SfScrollable>
    <SfScrollable
      class="h-full w-full snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      :active-index="activeIndex"
      direction="vertical"
      wrapper-class="h-full m-auto"
      is-active-index-centered
      buttons-placement="none"
      :drag="{ containerWidth: true }"
      @on-drag-end="onDragged"
    >
      <div
        v-for="({ imageUrl }, index) in images"
        :key="index"
        class="flex h-full shrink-0 grow basis-full snap-center justify-center"
      >
        <img
          :aria-hidden="activeIndex !== index"
          class="h-full w-auto object-cover"
          :src="imageUrl"
        />
      </div>
    </SfScrollable>
  </div>
</template>
