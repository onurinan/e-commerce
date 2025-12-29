import React, { useEffect } from 'react'
import Drawer from '@mui/material/Drawer';
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux"
import "../css/cartDrawer.css"
import { calculateTotalAmount, deleteFromCart, setDrawer } from "../redux/slices/cartSlice";

const CartDrawer = () => {
    const { products, drawer, totalAmount } = useSelector((store) => store.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(calculateTotalAmount())
    }, [])

    return (
        <Drawer aria-hidden="false" anchor="right" open={drawer} onClose={() => dispatch(setDrawer())}>
            <>
                <IoClose onClick={() => dispatch(setDrawer())} className="close-icon" />
                {
                    products?.map((product) => {
                        return (
                            <div key={product.id} className="cart-items__wrapper">
                                <div className="cart-items-content__wrapper">
                                    <img className="cart-items__image" src={product.image} alt="cart image" />
                                    <div className="cart-items__content">
                                        <h4>{product.title}</h4>
                                        <h4>{product.price}₺</h4>
                                        <p>{product.count} Adet</p>
                                    </div>
                                </div>
                                <button value={product.id} onClick={(e) => {
                                    dispatch(deleteFromCart(e.target.value))
                                    dispatch(calculateTotalAmount())
                                }}
                                    className="cart-items__deletebutton">Sil</button>
                            </div>
                        )
                    })
                }
                <h3 className="total-amount">Total: {totalAmount}₺</h3>
            </>
        </Drawer>
    )
}

export default CartDrawer
