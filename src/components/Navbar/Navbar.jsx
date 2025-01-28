import React, { useState } from 'react'
import '../Navbar.css'
 import {assets} from '../../assets/assets'
 import searchIcon from '../../assets/search_icon.png';
import {Link} from 'react-router-dom';


const Navbar =({setShowLogin})=> {
  const[menu,setMenu]=useState("menu");
  return (
    <div className='navbar'> 
    <img src={assets.homeybites} alt="" className="logo"/>
    <ul className="navbar-menu">
    <Link  to='/'onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
    <a  href='#explore-menu'onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
    <a href='#about us' onClick={()=>setMenu("about")} className={menu==="about"?"active":""}>About</a>
    <a  href='#Footer' onClick={()=>setMenu("contact-us")}className={menu==="contact-us"?"active":""}>Contact Us</a>
    </ul>
    <div className="navbar-right">
    <img src={assets.search_icon} alt="" />
    <div className="navbar-search-icon">
      
    <button onClick={()=>setShowLogin(true)}>Sign In</button>

    </div>
    </div>
      
    </div>
  )
}

export default Navbar
