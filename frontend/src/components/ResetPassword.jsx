import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const {token} = useParams()
  
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault();
      Axios.post("http://localhost:3000/auth/reset-password/"+token, {
        password,
      }).then(response => {
          if(response.data.status) {
              navigate('/login')
          }
          console.log(response.data)
      }).catch(err => {
          console.log(err)
      })
    };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Reset</button>
      </form>
    </div>
  )
}

export default ResetPassword


// import React, { useState } from "react";
// import Axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const ResetPassword = () => {
//     const [password, setPassword] = useState("");
//     const { token } = useParams();
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         Axios.post(`http://localhost:3000/auth/reset-password/${token}`, { password })
//             .then(response => {
//                 if (response.data.status) {
//                     navigate('/login');
//                 }
//                 console.log(response.data);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-md w-96">
//                 <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
//                 <form className="space-y-4" onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password:</label>
//                         <input
//                             type="password"
//                             placeholder="******"
//                             className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
//                     >
//                         Reset
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ResetPassword;
