import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { doLogout, isLoggedIn } from '../Auth';
import { GiHamburgerMenu } from "react-icons/gi";
import { useCart } from  '../../pages/Cart/cartcontext';
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart(); 

  const [profileOpen, setProfileOpen] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(isLoggedIn());
  }, [login]);

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
      setLogin(false);
      navigate('/login');
    });
  };

  const handleToggle = () => {
    setShowMenu(!showMenu);
    console.log(showMenu);
  };

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.homeybites} alt="" className="logo" />
      </Link>

      <nav className={showMenu ? "nav-mobile" : "nav-web"}>
        <ul className="navbar-menu">
          <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
          <Link to='/menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</Link>
          <a href='#' onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>About</a>
          <Link to='/subscription' onClick={() => setMenu("subscription")} className={menu === "subscription" ? "active" : ""}>Subscription</Link>

          {
            login && (
              <>
                <a href='#' onClick={() => setProfileOpen(!profileOpen)} className={menu === "profile-drop" ? "active" : ""}>Profile ▼</a>
                <div className='dropdown'>
                  {
                    profileOpen && (
                      <div id='profile-dropdown' className='dropdown-menu'>
                        <ul>
                          <li><a href='#' onClick={() => setMenu("profile")} className={menu === "profile" ? "active" : ""}>Profile</a></li>
                          <li><a href='#' onClick={() => setMenu("orders")} className={menu === "orders" ? "active" : ""}>My orders</a></li>
                          <li><Link to='/login' onClick={logOut}>Logout</Link></li>
                        </ul>
                      </div>
                    )
                  }
                </div>
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

      {/* Dynamic Cart Button */}
      <div className='shopping_cart' onClick={() => navigate('/cart')} >
                {login && (
          <>
            <img src={assets.shopping_cart} alt="" />
            { <span className='cart-count'>{cartCount}</span>}
          </>
        )}
      </div>

      <div className='ham-menu'>
        <button onClick={handleToggle}>
          <GiHamburgerMenu />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
