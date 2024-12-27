import React, { useContext } from 'react'
import './Cart.css'
import { Storecontext } from '../../context/Storecontext'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Footer from '../../components/Footer/Footer';
import {useNavigate} from 'react-router-dom'
const Cart = () => {
  const{cartitems,food_list,removefromcart,getTotalcartamount,url}=useContext(Storecontext)

  const navigate= useNavigate();
  return (
    <>
    <div className='cart'>
      <div className="cart-items">
        <h1>CART ITEMS</h1>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartitems[item._id]>0){
            return(
              <div>
              <div className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartitems[item._id]}</p>
                <p>₹{item.price*cartitems[item._id]}</p>
                <p onClick={()=>removefromcart(item._id)} className='cross'>X</p>
                </div>
                <hr />

              </div>
            )
          }
        })}
      </div>
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
          <Button onClick={()=>navigate('/order')} >
        PROCEED TO CHECKOUT
      </Button>
        </div>
           <div className="cart-promocode">
            <div>
              <p>If you have promo code ,Enter it here</p>
              <form >
              <div className="cart-promocode-input">
              <Form.Control type="text" placeholder='Promo Code'  />
                <Button>Submit</Button>
              </div>
              </form>
            </div>
           </div>
      </div>

      
    </div>
    <Footer />
    </>
  )
}

export default Cart
