// import React from 'react'
import React, { useEffect, useState } from "react"
import { Link, BrowserRouter } from 'react-router-dom'
import './LoginSignup.css'

import spartanyaplogo from '../Assets/spartanyaplogo.png'
import usericon from '../Assets/usericon.png'
import emailicon from '../Assets/emailicon.png'
import passwordicon from '../Assets/passwordicon.png'

const Login = () => {

    // const [action, setAction] = useState("Sign Up");
    
    // useEffect(()=> {
    //     fetch("/register").then(
    //         res => res.text()
    //     ).then(
    //         action => {
    //             setAction(action)
    //             console.log(action)
    //         }
    //     )
    // }, [])
    

  return (
    <form class='form' method="post">
        <div class="header">
            <div class="text">Log In</div>
            <div class="underline"></div>
        </div>
        
        <div class="inputfields">
            <div class="input">
                <img src={usericon} alt=""/>
                <input type="text" id="username" placeholder="Username"/>
            </div>

            <div class="input">
                <img src={passwordicon} alt=""/>
                <input type="text" id="password" placeholder="Password"/>
            </div>
        </div>

        <div class="forgot-password">Lost Password? <span>Click Here</span></div>
        <input class="submit" type="submit" value="Log In"/>
        <Link class="switch" to="/">Sign Up</Link>
    </form>
  )
}


export default Login