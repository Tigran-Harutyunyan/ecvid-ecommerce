<script setup lang="ts">
import { SfButton } from "@storefront-ui/vue";
</script>

<template>
  <div class="flex justify-center my-10">
    <div class="w-100 text-secondary text-center">
      <h2 class="mb-3">Page Not Found 🕵🏻‍♀️</h2>
      <RouterLink to="/">
        <SfButton> Home </SfButton>
      </RouterLink>
      <img src="/404.svg" alt="Error page" class="img-fluid" />
    </div>
  </div>
</template>
