import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../redux/slices/ProductSlice"
import appReducer from "../redux/slices/appSlice"
import basketReducer from "../redux/slices/basketSlice"

export const store = configureStore({
    reducer: {
        app: appReducer,
        product: productReducer,
        basket: basketReducer,
    },
})