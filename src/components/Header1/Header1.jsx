import React ,{ useState } from 'react'
import './Header1.css'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
const Header1 = () => {
  const navigate=useNavigate()
  return (
    <>
    <Carousel slide={false}>
      <Carousel.Item >
      <div className='header1'>
      <div className="header-content">
        <h1>Order your favorite food here </h1>
        <p>Choose from the diverse menu featuring a delecatable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your carvings and elevate your dining experience ,one delicious meel at a time</p>
        <Button onClick={()=>navigate('/allmenu')}>Explore Now</Button>
      </div>
    </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className='header2'>
      <div className="header-content">
        <h1>Craving Something Delicious?</h1>
        <p>Discover your next favorite meal from our curated menu. Fresh, fast, and delivered right to your doorstep with just a few taps.</p>
        <Button onClick={()=>navigate('/allmenu')}>Order Now</Button>
      </div>
    </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className='header3'>
      <div className="header-content">
        <h1>Your Favorite Meals, Just a Tap Away </h1>
        <p>Hungry? Download the Tomato app and enjoy quick and easy food delivery at your fingertips. Explore a variety of dishes, track your order in real-time, and earn rewards with every purchase.</p>
        <Button>Download Now</Button>
      </div>
    </div>
      </Carousel.Item>
    </Carousel>
    </>
  )
}

export default Header1
