import React,{useState} from 'react'
import './home.css'
import Header from '../../components/Header/Header'
import Fooddisplay from '../../components/Fooddisplay/Fooddisplay'
import About from '../../components/About us/About';



const home = () => {
  const [category,setCategory]=useState("All");
  return (
    <div>
        <Header/>
        <Fooddisplay category={category}/>
        <About/>
    </div>
  );
};

export default home
