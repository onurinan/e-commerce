import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('NotFound Component', () => {

    it('should render the "Page Not Found" text', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    });

    it('should navigate to home ("/") when the heading is clicked', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        const heading = screen.getByRole('heading', { name: /page not found/i });

        fireEvent.click(heading);

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('should have the correct CSS class for styling', () => {
        const { container } = render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass('not-found__content');

        const heading = screen.getByRole('heading');
        expect(heading).toHaveClass('not-found');
    });
});