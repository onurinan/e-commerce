import React from 'react'
import Drawer from '@mui/material/Drawer';
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux"

const CartDrawer = ({ toggleCart, openCart }) => {
    const { products } = useSelector((store) => store.cart)

    return (
        <Drawer aria-hidden="false" anchor="right" open={toggleCart}>
            <>
                <IoClose onClick={openCart} className="close-icon" />
                {
                    products?.map((product) => {
                        return (
                            <div key={product.id} className="cart-items__wrapper">
                                <img className="cart-items__image" src={product.image} alt="cart image" />
                                <div className="cart-items__content">
                                    <h4>{product.title}</h4>
                                    <h4>{product.price}₺</h4>
                                    <p>{product.count} Adet</p>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        </Drawer>
    )
}

export default CartDrawer
