import React, { useContext, useEffect, useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Storecontext } from '../../context/Storecontext';
import axios from "axios"
import { toast } from 'react-toastify'
const Loginpopup = ({setShowlogin}) => {

   const{url,setToken}=useContext(Storecontext)
    const[currstate,setCurrstate]=useState("Sign Up")
    const [isEmailSent,setIsEmailSent]=useState("")
    
    const [data,setData]=useState({
      name:"",
      email:"",
      password:"",
    })

    const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    useEffect(()=>{
      console.log(data);
  },[data])

  const onLogin=async(event)=>{
    event.preventDefault();
     let newUrl=url
     if(currstate==="Login"){
      newUrl+="/api/user/login"
     }
     else if(currstate==="Reset Password"){
       newUrl+="/api/user/send-reset-otp"
     }
     else{
      newUrl+="/api/user/register"
     }

     try {
      const response =await axios.post(newUrl,data)
      if (response.data.success) {
        if (currstate === "Reset Password") {
          toast.success(response.data.message)
          setIsEmailSent(true); // Set to true when OTP is sent successfully
        } else {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowlogin(false); // Close the login popup on successful login/signup
          toast.success("Logged In Successfully")
        }
      } else {
        toast.error(response.data.message) // Show error message if any
      }
     }
     catch (error) {
      console.error("Error in onLogin:", error);
    toast.error("Something went wrong. Please try again.");
     }
  }

  const onSubmitOtp=async (e)=>{
    e.preventDefault();
    const otpArray=inputRefs.current.map(e=> e.value)
    const otpString = otpArray.join('');
    const newPassword = data.password;
    try {
      const response =await axios.post(url+'/api/user/reset-password',{email:data.email,otp:otpString,newPassword})
      if (response.data.success) {
        toast.success(response.data.message);
        setCurrstate('Login'); // Switch to login state on success
        setIsEmailSent(false); // Reset email sent state
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error in onSubmitOtp:', error);
      toast.error('Something went wrong. Please try again.');
    }
  }

  const inputRefs=React.useRef([])
  const handleInput=(e,index)=>{
    if (e.target.value.length >0 && index <inputRefs.current.length-1) {
      inputRefs.current[index+1].focus()
    }
  }
  const handleKeyDown=(e,index)=>{
    if (e.key==='Backspace' && e.target.value==='' && index>0) {
      inputRefs.current[index-1].focus()
    }
  }
  const handlePaste=(e)=>{
    const paste =e.clipboardData.getData('text')
    const pasteArray=paste.split('')
    pasteArray.forEach((char,index)=>{
      if (inputRefs.current[index]) {
        inputRefs.current[index.value]=char
      }
    })
  }
  return (
    <div className='login-popup'>
      {!isEmailSent &&
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{currstate}</h2>
            <img onClick={()=>setShowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currstate==="Reset Password"?<p>Enter your Registered Email Address</p>:<></>}
            {currstate==="Sign Up"?<Form.Control name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required className='inputs'/>:<></>}
            <Form.Control name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" required className='inputs'/>
            {currstate==="Sign Up" || currstate==="Login"? <Form.Control name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' className='inputs' />:<></>}
            {currstate==="Login"?<p className='forgot' onClick={()=>setCurrstate("Reset Password")} >Forgot your password?</p>:<></>}
        </div>
        {currstate==="Sign Up" || currstate==="Login"? <Button type='submit' size="lg">
        {currstate==="Sign Up"?"Create Account":"Login"}
        </Button>:<></>}
        {currstate==="Reset Password"?<Button type='submit' size="lg">Verify Email</Button>:<></>}
        

        <div className="login-popup-condition">
        {currstate==="Sign Up"?<Form.Check 
            type="checkbox" label="By continuing ,I agree to the terms of use& privacy policy." required
          />:<></>}
        </div>
        {
            currstate==="Login"
            ?<p>Create new account? <span onClick={()=>setCurrstate("Sign Up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrstate("Login")}>Login here</span></p>
        }
        

      </form>
}

{ isEmailSent &&
      <form onSubmit={onSubmitOtp} className='login-popup-container'>
      <div className="login-popup-title">
            <h2>Reset Password</h2>
            <img onClick={()=>setShowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            <p>Enter the 6-digit code sent to your Email Id</p>
            <div onPaste={handlePaste} className='otp'>
              {Array(6).fill(0).map((_,index)=>(
                <input type="text" maxLength='1' key={index} required ref={e=>inputRefs.current[index]=e} onInput={(e)=>handleInput(e,index)} onKeyDown={(e)=>handleKeyDown(e,index)} className='otp-input' />
              ))}
            </div>
            <p>Enter the new password</p>
            <Form.Control name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='New Password' className='inputs' /> 
        </div>
         <Button type='submit' size="lg">Submit</Button>

      </form>}
    </div>
  )
}

export default Loginpopup
