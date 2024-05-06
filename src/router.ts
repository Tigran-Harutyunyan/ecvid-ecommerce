import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import CartPage from "@/pages/CartPage.vue";
import CategoryPage from '@/pages/CategoryPage.vue';
import NotFound from '@/pages/404.vue';

const routes = [
  { path: "/", component: HomePage },
  { name: "product", path: "/product/:id", component: ProductPage },
  { name: "cart", path: "/shopping-cart", component: CartPage },
  { name: "category", path: "/category/:categoryID", component: CategoryPage },
  { path: "/:notFound", component: NotFound },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      el: "body",
      behavior: "smooth",
    };
  },
});

export default router;
