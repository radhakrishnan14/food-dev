import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { Storecontext } from '../../context/Storecontext'
import axios from 'axios'
import { assets } from '../../assets/assets'
import Footer from '../../components/Footer/Footer'
const MyOrders = () => {
    const {url,token}=useContext(Storecontext)
    const [data,setData]=useState([])

    const fetchOrders=async()=>{
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(response.data.data.reverse())
    }

    useEffect(()=>{
        if(token){
            fetchOrders()
        }
    },[token])

  return (
    <>
    <div className='my-orders'>
      <h2>MY ORDERS</h2>
      <div className="container1">
        {data.map((order,index)=>{
            return(
                <div className='my-orders-order' key={index}>
                    <img src={assets.parcel_icon} alt="" />
                    <div>
                    <p className='order-name'>{order.items.map((item,index)=>{
                        if(index===order.items.length-1){
                            return item.name+" x "+item.quantity
                        }
                        else{
                            return item.name+" x "+item.quantity+" , " 
                        }
                    })}</p>
                    <p className='order-details'>Date:{new Date(order.date).toDateString()}</p>
                    <p className='order-details'>Payment:{order.paymentMethod}</p>
                    </div>
                    <p>₹{order.amount}.00</p>
                    <p>Items:{order.items.length}</p>
                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                    <button onClick={fetchOrders()}>Track Order</button>
                </div>
            )
        })}
      </div>
    </div>
    <Footer />
    </>
  )
}

export default MyOrders
