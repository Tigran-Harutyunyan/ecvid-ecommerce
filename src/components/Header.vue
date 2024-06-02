<script lang="ts" setup>
import CartButton from "./CartButton.vue";
import Logo from "@/components/Logo.vue";
import CategoriesDropdown from "@/components/CategoriesDropdown.vue";
</script>

<template>
  <header
    class="fixed z-20 flex w-full justify-center bg-primary-700 px-4 py-2 lg:px-6 lg:py-5"
  >
    <div
      class="flex h-full w-full max-w-[1536px] flex-row flex-wrap items-center justify-start lg:flex-nowrap"
    >
      <Logo />

      <CategoriesDropdown class="mr-5" />

      <nav class="flex flex-1 justify-end lg:order-last lg:ml-4">
        <div class="flex flex-row flex-nowrap">
          <CartButton />
        </div>
      </nav>
    </div>
  </header>
</template>
