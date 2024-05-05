import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Redirect to the login page or home page
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}