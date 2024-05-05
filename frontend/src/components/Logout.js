import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle the logout process
    const handleLogout = async () => {
      // Clear the token from local storage or cookies
      const token =
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")).token;
      localStorage.removeItem("user");

      try {
        await fetch("http://127.0.0.1:5000/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ${token}",
          },
        });
      } catch (error) {
        console.error("Logout failed", error);
      }

      // Redirect user to the login page or home page after logout
      navigate("/");
    };

    // Call the logout function when component mounts
    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;
