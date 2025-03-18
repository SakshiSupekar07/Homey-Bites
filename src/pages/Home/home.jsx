import React, { useEffect, useState } from 'react'
import './home.css'
import Header from '../../components/Header/Header'
import Fooddisplay from '../../components/Fooddisplay/Fooddisplay'
import About from '../../components/About us/About';
import Base from '../../components/Base/Base'

const home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className="home" id='home'> 
      <Base>
        <Header />
        <Fooddisplay />
        <div>
          <About />
        </div>
      </Base>
    </div>
  );
};

export default home
