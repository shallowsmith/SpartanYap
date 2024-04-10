import React, { useEffect, useState } from "react"
import { Link, BrowserRouter } from 'react-router-dom'
import './LoginSignup.css'

import spartanyaplogo from '../Assets/spartanyaplogo.png'

const Home = () => {
    return(
        <Link to="/login"><button>Back to Login</button></Link>
    )
}

export default Home