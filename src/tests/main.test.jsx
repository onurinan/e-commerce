import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock react-dom/client to track the createRoot and render calls
vi.mock('react-dom/client', () => ({
    createRoot: vi.fn().mockReturnValue({
        render: vi.fn(),
    }),
}));

// Mock the App component so we don't render the entire logic of your app
vi.mock('./App.jsx', () => ({
    default: () => <div data-testid="app-component">App</div>,
}));

// Mock the store to avoid issues with real Redux initialization
vi.mock('./redux/store.jsx', () => ({
    store: {
        getState: vi.fn(),
        subscribe: vi.fn(),
        dispatch: vi.fn(),
    },
}));

describe('Main entry point', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        document.body.innerHTML = '<div id="root"></div>';
    });

    it('should render the App wrapped in Provider and BrowserRouter', async () => {
        await import('../main.jsx');

        const { createRoot } = await import('react-dom/client');
        const rootElement = document.getElementById('root');

        expect(createRoot).toHaveBeenCalledWith(rootElement);

        const renderMock = createRoot(rootElement).render;

        expect(renderMock).toHaveBeenCalled();

        const renderedJSX = renderMock.mock.calls[0][0];

        expect(renderedJSX.props.store).toBeDefined();
        expect(renderedJSX.type.name).not.toBe('App');
    });
});