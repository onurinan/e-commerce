import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Product from '../components/Product';

describe('Product Component with Link', () => {
    const mockProduct = {
        id: 55,
        title: 'Gaming Mouse',
        price: 750,
        image: 'mouse.jpg',
        description: 'RGB high-performance mouse'
    };

    const renderWithRouter = (ui) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    it('should render product data correctly', () => {
        renderWithRouter(<Product product={mockProduct} />);

        expect(screen.getByText('Gaming Mouse')).toBeInTheDocument();
        expect(screen.getByText('750₺')).toBeInTheDocument();
        expect(screen.getByAltText('product image')).toHaveAttribute('src', 'mouse.jpg');
    });

    it('should have a link with the correct URL to product details', () => {
        renderWithRouter(<Product product={mockProduct} />);

        const linkElement = screen.getByRole('link', { name: /ürün detayı/i });

        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/product-details/55');
    });

    it('should apply the "card-button" class to the Link component', () => {
        renderWithRouter(<Product product={mockProduct} />);

        const linkElement = screen.getByRole('link', { name: /ürün detayı/i });
        expect(linkElement).toHaveClass('card-button');
    });
});