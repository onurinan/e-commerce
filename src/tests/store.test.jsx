import { describe, it, expect } from 'vitest';
import { store } from '../redux/store';

describe('Redux Store Integration', () => {

    it('should have the correct initial structure', () => {
        const state = store.getState();

        expect(state).toHaveProperty('app');
        expect(state).toHaveProperty('product');
        expect(state).toHaveProperty('cart');
    });

    it('should update the "cart" slice drawer state', () => {
        store.dispatch({ type: 'cart/setDrawer' });

        const state = store.getState();
        expect(state.cart.drawer).toBe(true);
    });

    it('should initialize the product slice with products as an array', () => {
        const state = store.getState();
        expect(Array.isArray(state.product.products)).toBe(true);
    });
});