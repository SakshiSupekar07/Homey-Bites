import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Cart from './pages/Cart/cart';
import Placeorder from './pages/placeorder/placeorder';
import Login from './components/login-signup/Login';
import SignUp from './components/login-signup/SignUp';
import { ToastContainer } from 'react-toastify';
import VerifyOtp from './components/login-signup/VerifyOtp';
import ForgetPassword from './components/login-signup/forgetpassword';
import Menu from './pages/Menu/Menu';
import MenuItem from './pages/MenuItem/MenuItem';
import ResetPassword from './components/login-signup/ResetPassword';
//import Subscription from './pages/Subscription/Subscription'; 


import { CartProvider } from './pages/Cart/cartcontext';
import { UserCartProvider } from './context/UserCartContext';
import ClipLoader from "react-spinners/ClipLoader";


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="app">
        {loading ? (  
          <div className="loader-container">
            <ClipLoader color="#ff6600" size={70} />
          </div>
        ) : (
          <UserCartProvider>
            <CartProvider>
              <Navbar />
              <ToastContainer position="top-center" className="custom-toast-container" />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Placeorder />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/item" element={<MenuItem />} />
                
                
                
             
           
              </Routes>
              {/* <Footer /> */} 
            </CartProvider>
          </UserCartProvider>
        )}
      </div>
    </>
  );
};

export default App;
