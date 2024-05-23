<script setup lang="ts">
import { SfButton } from "@storefront-ui/vue";
</script>

<template>
  <div class="flex justify-center my-10">
    <div class="w-100 text-secondary text-center">
      <img src="/404.jpg" alt="Error page" class="max-w-xl mx-4 w-full" />
      <h2 class="mb-4 text-xl md:text-2xl">Page Not Found 🕵🏻‍♀️</h2>
      <RouterLink to="/">
        <SfButton> Home </SfButton>
      </RouterLink>
    </div>
  </div>
</template>
