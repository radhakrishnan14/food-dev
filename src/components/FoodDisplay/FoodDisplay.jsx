import React, { useContext, useEffect, useState } from 'react'
import './FoodDisplay.css'
import { Storecontext } from '../../context/Storecontext'
import Fooditem from '../Fooditem/Fooditem'

const FoodDisplay = ({category}) => {
    const {food_list} =useContext(Storecontext)
    const [topFoods,setTopFoods]=useState([])
    useEffect(()=>{
      const filteredTopFoods = food_list.slice(0, 53).filter((_, index) => [0, 2, 4,5,6,8,9,11,12,13,15,17,19,21,23,25,27,29,30,34,35,37,40,41,42,46,49,51].includes(index));
      setTopFoods(filteredTopFoods);
    },[topFoods])
  return (
    <div className='food-display' id='food-display'>
      <h2>TOP DISHES NEAR YOU</h2>
      <div className="food-display-list">
        {topFoods.map((item,index)=>{
            if(category==="All" ||category===item.category){
                return(
                  <>
                    <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} type={item.type} subCategory={item.subCategory} /></>
                )
            }
            
        })}
      </div>
    </div>
  )
}

export default FoodDisplay 