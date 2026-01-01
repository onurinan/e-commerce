import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts, getProductBySearch } from "../redux/slices/ProductSlice"
import Product from "./Product"
import "../css/productList.css"

const ProductList = () => {
    const dispatch = useDispatch()
    const { filteredProducts } = useSelector((store) => store.product)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    return (
        <div className="flex-row product-list">
            {
                filteredProducts.length == 0 ? <h3>Product Not Found</h3> : filteredProducts?.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            }
        </div>
    )
}

export default ProductList
