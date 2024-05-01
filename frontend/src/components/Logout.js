import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './components/UserContext'; // Adjust the import path as necessary

function Logout() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the user from context
        setUser(null);
        // Redirect to the login page or home page
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}