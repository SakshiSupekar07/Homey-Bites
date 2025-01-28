import React from 'react'
import   './Footer.css'
 import {assets} from '../../assets/assets';

const Footer = () => {
  return (
    < div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
            <img src={assets.homeybites} alt="Logo" className="footer-logo" />
          
             <h2> Reach Us At</h2>
                <div className="footer-social-icons">
                    
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
                 </div>
                 <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delievery</li>
                    <li>Privacy Policy</li>
  
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>9864574829</li>
                    <li>contact@homeybites.com</li>
                </ul>

            </div>
           
        </div>
        
        <hr></hr>
        <p className="footer-copyright">Copyright 2025 @All rights reserved</p>

      
    </div>
  )
}

export default Footer