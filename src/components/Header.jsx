import React, { useState } from 'react'
import "../css/header.css"
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slices/cartSlice";

const Header = () => {
    const [theme, setTheme] = useState(false)
    const { products } = useSelector((store) => store.cart)
    const dispatch = useDispatch()

    const changeTheme = () => {
        setTheme(!theme)
    }

    return (
        <div className="header-wrapper">
            <div className="flex-row">
                <img className="logo" src="../src/images/logo.png" alt="logo" />
                <p>Onur A.S.</p>
            </div>
            <div className="flex-row">
                <input className="search-input" placeholder="ara" type="text" name="" id="" />
                <div className="header-icons-wrapper">
                    <Badge badgeContent={products.length} color="primary">
                        <CiShoppingBasket onClick={() => dispatch(setDrawer())} className="icons" />
                    </Badge>
                    {
                        theme ? <FaMoon onClick={changeTheme} className="icons" /> : <CiLight onClick={changeTheme} className="icons" />
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
