import React from 'react'
import { useNavigate } from "react-router-dom"
import "../css/product.css"

const Product = ({ product }) => {
    const { id, description, image, price, title } = product

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/product-details/${id}`)
    }

    return (
        <div className="card">
            <img className="image" src={image} alt="product image" />
            <div>
                <p className="card-title">{title}</p>
                <h3>{price}₺</h3>
            </div>
            <div className="flex-row">
                <button onClick={handleNavigate} className="card-button">Ürün Detayı</button>
            </div>
        </div>
    )
}

export default Product
