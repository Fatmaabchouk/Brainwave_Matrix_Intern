import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'




const LoginPopup = ({setShowLogin}) => {
  const [currState, setCurrState] = useState("Login");

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup_title">
          <h2> {currState}</h2>
          <img onClick={() =>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState==="Login"?<></>: <input type="text" placeholder='Your name' required />
          }
          <input type="email" placeholder='Your email' required />
        <input type="password" placeholder='password' required />

        
        
        
        </div>
        <button>{currState === "Sign Up" ? "Creat account": "Login" } </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuig , i agree to the terms of use </p>
        </div>
        {currState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("sign Up")} >Clock Here</span> </p>
        :<p>Already Have an account? <span onClick={()=>setCurrState("Login")} >Login Here</span></p>

        }
   
      </form>
    </div>
  )
}

export default LoginPopup
