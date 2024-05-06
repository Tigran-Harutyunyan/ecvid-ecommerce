import { defineStore } from "pinia";
import { ref } from 'vue';
import { type Categories } from "@/types";

export const useMain = defineStore("main", () => {
    const categories = ref<Categories[]>([]);
    const wishList = ref<number[]>([])

    const setCategories = (data: Categories[]) => {
        categories.value = data;
    };

    const toggleWishlist = (id: number) => {

        if (wishList.value.includes(id)) {
            wishList.value = wishList.value.filter(item => item !== id)
        } else {
            wishList.value.push(id)
        }
    };

    return {
        categories,
        wishList,
        setCategories,
        toggleWishlist
    };
}, {
    persist: true
});