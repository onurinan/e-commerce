import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from "./config/RouterConfig"
import Loading from "./components/Loading"
import Drawer from '@mui/material/Drawer';
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux"

function App() {
  const [toggleCart, setToggleCart] = useState(false)
  const { products } = useSelector((store) => store.cart)

  const openCart = () => {
    setToggleCart(!toggleCart)
  }

  return (
    <div>
      <PageContainer>
        <Header openCart={openCart} />
        <RouterConfig />
        <Loading />
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
      </PageContainer>
    </div >
  )
}

export default App
