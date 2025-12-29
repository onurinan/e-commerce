import React from 'react'
import Drawer from '@mui/material/Drawer';
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux"
import "../css/cartDrawer.css"
import { setDrawer } from "../redux/slices/cartSlice";

const CartDrawer = () => {
    const { products, drawer } = useSelector((store) => store.cart)
    const dispatch = useDispatch()

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
                                <button className="cart-items__deletebutton">Sil</button>
                            </div>
                        )
                    })
                }
            </>
        </Drawer>
    )
}

export default CartDrawer
