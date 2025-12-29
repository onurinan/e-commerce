import viteLogo from '/vite.svg'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from "./config/RouterConfig"
import Loading from "./components/Loading"
import CartDrawer from "./components/CartDrawer"

function App() {
  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <CartDrawer />
      </PageContainer>
    </div >
  )
}

export default App
