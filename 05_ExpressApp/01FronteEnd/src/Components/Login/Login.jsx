import React, { useState } from 'react'
import "./Login.Module.css"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import OTP from '../OTP/OTP.Jsx';



function Login() {

    let [loginData,setloginData]=useState({username:"",password:""});
    let [showOtpForm,setshowOtpForm]=useState(false)

    console.log(loginData)
    let changeForm=({target:{name,value}})=>
    {
        setloginData({...loginData,[name]:value})
    }

    const addpopup = (message) => toast(message);

    let login=async (e)=>
    {
        e.preventDefault();
       try
       {
        let emp=await axios.post("http://localhost:5000/api/emp/loginemp",loginData);
        addpopup(emp.data.message)
        setshowOtpForm(true)
        
       }
       catch(err)
       {
        console.log(err)
       }
    }
  return (
    <div className='loginSec'>
    <ToastContainer autoClose={1000} />
    {showOtpForm && <OTP user={loginData.username}/>}
    {!showOtpForm && <form onSubmit={login} className='add-emp'>
        <div className="inp">
            <input type="text" name='username' placeholder='Username' onChange={changeForm}/>
        </div>
       
        <div className="inp">
            <input type="text" name='password' placeholder='Password' onChange={changeForm}/>
        </div>
        
        <div className="btn">
            <button type='submit'>Login</button>
        </div>
        
    </form>}
    </div>
  )
}

export default Login
