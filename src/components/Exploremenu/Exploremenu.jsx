import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/assets' 

const Exploremenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1 className='explore-menu-text'>EXPLORE OUR MENU</h1>
      <p className='explore-menu-text-p'>Choose from the diverse menu featuring a delecatable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your carvings and elevate your dining experience ,one delicious meel at a time</p>
      <div className='explore-menu-list'>
        {menu_list.map((item,index)=>{
            return(
               <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                 <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                 <p>{item.menu_name}</p>
               </div> 
            )
        })

        }
      </div>
      <hr />
    </div>
  )
}

export default Exploremenu
