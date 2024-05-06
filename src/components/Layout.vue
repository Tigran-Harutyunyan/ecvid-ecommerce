<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { useAPI } from "@/composables/useAPI";
import { useMain } from "@/stores/main";
import { type Categories } from "@/types";

const { setCategories } = useMain();

const getCategories = async () => {
  const data = await useAPI("/categories");

  if (data?.items) {
    let newData = data.items as Categories[];

    newData = newData.map((item) => {
      const { id, name, productCount, imageUrl } = item;
      return {
        id,
        name,
        productCount,
        imageUrl,
        link: `/category/${id}`,
      };
    });
    setCategories(newData);
  }
};

getCategories();
</script>

<template>
  <Header />
  <main class="flex-grow max-w-screen-2xl w-full mx-auto p-6 lg:p-8 3xl:px-0">
    <slot />
  </main>
  <Footer />
</template>
