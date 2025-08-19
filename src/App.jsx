import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ProductDetail from './components/ProductDetail'
import ProductList from './components/ProductList'
import AddProduct from './components/AddProduct'
import Login from './components/Login'
import Cart from './components/Cart'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path="/home" element={<Home/>}/>
      <Route path="/productDetail/:id" element={<ProductDetail/>}/>
      <Route path="/productList" element={<ProductList/>}/>
      <Route path="/addProduct" element={<AddProduct/>}/>
      <Route path="/cart" element={<Cart/>}/>
    </Routes>
  )
}

export default App