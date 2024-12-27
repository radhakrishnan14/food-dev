import React, { useContext, useEffect, useState } from 'react'
import './SearchBar.css'
import { Storecontext } from '../../context/Storecontext'
import { assets } from '../../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {

    const {search,setSearch,showSearch,setShowSearch}=useContext(Storecontext)
    const location=useLocation()
    const [visible,setVisible]=useState(false)

    useEffect(()=>{
      if(location.pathname.includes('allmenu')){
        setVisible(true)
      }
      else{
        setVisible(false)
      }
    },[location])

  return showSearch && visible ? (
    <div className='search-body'>
    <div className='searchbar text-center'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text"  placeholder='Search' className='searchbar2'/>
        <img src={assets.search_icon} alt="" className='search-btn' />
    </div>
    <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} alt="" className='clear-btn' />
    </div>
  ):null
}

export default SearchBar
