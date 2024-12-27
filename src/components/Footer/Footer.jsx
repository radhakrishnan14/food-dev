import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <>
    <div className='topfooter' id='top-footer'>
      <div className="footer-top-content">
        <h1>For Better Experience Download Tomoto App</h1>
        <img className='img1' src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>

      <div className="footer" id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>At Tomato, we are passionate about bringing fresh and delicious meals straight to your doorstep. From local favorites to international cuisines, our platform connects you with the best restaurants in your area. Fast delivery, easy ordering, and unbeatable taste – that's our promise!</p>
          <div className="footer-social-icons">
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
          <img src={assets.linkedin_icon} alt="" />
          </div>
          
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-9876543210</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 @tomato.com -All Rights Reserved</p>
    </div>
    </>
  )
}

export default Footer
