import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { type Product, CartProduct } from "@/types";
import { useNotifications } from "@/composables/useNotifications";
const { showSuccess } = useNotifications();

export const useCart = defineStore("cart", () => {
    const cart = ref<CartProduct[]>([]);
    const amount = ref(0);
    const total = ref(0);
    const totalItems = computed(() => cart.value.reduce((acc, cur) => acc + cur.amount, 0));
    const totalPrice = computed(() => cart.value.reduce((acc, cur) => acc + cur.product.price * cur.amount, 0));

    const addToCart = (product: Product, count: number): void => {
        if (product) {
            const newItem = { product, amount: (count ?? 1) };
            const cartItem = cart.value.find((item: CartProduct) => product.id === item.product.id);
            if (cartItem) {
                const newCart = cart.value.map((item: CartProduct) => {
                    if (item.product.id === product.id) {

                        amount.value = item.amount + (count ?? 1);

                        return { ...item, amount: amount.value };
                    }
                    return item;
                });
                cart.value = newCart;
            } else {
                cart.value = [...cart.value, newItem];
            }

            showSuccess({
                text: "Added to cart",
            });
        }
    }

    const removeFromCart = (id: number) => {
        const newCart = cart.value.filter((item: CartProduct) => item.product.id !== id);
        cart.value = newCart;

        showSuccess({
            text: "Removed from cart",
        });
    }

    const clearCart = () => {
        cart.value = [];
    };

    const updateCartItem = (productID: number, newAmount: number) => {

        if (newAmount <= 0) {
            cart.value = cart.value.filter((item: CartProduct) => item.product.id !== productID);
        } else {
            cart.value = cart.value.map((item: CartProduct) => {
                return {
                    ...item,
                    amount: item.product.id === productID ? newAmount : item.amount
                }
            });
        }

        showSuccess({
            text: "Updated cart",
        });
    }
    return {
        cart,
        total,
        totalItems,
        totalPrice,
        updateCartItem,
        clearCart,
        addToCart,
        removeFromCart,
    };
}, {
    persist: true
}
);
