import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleLogout = () => {
        axios.get('http://localhost:3000/auth/logout')
            .then(res => {
                if (res.data.status) {
                    navigate('/login');
                }
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Home</h1>
            <div className="flex flex-col items-center">
                <Link to="/dashboard">
                    <button className="mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
                        Go to Dashboard
                    </button>
                </Link>
                <Link to="/checkout">
                    <button className="mb-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200">
                        Go to Checkout
                    </button>
                </Link>
                <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;
