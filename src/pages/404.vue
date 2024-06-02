<script setup lang="ts">
import { SfButton } from "@storefront-ui/vue";
</script>

<template>
  <div class="my-10 flex justify-center">
    <div class="w-100 text-center text-secondary">
      <img src="/404.jpg" alt="Error page" class="mx-4 w-full max-w-xl" />
      <h2 class="mb-4 text-xl md:text-2xl">Page Not Found 🕵🏻‍♀️</h2>
      <RouterLink to="/">
        <SfButton> Home </SfButton>
      </RouterLink>
    </div>
  </div>
</template>
