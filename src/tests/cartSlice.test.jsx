import { describe, it, expect, vi, beforeEach } from 'vitest';
import cartReducer, {
    addToCart,
    setDrawer,
    calculateTotalAmount,
    deleteFromCart
} from '../redux/slices/cartSlice';

describe('cartSlice', () => {
    beforeEach(() => {
        vi.stubGlobal('localStorage', {
            getItem: vi.fn(),
            setItem: vi.fn(),
            clear: vi.fn(),
        });
    });

    it('should return initial state', () => {
        const initialState = { products: [], drawer: false, totalAmount: 0 };
        expect(cartReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
    });

    it('should toggle drawer state with setDrawer', () => {
        const initialState = { products: [], drawer: false, totalAmount: 0 };
        const state = cartReducer(initialState, setDrawer());
        expect(state.drawer).toBe(true);

        const falsyState = cartReducer(state, setDrawer());
        expect(falsyState.drawer).toBe(false);
    });

    it('should add a new product to the cart with addToCart', () => {
        const initialState = { products: [], drawer: false, totalAmount: 0 };
        const newProduct = { id: 1, title: 'Test Product', count: 1, price: 100 };

        const state = cartReducer(initialState, addToCart(newProduct));

        expect(state.products).toHaveLength(1);
        expect(state.products[0].id).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should increase count if product already exists in cart', () => {
        const initialState = {
            products: [{ id: 1, count: 2, price: 100 }],
            drawer: false,
            totalAmount: 0
        };
        const productToAdd = { id: 1, count: 3 };

        const state = cartReducer(initialState, addToCart(productToAdd));

        expect(state.products).toHaveLength(1);
        expect(state.products[0].count).toBe(5);
    });

    it('should remove product from cart with deleteFromCart', () => {
        const initialState = {
            products: [{ id: 1, title: 'Item 1' }, { id: 2, title: 'Item 2' }],
            drawer: false,
            totalAmount: 0
        };

        const state = cartReducer(initialState, deleteFromCart(1));

        expect(state.products).toHaveLength(1);
        expect(state.products[0].id).toBe(2);
    });

    it('should calculate total amount correctly', () => {
        const initialState = {
            products: [
                { id: 1, price: 100, count: 2 },
                { id: 2, price: 50, count: 1 }
            ],
            totalAmount: 0
        };

        const state = cartReducer(initialState, calculateTotalAmount());

        expect(state.totalAmount).toBe(250);
    });
});