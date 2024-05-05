<script lang="ts" setup>
import Layout from "./components/Layout.vue";
</script>

<template>
  <Layout>
    <RouterView />
  </Layout>

  <notifications position="bottom right" />
</template>
