import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductDetails from '../components/ProductDetails';
import productReducer from '../redux/slices/ProductSlice';
import cartReducer from '../redux/slices/cartSlice';

vi.mock('react-router-dom', () => ({
    useParams: () => ({ id: '101' }),
}));

describe('ProductDetails Component', () => {
    let store;
    const mockProduct = {
        id: '101',
        title: 'Gaming Chair',
        description: 'Very comfortable chair',
        price: 1500,
        image: 'chair.jpg'
    };

    beforeEach(() => {
        store = configureStore({
            reducer: {
                product: productReducer,
                cart: cartReducer
            },
            preloadedState: {
                product: {
                    products: [mockProduct],
                    selectedProduct: mockProduct,
                    loading: false
                }
            }
        });
        store.dispatch = vi.fn();
    });

    const renderComponent = () => render(
        <Provider store={store}>
            <ProductDetails />
        </Provider>
    );

    it('should render product details correctly from store', () => {
        renderComponent();
        expect(screen.getByText('Gaming Chair')).toBeInTheDocument();
        expect(screen.getByText(/Very comfortable chair/i)).toBeInTheDocument();
        expect(screen.getByText('1500₺')).toBeInTheDocument();
        expect(screen.getByAltText('product image')).toHaveAttribute('src', 'chair.jpg');
    });

    it('should increment and decrement the count', () => {
        renderComponent();
        const countDisplay = screen.getByText('1');
        const plusIcon = document.querySelector('.product-details__icons');

        fireEvent.click(plusIcon);
        expect(screen.getByText('2')).toBeInTheDocument();

        const minusIcon = document.querySelectorAll('.product-details__icons')[1];
        fireEvent.click(minusIcon);
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should not allow count to go below 1', () => {
        renderComponent();
        const minusIcon = document.querySelectorAll('.product-details__icons')[1];

        fireEvent.click(minusIcon);
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should dispatch addToCart and calculateTotalAmount when "Sepete Ekle" is clicked', () => {
        renderComponent();
        const addButton = screen.getByText('Sepete Ekle');

        fireEvent.click(addButton);

        expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: 'cart/addToCart'
        }));

        expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: 'cart/calculateTotalAmount'
        }));
    });
});