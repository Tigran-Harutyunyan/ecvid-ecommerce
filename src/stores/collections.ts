// Not persisted collection map for preloading purposes to improve the UI experience.

import { defineStore } from "pinia";
import { type Product } from "@/types";
import { type Category } from "@/types";

type ProductsPayload = {
    id: string,
    items: Product[]
}

type ProductPayload = {
    id: string,
    item: Product
}

type CategoryPayload = {
    id: string,
    item: Category
}


export const useCollections = defineStore("collections", () => {
    const productsMap = new Map();
    const productMap = new Map();
    const categoryMap = new Map();

    const setProductList = ({ id, items }: ProductsPayload) => {
        productsMap.set(id, items);
    };

    const getProductList = (id: string) => {
        return productsMap.get(id)
    };

    const setProduct = ({ id, item }: ProductPayload) => {
        productMap.set(id, item);
    };

    const getProduct = (id: string) => {
        return productMap.get(id)
    };

    const setCategory = ({ id, item }: CategoryPayload) => {
        categoryMap.set(id, item);
    };

    const getCategory = (id: string) => {
        return categoryMap.get(id)
    };

    return {
        setProductList,
        getProductList,
        setProduct,
        getProduct,
        setCategory,
        getCategory
    };
});