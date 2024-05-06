import { defineStore } from "pinia";
import { ref } from 'vue';
import { type Categories } from "@/types";

export const useMain = defineStore("main", () => {
    const categories = ref<Categories[]>([]);

    const setCategories = (data: Categories[]) => {
        categories.value = data;
    };
    return {
        setCategories,
        categories,
    };
}, {
    persist: true
});