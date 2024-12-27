import React, { useContext, useState,} from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'
import { Storecontext } from '../../context/Storecontext'
const Fooditem = ({id,name,price,description,image,type,subCategory}) => {
    const {cartitems, addtocart, removefromcart,url,food_list}=useContext(Storecontext)
  return (
    <>
    <div className='food-item'>
        <div className="food-item-image-container">
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            {!cartitems[id]?
            <img className='add' onClick={()=>addtocart(id)} src={assets.add_icon_white} />:
            <div className='food-item-counter'>
                <img onClick={()=>removefromcart(id)} src={assets.remove_icon_red} />
                <p>{cartitems[id]}</p>
                <img onClick={()=>addtocart(id)} src={assets.add_icon_green} />
            </div>

            }
        </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <img src={(type==="veg")?assets.Veg_symbol:assets.Non_veg_symbol} alt="" className='veg-logo'/>
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className='name1'>{name}</p>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
    <hr />
    </>
  )
}

export default Fooditem
