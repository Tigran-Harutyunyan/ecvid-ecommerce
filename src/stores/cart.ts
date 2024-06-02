import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { type Product, CartProduct } from "@/types";
import { useNotifications } from "@/composables/useNotifications";
const { showSuccess } = useNotifications();

export const useCart = defineStore("cart", () => {
    const cart = ref<CartProduct[]>([]);
    const total = ref(0);
    const totalItems = computed(() => cart.value.reduce((acc: number, cur: CartProduct) => acc + cur.amount, 0));
    const totalPrice = computed(() => cart.value.reduce((acc: number, cur: CartProduct) => acc + cur.product.price * cur.amount, 0));

    /**
     * Adds a specified product to the shopping cart. If the product already exists in the cart, it updates the quantity.
     * Displays a success notification upon adding the product.
     * @param product - An object representing the product to be added to the cart.
     * @param count - A number representing the quantity of the product to be added.
    */

    const addToCart = (product: Product, count: number): void => {
        if (product) {
            const newItem = { product, amount: count ?? 1 };
            const cartItemIndex = cart.value.findIndex((item: CartProduct) => product.id === item.product.id);

            if (cartItemIndex !== -1) {
                const updatedCart = cart.value.map((item: CartProduct, index: number) => {
                    if (index === cartItemIndex) {
                        item.amount += count ?? 1;
                    }
                    return item;
                });
                cart.value = updatedCart;
            } else {
                cart.value = [...cart.value, newItem];
            }

            showSuccess({
                text: "Added to cart",
            });
        }
    }

    /**
     * Removes a product from the cart by its ID and shows a success notification.
     * @param id - The ID of the product to be removed from the cart.
     */
    const removeFromCart = (id: number) => {
        // Filter out the product with the specified ID
        const newCart = cart.value.filter((item: CartProduct) => item.product.id !== id);

        // Update the cart with the new filtered list
        cart.value = newCart;

        // Show a success notification
        showSuccess({
            text: "Removed from cart",
        });
    }

    /**
     * Resets the shopping cart by setting its value to an empty array.
     */
    const clearCart = () => {
        // Clear all items in the cart by setting it to an empty array 
        cart.value = [];
    };

    /**
     * Updates the quantity of a specific product in the shopping cart. If the new quantity is zero or less, the product is removed from the cart.
     * After updating the cart, a success notification is shown.
     * @param productID - The ID of the product to update.
     * @param newAmount - The new quantity for the product.
     */
    const updateCartItem = (productID: number, newAmount: number) => {

        if (newAmount <= 0) {
            cart.value = cart.value.filter((item: CartProduct) => item.product.id !== productID);
        } else {
            cart.value = cart.value.map((item: CartProduct) => ({
                ...item,
                amount: item.product.id === productID ? newAmount : item.amount
            }));
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
