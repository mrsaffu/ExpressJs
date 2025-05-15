import React, { useContext, useState } from 'react'
// import "./css/Login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function OTP({user}) {

    let [verifyOtp,setverifyOtp]=useState({username:user,otp:""})
    let {loginUser}=useContext(AuthContext)

    let navigateToHome=useNavigate()

 
    let changeForm=({target:{name,value}})=>
    {
        setverifyOtp({...verifyOtp,[name]:value})
    }

    const addpopup = (message) => toast(message);

    let otpVerify=async (e)=>
    {
        e.preventDefault();
       try
       {
        let emp=await axios.post("http://localhost:5000/api/emp/verifyotp",verifyOtp);
        localStorage.setItem("token", emp.data.token)
        addpopup(emp.data.message);
        
        loginUser();
        navigateToHome("/")

        
       }
       catch(err)
       {
        console.log(err)
       }
    }
  return (
    <>
    <ToastContainer />
    <form onSubmit={otpVerify} className='add-emp'>
        <div className="inp">
            <input type="text" name='otp' placeholder='OTP' onChange={changeForm}/>
        </div>
       
        <div className="btn">
            <button type=''>Verify</button>
        </div>
        
    </form>
    </>
  )
}

export default OTP
