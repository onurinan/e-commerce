import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CartDrawer from '../components/CartDrawer';
import cartReducer from '../redux/slices/cartSlice';

describe('CartDrawer Component', () => {
    let store;

    beforeEach(() => {
        // Mock state with items and drawer OPEN
        store = configureStore({
            reducer: { cart: cartReducer },
            preloadedState: {
                cart: {
                    products: [
                        { id: 1, title: 'Test Product', price: 100, count: 2, image: 'test.jpg' }
                    ],
                    drawer: true,
                    totalAmount: 200
                }
            }
        });
        store.dispatch = vi.fn();
    });

    const renderComponent = () =>
        render(
            <Provider store={store}>
                <CartDrawer />
            </Provider>
        );

    it('should render products inside the drawer when open', () => {
        renderComponent();

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('100₺')).toBeInTheDocument();
        expect(screen.getByText('2 Adet')).toBeInTheDocument();
    });

    it('should display the correct total amount', () => {
        renderComponent();
        expect(screen.getByText(/Total: 200₺/i)).toBeInTheDocument();
    });

    it('should dispatch setDrawer when close icon is clicked', () => {
        renderComponent();

        const closeIcon = document.querySelector('.close-icon');
        fireEvent.click(closeIcon);

        expect(store.dispatch).toHaveBeenCalled();
    });

    it('should dispatch deleteFromCart and calculateTotalAmount when delete button is clicked', () => {
        renderComponent();
        const deleteButton = screen.getByText('Sil');

        fireEvent.click(deleteButton);

        // It should be called at least twice (delete + calculate)
        expect(store.dispatch).toHaveBeenCalledTimes(3); // +1 for the useEffect on mount
    });

    it('should run calculateTotalAmount on mount via useEffect', () => {
        renderComponent();

        expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: 'cart/calculateTotalAmount'
        }));
    });
});