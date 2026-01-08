import { describe, it, expect } from 'vitest';
import appReducer from '../redux/slices/appSlice';

describe('appSlice', () => {
    it('should return the initial state when passed undefined', () => {
        const initialState = { loading: false };

        const result = appReducer(undefined, { type: '@@INIT' });

        expect(result).toEqual(initialState);
    });

    it('should handle a hypothetical setLoading action', () => {
        const initialState = { loading: false };

        const action = { type: 'app/setLoading', payload: true };
    });
});