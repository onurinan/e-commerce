import React, { useState } from 'react'
import "../css/header.css"
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slices/cartSlice";
import { getProductBySearch } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [theme, setTheme] = useState(false)
    const { products } = useSelector((store) => store.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const changeTheme = () => {
        setTheme(!theme)
    }

    const handleSearch = (e) => {
        dispatch(getProductBySearch(e.target.value))
    }

    const navigateToHome = () => {
        navigate("/")
    }

    return (
        <div className="header-wrapper">
            <div onClick={navigateToHome} className="header-logo flex-row">
                <img className="logo" src="../src/images/logo.png" alt="logo" />
                <p>Onur A.S.</p>
            </div>
            <div className="flex-row">
                <input onChange={handleSearch} className="search-input" placeholder="ara" type="text" name="searh" id="search" />
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
