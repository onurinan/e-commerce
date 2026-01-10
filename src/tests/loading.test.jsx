import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Loading from '../components/Loading';

describe('Loading Component', () => {
    const createMockStore = (loadingValue) => {
        return configureStore({
            reducer: {
                product: () => ({ loading: loadingValue })
            }
        });
    };

    it('should render the loader when loading is true', () => {
        const store = createMockStore(true);

        render(
            <Provider store={store}>
                <Loading />
            </Provider>
        );

        const loader = document.querySelector('.loader');
        expect(loader).toBeInTheDocument();
    });

    it('should NOT render the loader when loading is false', () => {
        const store = createMockStore(false);

        render(
            <Provider store={store}>
                <Loading />
            </Provider>
        );

        const loader = document.querySelector('.loader');
        expect(loader).not.toBeInTheDocument();
    });
});