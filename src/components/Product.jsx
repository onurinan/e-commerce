import React from 'react'
import { Link } from "react-router-dom"
import "../css/product.css"

const Product = ({ product }) => {
    const { id, description, image, price, title } = product

    return (
        <div className="card">
            <img className="image" src={image} alt="product image" />
            <div>
                <p className="card-title">{title}</p>
                <h3>{price}₺</h3>
            </div>
            <div className="flex-row">
                <Link to={`/product-details/${id}`} className="card-button">Ürün Detayı</Link>
            </div>
        </div>
    )
}

export default Product
