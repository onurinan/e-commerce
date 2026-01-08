import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import productReducer, {
    setSelectedProduct,
    getProductBySearch,
    getAllProducts,
    getProductByIDFromAPI
} from '../redux/slices/productSlice';

vi.mock('axios');

describe('productSlice', () => {
    const initialState = {
        products: [],
        filteredProducts: [],
        selectedProduct: {},
        loading: false
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    // --- Synchronous Reducer Tests ---

    it('should handle setSelectedProduct', () => {
        const product = { id: 1, title: 'Laptop' };
        const state = productReducer(initialState, setSelectedProduct(product));
        expect(state.selectedProduct).toEqual(product);
    });

    it('should handle getProductBySearch', () => {
        const stateWithProducts = {
            ...initialState,
            products: [
                { id: 1, title: 'Apple iPhone' },
                { id: 2, title: 'Samsung Galaxy' }
            ]
        };

        const state = productReducer(stateWithProducts, getProductBySearch('apple'));

        expect(state.filteredProducts).toHaveLength(1);
        expect(state.filteredProducts[0].title).toBe('Apple iPhone');
    });

    // --- Async Thunk / ExtraReducers Tests ---

    it('should set loading to true when getAllProducts is pending', () => {
        const action = { type: getAllProducts.pending.type };
        const state = productReducer(initialState, action);
        expect(state.loading).toBe(true);
    });

    it('should update products and loading when getAllProducts is fulfilled', () => {
        const mockProducts = [
            { id: 1, title: 'Product 1' },
            { id: 2, title: 'Product 2' }
        ];

        const action = {
            type: getAllProducts.fulfilled.type,
            payload: mockProducts
        };

        const state = productReducer({ ...initialState, loading: true }, action);

        expect(state.loading).toBe(false);
        expect(state.products).toEqual(mockProducts);
        expect(state.filteredProducts).toEqual(mockProducts);
    });

    it('should set selectedProduct when getProductByIDFromAPI is fulfilled', () => {
        const mockProduct = { id: 5, title: 'Specific Item' };
        const action = {
            type: getProductByIDFromAPI.fulfilled.type,
            payload: mockProduct
        };

        const state = productReducer({ ...initialState, loading: true }, action);

        expect(state.loading).toBe(false);
        expect(state.selectedProduct).toEqual(mockProduct);
    });
});