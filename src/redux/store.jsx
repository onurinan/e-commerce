import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../redux/slices/ProductSlice"
import appReducer from "../redux/slices/appSlice"
import cartReducer from "./slices/cartSlice"

export const store = configureStore({
    reducer: {
        app: appReducer,
        product: productReducer,
        cart: cartReducer,
    },
})