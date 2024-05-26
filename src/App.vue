<script lang="ts" setup>
import Layout from "@/components/Layout.vue";
</script>

<template>
  <Layout>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </Layout>

  <notifications position="bottom right" />
</template>
