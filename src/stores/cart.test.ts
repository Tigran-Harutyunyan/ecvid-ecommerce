import { describe, expect, it, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCart } from './cart';

describe('Cart Store Test', () => {
    let store: ReturnType<typeof useCart> | null = null;

    beforeEach(() => {
        // create a fresh Pinia instance and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())

        // create an instance of the data store
        store = useCart()
    })

    it('should add a new product to the cart when it does not exist', () => {
        const product = { id: 1, name: 'Product 1', price: 100 };
        const count = 2;
        store?.addToCart(product, count);
        expect(store?.cart).toEqual([{ product, amount: count }]);
    });

    it('should handle adding a product with a count of zero', () => {
        const product = { id: 2, name: 'Product 2', price: 200 };
        const count = 0;
        store?.addToCart(product, count);
        expect(store?.cart).toEqual([{ product, amount: 0 }]);
    });

    it('should remove a product from the cart when the product ID exists', () => {

        if (!store?.cart) return

        const cartProduct = { product: { id: 1, price: 100 }, amount: 2 };
        store.cart = [cartProduct];

        store?.removeFromCart(1);

        expect(store?.cart).toEqual([]);
    });

    it('should not change the cart when the product ID does not exist', () => {
        if (!store?.cart) return

        const cartProduct = { product: { id: 1, price: 100 }, amount: 2 };
        store.cart = [cartProduct];

        store?.removeFromCart(2);

        expect(store?.cart).toEqual([cartProduct]);
    });

    it('should empty the cart when it contains multiple items', () => {
        if (!store?.cart) return

        store.cart = [
            { product: { id: 1, name: 'Product 1', price: 10 }, amount: 2 },
            { product: { id: 2, name: 'Product 2', price: 20 }, amount: 1 }
        ];
        store.clearCart();
        expect(store.cart).toEqual([]);
    });

    it('should do nothing when the cart is already empty', () => {
        if (!store?.cart) return
        store.cart = [];
        store.clearCart();
        expect(store.cart).toEqual([]);
    });

    it('should update the amount of an existing product in the cart when the product exists', () => {
        const productID = 1;
        const newAmount = 3;
        const cartProduct = { product: { id: productID, price: 100 }, amount: 1 };

        if (!store?.cart) return
        store.cart = [cartProduct];

        store.updateCartItem(productID, newAmount);

        expect(store.cart[0].amount).toBe(newAmount);
    });
})