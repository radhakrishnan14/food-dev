import React, { useState } from 'react'
import './Home.css'
import Header1 from '../../components/Header1/Header1'
import Exploremenu from '../../components/Exploremenu/Exploremenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  const [category,setCategory]=useState("All")
  
  return (
    <>
    <div>
      <Header1 />
      <Exploremenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
    </div>
    <Footer />
    </>
    
  )
}

export default Home
