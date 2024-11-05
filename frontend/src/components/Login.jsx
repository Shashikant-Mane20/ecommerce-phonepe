// import React, { useState } from "react";
// import "../App.css";
// import Axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
// //   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate()

//   Axios.defaults.withCredentials = true;
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     Axios.post("http://localhost:3000/auth/login", {
//     //   username,
//       email,
//       password,
//     }).then(response => {
//         if(response.data.status) {
//             navigate('/')
//         }
//     }).catch(err => {
//         console.log(err)
//     })
//   };
//   return (
//     <div className="sign-up-container">
//       <form className="sign-up-form" onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         {/* <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           placeholder="Username"
//           onChange={(e) => setUsername(e.target.value)}
//         /> */}

//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           autoComplete="off"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           placeholder="******"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Login</button>
//         <Link to="/forgotPassword">Forgot Password?</Link>
//         <p>Don't have Account? <Link to="/signup">SignUp</Link></p> 
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3000/auth/login", { email, password })
            .then(response => {
                if (response.data.status) {
                    navigate('/');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            autoComplete="off"
                            placeholder="Email"
                            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            placeholder="******"
                            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </button>

                    <div className="mt-4 text-center">
                        <Link to="/forgotPassword" className="text-blue-500 hover:underline">Forgot Password?</Link>
                    </div>

                    <p className="mt-2 text-center text-gray-600">
                        Don't have an account? 
                        <Link to="/signup" className="text-blue-500 hover:underline"> Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
