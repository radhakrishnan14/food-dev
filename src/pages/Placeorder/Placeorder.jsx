import React, { useContext, useState,useEffect } from 'react'
import './Placeorder.css'
import Footer from '../../components/Footer/Footer';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Storecontext } from '../../context/Storecontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets';
import {toast} from 'react-toastify'
const Placeorder = () => {
  const{getTotalcartamount,token,food_list,cartitems,url,setCartitems}=useContext(Storecontext)
  const navigate=useNavigate()
  const [method,setMethod]=useState('cod')
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pincode:"",
    country:"",
    phone:""
  })
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  useEffect(()=>{
    console.log(data);
},[data])

const initpay=(order)=>{

  if (!window.Razorpay) {
    console.error("Razorpay SDK not loaded.");
    return;
  }
  
  const options={
    key:import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount:order.amount,
    currency:order.currency,
    name:'order payment',
    description:'order payment',
    order_id:order.id,
    receipt:order.receipt,
    handler:async(response)=>{
      console.log(response);
      try {
        const {data}=await axios.post(url+'/api/order/verifyRazorpay',response,{headers:{token}})
        if (data.success) {
          toast.success("Order Placed Successfully!!")
          navigate('/myorders')
          setCartitems({})
        }
        else{
          navigate("/")
        }
      } catch (error) {
        console.log(error)

      }
      
    }
  }
  const rzp=new window.Razorpay(options)
  rzp.open()
}

const placeOrder =async (event)=>{
  event.preventDefault();
  console.log("food_list:", food_list);
  console.log("cartItems:", cartitems);
  try {
    let orderItems=[];
    food_list.map((item)=>{
    if(cartitems[item._id] && cartitems[item._id]>0){
      let itemInfo = { ...item, quantity: cartitems[item._id] };
      orderItems.push(itemInfo)
    }
  })
  console.log("orderitems:",orderItems)

  let orderData={
  address:data,
  items:orderItems,
  amount:getTotalcartamount()+20,
  }
switch (method) {
  // api calls for COD
  case 'cod':
    const response=await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    console.log(response.data)
    if(response.data.success){
      toast.success("Order Placed Successfully!!")
      setCartitems({})
      navigate('/myorders')
    
    }else{
      toast.error(response.data.message)
    }
    break;

    //api calls for RAZORPAY
    case 'razorpay':
      const responseRazorpay=await axios.post(url+"/api/order/razorpay",orderData,{headers:{token}})
      if (responseRazorpay.data.success) {
      initpay(responseRazorpay.data.order)
      }
    break;

  default:
    break;
}
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}
 useEffect(()=>{
    if (!token ) {
      navigate("/cart")
    }
    else if(getTotalcartamount===0){
      navigate('/cart')
    }
 },[token])

  return (
    <>
    <Container>
    <form onSubmit={placeOrder} className='place-order'>
    <Row>
    <Col  xs={5} > 
      <div className="place-order-left">
       <h1>DELIVERY INFORMATION</h1>
       <div className="info-details">
       <Row>
        <Col><Form.Control name='firstName' onChange={onChangeHandler} value={data.firstName} type='name' placeholder="First name" required /></Col>
        <Col><Form.Control name='lastName' onChange={onChangeHandler} value={data.lastName} type='name' placeholder="Last name" required /></Col>
       </Row>
       <Form.Control name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" required />
       <Form.Control name='street' onChange={onChangeHandler} value={data.street} type='name' placeholder="Street" required />
      <Row>
        <Col><Form.Control name='city' onChange={onChangeHandler} value={data.city} type='name' placeholder="City" required /></Col>
        <Col><Form.Control name='state' onChange={onChangeHandler} value={data.state} type='name' placeholder="State" required /></Col>
      </Row>
      <Row>
        <Col><Form.Control name='pincode' onChange={onChangeHandler} value={data.pincode} type='name' placeholder="Pin code" required /></Col>
        <Col><Form.Control name='country' onChange={onChangeHandler} value={data.country} type='name' placeholder="Country" required /></Col>
      </Row>
       <Form.Control name='phone' onChange={onChangeHandler} value={data.phone} type='name' placeholder="Phone" required />
      </div></div>
      </Col>
      <Col xs={1}></Col>
      <Col  xs={5} >

      <div className="place-order-right">
      <div className="cartbottom">
        <div className="cart-total">
          <h2>CART TOTAL</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalcartamount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>₹{getTotalcartamount()===0?0:20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalcartamount()===0?0:getTotalcartamount()+20}</b>
            </div>
          </div>
          <div>
            <h4>PAYMENT METHOD</h4>
            <div className='payment-method' >
              <div className='payment-method1' onClick={()=>setMethod('razorpay')}>
                <p className={` payment-method2 ${method==='razorpay'?'bg-success':'' }`}></p>
                <img src={assets.razorpay_icon} alt="" />
              </div>
              <div className="payment-method1"  onClick={()=>setMethod('cod')} >
                <p className={` payment-method2 ${method==='cod'?'bg-success':'' }`}></p>
                <p>CASH ON DELIVERY</p>
              </div>
            </div>
          </div>
          <Button type='submit' >
              PROCEED TO PAYMENT
          </Button>
          </div>
          </div>

      </div>
      </Col>
      </Row>
    </form>
    </Container>
    
    <Footer />
    </>
    
  )
}

export default Placeorder
