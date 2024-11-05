// import React, { useState } from "react";
// import "../App.css";
// import Axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
  
//     const navigate = useNavigate()
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       Axios.post("http://localhost:3000/auth/forgot-password", {
//         email,
//       }).then(response => {
//           if(response.data.status) {
//             alert("check you email for reset password link")
//               navigate('/login')
//           }
//           console.log(response.data)
//       }).catch(err => {
//           console.log(err)
//       })
//     };
//   return (
//     <div className="sign-up-container">
//       <form className="sign-up-form" onSubmit={handleSubmit}>
//         <h2>Forgot Password</h2>
        

//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           autoComplete="off"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <button type="submit">Send</button>
//       </form>
//     </div>
//   )
// }

// export default ForgotPassword

import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3000/auth/forgot-password", { email })
            .then(response => {
                if (response.data.status) {
                    alert("Check your email for the reset password link");
                    navigate('/login');
                }
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        autoComplete="off"
                        placeholder="Email"
                        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
