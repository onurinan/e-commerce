import React from 'react'
import { useNavigate } from "react-router-dom"
import "../css/notFound.css"

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="not-found__content">
            <h1 className="not-found" onClick={() => navigate("/")}>Page Not Found</h1>
        </div>
    )
}

export default NotFound
