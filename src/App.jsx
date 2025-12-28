import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from "./config/RouterConfig"
import Loading from "./components/Loading"
import CartDrawer from "./components/CartDrawer"

function App() {
  const [toggleCart, setToggleCart] = useState(false)

  const openCart = () => {
    setToggleCart(!toggleCart)
  }

  return (
    <div>
      <PageContainer>
        <Header openCart={openCart} />
        <RouterConfig />
        <Loading />
        <CartDrawer toggleCart={toggleCart} openCart={openCart} />
      </PageContainer>
    </div >
  )
}

export default App
