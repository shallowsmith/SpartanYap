import "./style.css";
import React, { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login.js";
import SignupPage from "./pages/Signup.js";
import FeedPage from "./pages/Feed.js";
import AboutPage from "./pages/About.js";
import NavbarSticky from "./components/NavbarSticky.js";
import SearchResults from "./pages/SearchResults.js";
import SearchBar from "./components/SearchBar.js";
import Logout from "./components/Logout.js";
import PostDetail from "./components/PostDetail.js";

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div>
      <BrowserRouter>
        <NavbarSticky />
        <Routes>
          <Route path="/" element={<Navigate replace to="/feed" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/searchresults" element={<SearchResults />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/post/:postid" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
