<script setup lang="ts">
import { type Option } from "@/types";
import { ref } from "vue";

interface Props {
  option: Option;
}

const { option } = defineProps<Props>();

const defaultChoice = ref(option.defaultChoice);
</script>

<template>
  <ul class="flex gap-2">
    <li
      class="min-w-[60px] cursor-pointer rounded-md border border-gray-200 px-2 py-1 text-center text-sm transition-all hover:bg-primary-100"
      v-for="(item, index) in option.choices"
      :key="index"
      @click="defaultChoice = index"
      :class="[defaultChoice === index ? 'bg-primary-100' : 'bg-white']"
    >
      {{ item.text }}
    </li>
  </ul>
</template>
