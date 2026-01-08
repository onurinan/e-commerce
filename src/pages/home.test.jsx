import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from './Home';

vi.mock('../components/ProductList', () => ({
    default: () => <div data-testid="mock-product-list">Product List Component</div>
}));

describe('Home Page', () => {
    it('should render the Home page container', () => {
        const { container } = render(<Home />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it('should render the ProductList component inside the Home page', () => {
        render(<Home />);

        const productList = screen.getByTestId('mock-product-list');

        expect(productList).toBeInTheDocument();
        expect(productList).toHaveTextContent('Product List Component');
    });
});