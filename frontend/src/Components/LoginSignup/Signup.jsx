// import React from 'react'
import React, { useEffect, useState } from "react"
import { Link, BrowserRouter } from 'react-router-dom'
import './LoginSignup.css'

import spartanyaplogo from '../Assets/spartanyaplogo.png'
import usericon from '../Assets/usericon.png'
import emailicon from '../Assets/emailicon.png'
import passwordicon from '../Assets/passwordicon.png'

const Signup = () => {

    // cost [accounts, setAccounts] = useState([])

    // useEffect(() => {
    //     fetchAccounts()
    // }, [])

    // const fetchAccounts = async () => {
    //     const response = await fetch("http://127.0.0.1:5000/")
    //     const data = await reponse.json()
    //     setAccounts(data.accounts)
    //     console.log(data.accounts)
    // }

    // const onSubmit = (e) => {
    //     e.preventDefault()

    //     const data = {
    //         username,
    //         email,
    //         password
    //     }

    //     const url = "http://127.0.0.1:5000/"
    //     const options = {
    //         method: "POST",
    //         body: JSON.
    //     }
    // }


  return (
    <form class='form' method="post" action="http://127.0.0.1:5000/">
        <div class="header">
            <div class="text">Sign Up</div>
            <div class="underline"></div>
        </div>

        <div class="inputfields">
            <div class="input">
                <img src={usericon} alt=""/>
                <input type="text" id="username" placeholder="Username"/>
            </div>
            
            <div class="input">
                <img src={emailicon} alt=""/>
                <input type="text" id="email" placeholder="Email"/>
            </div>

            <div class="input">
                <img src={passwordicon} alt=""/>
                <input type="text" id="password" placeholder="Password"/>
            </div>
        </div>

        <input class="submit" type="submit" value="Register"/>
        <Link class="switch" to="/login">Log In</Link>
    </form>
  )
}


export default Signup