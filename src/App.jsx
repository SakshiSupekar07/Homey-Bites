import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/home'
import Cart from './pages/Cart/cart'


import Placeorder from './pages/placeorder/placeorder'
import Footer from './components/Footer/Footer'
import Login from './components/login-signup/Login'
import SignUp from './components/login-signup/SignUp'
import { ToastContainer } from 'react-toastify'
import VerifyOtp from './components/login-signup/VerifyOtp'
import ForgetPassword from './components/login-signup/forgetpassword'
import Menu from './pages/Menu/Menu'
import MenuItem from './pages/MenuItem/MenuItem'
import ResetPassword from './components/login-signup/ResetPassword'
import Subscription from './pages/Subscription/subscription'



const App = () => {
  return (

    <>
      <div className='app'>
         <Navbar /> 
          <ToastContainer position='top-center' className="custom-toast-container" />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/order' element={<Placeorder/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/verify-otp' element={<VerifyOtp />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
            <Route path='/resetpassword' element={<ResetPassword />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/menu/item' element={<MenuItem/>} />
            <Route path='/subscription' element={<Subscription/>} />
            
           
          </Routes>
        {/* <Footer/> */}
      </div>







    </>
  )


}

export default App
