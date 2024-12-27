import React, { useState } from 'react'
import Navbar from './components/Header/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Loginpopup from './components/Loginpopup/Loginpopup';
import Header1 from './components/Header1/Header1';
import Verify from './pages/verify/verify';
import MyOrders from './pages/MyOrders/MyOrders';
import SearchBar from './components/Search/SearchBar';
import AllMenu from './pages/Menu/AllMenu';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showlogin,setShowlogin] =useState(false)
  return (
    <>
    {showlogin?<Loginpopup setShowlogin={setShowlogin}/>:<></>}
    <div className='app'>
      <ToastContainer />
      <Navbar setShowlogin={setShowlogin} />
      <SearchBar />
      <Routes>
        <Route  path='/' element={<Home  />} />
        <Route path='/allmenu' element={<AllMenu />} />
        <Route  path='/cart' element={<Cart />} />
        <Route  path='/order' element={<Placeorder />} />
        <Route path='/verify' element={<Verify />}/>
        <Route path='/myorders' element={<MyOrders />} />
      </Routes>
    </div>
    </>
    
  )
}

export default App
