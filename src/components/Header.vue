<script lang="ts" setup>
import CartButton from "./CartButton.vue";
import Logo from "@/components/Logo.vue";
import CategoriesDropdown from "@/components/CategoriesDropdown.vue";
</script>

<template>
  <header
    class="fixed z-10 flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-primary-700 border-b border-neutral-200"
  >
    <div
      class="flex flex-wrap lg:flex-nowrap items-center flex-row justify-start h-full max-w-[1536px] w-full"
    >
      <Logo />

      <CategoriesDropdown class="mr-5" />

      <nav class="flex-1 flex justify-end lg:order-last lg:ml-4">
        <div class="flex flex-row flex-nowrap">
          <CartButton />
        </div>
      </nav>
    </div>
  </header>
</template>
