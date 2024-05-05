import "./style.css";
import React, { useState, useMemo } from "react";
import UserContext from "./components/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login.js";
import SignupPage from "./pages/Signup.js";
import FeedPage from "./pages/Feed.js";
import NavbarSticky from "./components/NavbarSticky.js";


function App() {

  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={value}>
    <div>
      <BrowserRouter>
        <NavbarSticky />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
      </BrowserRouter>
    </div>
    </UserContext.Provider>
    
  );
}

export default App;
