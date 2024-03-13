// import React from 'react'
import React, { useEffect, useState } from "react";
import './LoginSignup.css'

import spartanyaplogo from '../Assets/spartanyaplogo.png'
import usericon from '../Assets/usericon.png'
import emailicon from '../Assets/emailicon.png'
import passwordicon from '../Assets/passwordicon.png'

const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up");

  return (
    <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="Log In"?<></>:<div className="input">
                <img src={usericon} alt=""/>
                <input type="text" placeholder="Username"/>
            </div>}
            
            <div className="input">
                <img src={emailicon} alt=""/>
                <input type="text" placeholder="Email"/>
            </div>

            <div className="input">
                <img src={passwordicon} alt=""/>
                <input type="text" placeholder="Password"/>
            </div>
        </div>
        {action==="Sign Up"?<></>:<div className="forgot-password">Lost Password? <span>Click Here</span></div>}
        <div className="submit-container">
            <div className={action==="Log In"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Log In")}}>Log In</div>
        </div>
    </div>
  )
}


export default LoginSignup