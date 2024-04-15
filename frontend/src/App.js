import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login.js";
import SignupPage from "./pages/Signup.js";
import NavbarSticky from "./components/NavbarSticky.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavbarSticky />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
