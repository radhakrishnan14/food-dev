import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
export const Storecontext=createContext(null)

const StorecontextProvider=(props)=>{
    const [cartitems, setCartitems]=useState({})
    const url= "http://localhost:4000";
    const RAZORPAY_KEY_ID="rzp_test_Fgylu18ljwEmlf"
    const [token,setToken]=useState("")
    const [food_list,setFood_list]=useState([])
    const [search,setSearch]=useState([])
    const [showSearch,setShowSearch]=useState(false)
    const addtocart= async(itemId)=>{
        if(!cartitems[itemId]){
            setCartitems((prev)=>({...prev,[itemId]:1}))
            toast.success("Items Added To Cart")
        }
        else{
            setCartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removefromcart=async(itemId)=>{
        setCartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        toast.success("Items Removed From Cart")
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const loadCartData=async(token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartitems(response.data.cartData)
    }
    const getTotalcartamount =()=>{
        let totalAmount=0
        for (const item in cartitems) {
            if (cartitems[item]>0) {
               let iteminfo=food_list.find((product)=>product._id===item) 
                totalAmount +=iteminfo.price * cartitems[item]
            }
        }
        return totalAmount
    }
    const fetchFoodList=async()=>{
        const response=await axios.get(url+"/api/food/list")
        setFood_list(response.data.data)
    }

    
    useEffect(()=>{
        
        async function loadData() {
            await fetchFoodList()
            if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            await loadCartData(localStorage.getItem("token"))
        }    
        }
        loadData()
    },[])

    const contextValue={
food_list,
cartitems,
setCartitems,
addtocart,
removefromcart,
getTotalcartamount,
url,
token,
setToken,
RAZORPAY_KEY_ID,
search,
setSearch,
showSearch,
setShowSearch
    }

return(
    <Storecontext.Provider value={contextValue}>
        {props.children}
    </Storecontext.Provider>
)
}

export default StorecontextProvider