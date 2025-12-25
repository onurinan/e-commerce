import React from 'react'
import "../css/loader.css";
import { useSelector } from "react-redux";

const Loading = () => {
    const { loading } = useSelector((store) => store.product)

    return (
        <>
            {
                loading ? <span className="loader" ></span > : ""
            }
        </>
    )
}

export default Loading
