import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/home'
import Cart from './pages/Cart/cart'

import Placeorder from './pages/placeorder/placeorder'
import Footer from './components/Footer/Footer'
import LoginSignup from './components/login-signup/LoginSignup'





const App = () => {
return (
  
    <>
<div className='app'>

<Routes>
          <Route path='/' element={<Navbar />} />
        </Routes>


        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Footer />} />
        </Routes>
       
    </div>
      


      
    
     

    </>
  )


}

export default App
