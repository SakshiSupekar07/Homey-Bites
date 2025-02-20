import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { doLogout, isLoggedIn } from '../Auth';
import { GiHamburgerMenu } from "react-icons/gi";
import shopping_cart from '/shopping_cart.png';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [login, setLogin] = useState(false)

  useEffect(() => {
    setLogin(isLoggedIn())
    console.log("logged innnn")
  }, [login])



  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const logOut = () => {
    doLogout(() => {
      setLogin(false)
      navigate('/login')
    })
  }

  const handleToggle = () => {
    setShowMenu(!showMenu);
    console.log(showMenu)
  }

  return (
    <div className='navbar'>
      <Link to='/'>  <img src={assets.homeybites} alt="" className="logo" /></Link>
      <nav className={showMenu ? "nav-mobile" : "nav-web"}>
        <ul className="navbar-menu">
          <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
          <Link to='/menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</Link>
          {/* <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>   */}
          <a href='#' onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>About</a>
          <a href='#Footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
          {
            login && (
              <>
                <a href='#' onClick={() => setMenu("profile")} className={menu === "profile" ? "active" : ""}>Profile</a>
                <Link to='/login' onClick={logOut}>Logout</Link>
                <Link to='/cart' onClick={() => setMenu("cart")} className={menu === "cart" ? "active" : ""}>
                  <img className='shopping_cart' src={assets.shopping_cart} alt="" />
                </Link>

              </>
            )
          }

          {
            !login && (
              <Link to='/login' onClick={() => setMenu("login")} className={menu === "login" ? "active" : ""}>Login</Link>
            )
          }
        </ul>
      </nav>
      <div className='ham-menu'>
        <button onClick={handleToggle}>
          <GiHamburgerMenu></GiHamburgerMenu>
        </button>
      </div>
    </div>
  )
}

export default Navbar
