import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PageContainer from '../container/PageContainer';

describe('PageContainer Component', () => {
    it('should render children passed to it', () => {
        const testChild = <div data-testid="child-element">Hello World</div>;

        render(
            <PageContainer>
                {testChild}
            </PageContainer>
        );

        const element = screen.getByTestId('child-element');
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent('Hello World');
    });

    it('should render the Material UI Container wrapper', () => {
        const { container } = render(
            <PageContainer>
                <span>Content</span>
            </PageContainer>
        );

        const muiContainer = container.firstChild;
        expect(muiContainer).toHaveClass('MuiContainer-root');
        expect(muiContainer).toHaveClass('MuiContainer-maxWidthLg');
    });
});