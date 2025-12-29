import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const getCartFromStorage = () => {
    if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart"))
    }
    return []
}

const initialState = {
    products: getCartFromStorage(),
    drawer: false,
    totalAmount: 0
}

const writeFromCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const findedProduct = state.products?.find((product) => product.id === action.payload.id)
            if (findedProduct) {
                // already added some items to the cart
                const extractedProducts = state.products.filter((product) => product.id != action.payload.id)
                findedProduct.count += action.payload.count
                state.products = [...extractedProducts, findedProduct]
                writeFromCartToStorage(state.products)
            } else {
                state.products = [...state.products, action.payload]
                writeFromCartToStorage(state.products)
            }
        },
        setDrawer: (state) => {
            state.drawer = !state.drawer
        },
        calculateTotalAmount: (state) => {
            state.totalAmount = 0
            state.products?.map((product) => {
                state.totalAmount += product.price * product.count
            })
        },
        deleteFromCart: (state, action) => {
            const extractedProducts = state.products?.filter((product) => product.id !== action.payload)
            state.products = [...extractedProducts]
            writeFromCartToStorage(state.products)
        }
    },
})

export const { addToCart, setDrawer, calculateTotalAmount, deleteFromCart } = cartSlice.actions

export default cartSlice.reducer