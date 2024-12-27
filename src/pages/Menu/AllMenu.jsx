import React, { useContext, useEffect, useState } from 'react'
import './AllMenu.css'
import { Storecontext } from '../../context/Storecontext'
import Fooditem from '../../components/Fooditem/Fooditem'
import { assets } from '../../assets/assets'

const AllMenu = () => {
    const {food_list,search,showSearch} =useContext(Storecontext)
    const [filterProducts,setFilterProducts]=useState([])
    const [category,setCategory]=useState([])
    const [subCategory,setSubCategory]=useState([])
    const [sortType,setSortType]=useState('relavent')
    const [showFilter, setShowFilter] = useState(false); 
    const [type,setType]=useState([])

    const toggleCategory=(e)=>{
        if (category.includes(e.target.value)) {
            setCategory(prev=> prev.filter(item=> item!==e.target.value))
        }
        else{
            setCategory(prev=>[...prev,e.target.value])
        }
    }
    
    const toggleSubCategory=(e)=>{
        if (type.includes(e.target.value)) {
            setType(prev=> prev.filter(item=> item!==e.target.value))
        }
        else{
            setType(prev=>[...prev,e.target.value])
        }
    }

    const applyFilter=()=>{
      let foodCopy = [...food_list];
        if(showSearch && search){
          foodCopy = foodCopy.filter((item) => item.name.toLowerCase().includes(search));
        }
        if (category.length>0) {
            foodCopy=foodCopy.filter(item=> category.includes(item.category))  
        }
        if (type.length>0) {
            foodCopy=foodCopy.filter(item=> type.includes(item.type))  
        }
        setFilterProducts(foodCopy)
    }
    const sortProduct = (foodCopy) => {
      let sortedProducts = [...foodCopy]; // Use a spread operator for a shallow copy
  
      switch (sortType) {
          case 'low-high':
              sortedProducts.sort((a, b) => a.price - b.price);
              console.log("Sorted Low to High:", sortedProducts);
              break;
          case 'high-low':
              sortedProducts.sort((a, b) => b.price - a.price);
              console.log("Sorted High to Low:", sortedProducts);
              break;
          default:
              // For "relevant", just retain the filtered order
              console.log("Sorting not applied. Default filtered products:", sortedProducts);
              break;
      }
      return sortedProducts;
  };

    useEffect(()=>{
applyFilter()
    },[category,type,search,showSearch,food_list])

    useEffect(() => {
      // Apply filter first, then sort
      let filteredProducts = [...filterProducts];
      if (filterProducts.length === 0) {
          filteredProducts = food_list; // Ensure fallback
      }
      console.log("SortType changed:", sortType);
      const sortedProducts = sortProduct(filteredProducts);
      setFilterProducts(sortedProducts);
  }, [sortType]);

  return (
    <>
     <div className="menu-container">
      {/* Filters Section */}
      
      <div className="filter-container"><h1 className="all-collections-title1">ALL COLLECTIONS</h1>
        <div className="filter-header">
          <p className="filter-title" onClick={()=>setShowFilter(!showFilter)}>FILTERS
            <img className={`filter-dropdown ${showFilter?"filter-dropdown1":""} `}src={assets.dropdown_icon} alt="" />
          </p>
        </div>

        {/* Category Filter */}
        <div className={`filtersection ${showFilter?'':"hidden"} `}>
        <div className="filter-section">
          <p className="filter-subtitle">TYPE</p>
          <div className="filter-options">
            <label>
              <input type="checkbox" value="veg" onChange={toggleSubCategory} /> veg
            </label>
            <label>
              <input type="checkbox" value="non veg" onChange={toggleSubCategory} /> non veg
            </label>
          </div>
        </div>

        <div className="filter-section">
          <p className="filter-subtitle">CATEGORIES</p>
          <div className="filter-options">
            <label>
              <input type="checkbox" value="Biriyani" onChange={toggleCategory}/> Biriyani
            </label>
            <label>
              <input type="checkbox" value="Pizza" onChange={toggleCategory}/> Pizza
            </label>
            <label>
              <input type="checkbox" value="Fried Rice" onChange={toggleCategory}/> Fried Rice
            </label>
            <label>
              <input type="checkbox" value="Burger" onChange={toggleCategory}/> Burger
            </label>
            <label>
              <input type="checkbox" value="Dosa" onChange={toggleCategory}/> Dosa
            </label>
            <label>
              <input type="checkbox" value="Paratha" onChange={toggleCategory}/> Paratha
            </label>
            <label>
              <input type="checkbox" value="Momos" onChange={toggleCategory}/> Momos
            </label>
            <label>
              <input type="checkbox" value="Veg Meals" onChange={toggleCategory}/> Veg Meals
            </label>
            <label>
              <input type="checkbox" value="Ice Cream" onChange={toggleCategory}/> Ice Cream
            </label>
            <label>
              <input type="checkbox" value="Chaats" onChange={toggleCategory}/> Chaats
            </label>
            <label>
              <input type="checkbox" value="Soup" onChange={toggleCategory}/> Soup
            </label>
            <label>
              <input type="checkbox" value="Rolls" onChange={toggleCategory} /> Rolls
            </label>
            <label>
              <input type="checkbox" value="Deserts" onChange={toggleCategory} /> Deserts
            </label>
            <label>
              <input type="checkbox" value="Sandwich" onChange={toggleCategory} />Sandwich
            </label>
            <label>
              <input type="checkbox" value="Cake" onChange={toggleCategory} />Cake
            </label>
            <label>
              <input type="checkbox" value="Pasta" onChange={toggleCategory} /> Pasta
            </label>
            <label>
              <input type="checkbox" value="Noodles" onChange={toggleCategory} /> Noodles
            </label>
          </div>
        </div>

        {/* Type Filter */}
        </div>
      </div>
    {/* middle Section */}
    <div className='middle'> 
        <div className=' middle1'>
     <h1 className="all-collections-title">ALL COLLECTIONS</h1>
     <div className="sort-container">
        <div className="sort-dropdown">
          <select id="sort" className="sort-select" onChange={(e)=>setSortType(e.target.value)}>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
      </div>
      </div>

     <div className="food-display-list">
     {console.log("Rendering food items:", filterProducts)}
        {filterProducts.map((item,index)=>{
                return(
                    <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} type={item.type}/>
                )
            
        })}
      </div> 
     </div>   
    </div>

    </>
  )
}

export default AllMenu   