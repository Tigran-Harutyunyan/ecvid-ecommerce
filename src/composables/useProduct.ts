import { type Product } from "@/types";
import { computed } from 'vue';

export const useProduct = (product: Product) => {

    const hasRequiredOption = computed(() => {
        return !!product.options.some(item => item.required)
    });

    return {
        hasRequiredOption: hasRequiredOption.value
    }
}
