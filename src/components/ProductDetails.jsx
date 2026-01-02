import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedProduct } from "../redux/slices/ProductSlice"
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import "../css/ProductDetails.css"
import { addToCart, calculateTotalAmount } from "../redux/slices/cartSlice";

const ProductDetails = () => {
    const { id } = useParams()
    const { products, selectedProduct } = useSelector((store) => store.product)
    const { description, image, price, title } = selectedProduct

    const [count, setCount] = useState(1)

    const dispatch = useDispatch()

    useEffect(() => {
        getProductById()
    }, [dispatch])

    const getProductById = () => {
        products?.find((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product))
            }
        })
    }

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const addToCartItems = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count: count
        }
        dispatch(addToCart(payload))
        dispatch(calculateTotalAmount())
    }

    return (
        <div className="product-details flex-row">
            <div className="product-details__imagewrapper">
                <img className="product-details__image" src={image} alt="product image" />
            </div>
            <div className="product-details__content">
                <h2>
                    {title}
                </h2>
                <p>
                    {description}
                </p>
                <h2>{price}₺</h2>

                <div className="product-details__iconswrapper">
                    <CiCirclePlus className="product-details__icons" onClick={increment} />
                    <p className="product-details__count">{count}</p>
                    <CiCircleMinus className={`product-details__icons ${count === 1 ? 'disabled-icon' : ''}`} onClick={decrement} />
                </div>

                <div className="product-details__buttonwrapper">
                    <button onClick={addToCartItems} className="product-details__button">Sepete Ekle</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails