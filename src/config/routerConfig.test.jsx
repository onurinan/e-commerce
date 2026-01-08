import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import RouterConfig from './RouterConfig';

vi.mock('../pages/Home', () => ({
    default: () => <div data-testid="home-page">Home Page</div>
}));

vi.mock('../components/ProductDetails', () => ({
    default: () => <div data-testid="product-details-page">Product Details</div>
}));

vi.mock('../components/NotFound', () => ({
    default: () => <div data-testid="not-found-page">Not Found</div>
}));

describe('RouterConfig Integration', () => {

    it('should render Home page when path is "/"', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <RouterConfig />
            </MemoryRouter>
        );

        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });

    it('should render ProductDetails page when path is "/product-details/:id"', () => {
        render(
            <MemoryRouter initialEntries={['/product-details/1']}>
                <RouterConfig />
            </MemoryRouter>
        );

        expect(screen.getByTestId('product-details-page')).toBeInTheDocument();
    });

    it('should render NotFound page for any invalid route', () => {
        render(
            <MemoryRouter initialEntries={['/wrong-path']}>
                <RouterConfig />
            </MemoryRouter>
        );

        expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    });
});