import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock the child components to isolate App.jsx
// Replace them with simple divs so we don't have to provide Redux/Router state here
vi.mock('../components/Header', () => ({
    default: () => <div data-testid="mock-header">Header</div>
}));

vi.mock('../config/RouterConfig', () => ({
    default: () => <div data-testid="mock-router">Router Config</div>
}));

vi.mock('../components/Loading', () => ({
    default: () => <div data-testid="mock-loading">Loading</div>
}));

vi.mock('../components/CartDrawer', () => ({
    default: () => <div data-testid="mock-cart">Cart Drawer</div>
}));

vi.mock('../container/PageContainer', () => ({
    default: ({ children }) => <div data-testid="page-container">{children}</div>
}));

describe('App Component', () => {
    it('should render the layout correctly with all sub-components', () => {
        render(<App />);

        expect(screen.getByTestId('page-container')).toBeInTheDocument();

        expect(screen.getByTestId('mock-header')).toBeInTheDocument();
        expect(screen.getByTestId('mock-router')).toBeInTheDocument();
        expect(screen.getByTestId('mock-loading')).toBeInTheDocument();
        expect(screen.getByTestId('mock-cart')).toBeInTheDocument();
    });

    it('has the correct CSS class structure', () => {
        const { container } = render(<App />);

        expect(container.firstChild).toBeInTheDocument();
    });
});