import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import cartReducer from '../redux/slices/cartSlice';
import productReducer from '../redux/slices/ProductSlice';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Header Component', () => {
    let store;

    beforeEach(() => {
        // Create a fresh store for every test
        store = configureStore({
            reducer: {
                cart: cartReducer,
                product: productReducer,
            },
            preloadedState: {
                cart: { products: [{ id: 1 }, { id: 2 }], drawer: false },
            }
        });
        store.dispatch = vi.fn(); // Mock dispatch to track calls
    });

    const renderHeader = () => {
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
    };

    it('should render the logo and brand name', () => {
        renderHeader();
        expect(screen.getByText('Onur A.S.')).toBeInTheDocument();
        expect(screen.getByAltText('logo')).toBeInTheDocument();
    });

    it('should display the correct number of products in the cart badge', () => {
        renderHeader();
        // preloaded state has 2 products
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should toggle theme icons when clicked', () => {
        renderHeader();

        const themeToggle = document.querySelector('.icons:last-child');

        fireEvent.click(themeToggle);
    });

    it('should navigate to home when clicking the logo section', () => {
        renderHeader();
        const logoSection = screen.getByText('Onur A.S.').parentElement;
        fireEvent.click(logoSection);

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('should dispatch getProductBySearch when typing in search input', () => {
        renderHeader();
        const input = screen.getByPlaceholderText('ara');

        fireEvent.change(input, { target: { value: 'laptop' } });

        expect(store.dispatch).toHaveBeenCalled();
    });

    it('should dispatch setDrawer when clicking the shopping basket', () => {
        renderHeader();

        const basketIcon = document.querySelector('.icons');
        fireEvent.click(basketIcon);

        expect(store.dispatch).toHaveBeenCalled();
    });
});