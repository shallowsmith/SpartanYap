import './App.css'
import React from 'react'
import Home from './Components/LoginSignup/Home.jsx'
import Signup from './Components/LoginSignup/Signup.jsx'
import Login from './Components/LoginSignup/Login.jsx'
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;