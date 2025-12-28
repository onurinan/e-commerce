import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../redux/slices/ProductSlice"
import Product from "./Product"
import "../css/productList.css"

const ProductList = () => {
    const dispatch = useDispatch()
    const { products } = useSelector((store) => store.product)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    return (
        <div className="flex-row product-list">
            {
                products?.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            }
        </div>
    )
}

export default ProductList
