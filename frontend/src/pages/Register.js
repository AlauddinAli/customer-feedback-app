// // import React from "react";
// // import "./Register.css";

// // function Register() {
// //   return (
// //     <div className="register-container">
// //       <h2 className="register-title">Register</h2>
// //       <form className="register-form">
// //         <input type="text" placeholder="Username" className="register-input" />
// //         <input type="email" placeholder="Email" className="register-input" />
// //         <input type="password" placeholder="Password" className="register-input" />
// //         <input type="password" placeholder="Confirm Password" className="register-input" />
// //         <button type="submit" className="register-button">Sign Up</button>
// //       </form>
// //       <p className="register-footer">
// //         Already have an account? <a href="/login">Log In</a>
// //       </p>
// //     </div>
// //   );
// // }

// // export default Register;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Register.css";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Registration successful! Please login.");
//         navigate("/login");
//       } else {
//         alert(data.message || "Registration failed");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2 className="register-title">Register</h2>
//       <form className="register-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           className="register-input"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="register-input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="register-input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="register-input"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="register-button">
//           Sign Up
//         </button>
//       </form>
//       <p className="register-footer">
//         Already have an account? <a href="/login">Log In</a>
//       </p>
//     </div>
//   );
// }

// export default Register;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="register-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="register-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="register-button">
          Sign Up
        </button>
      </form>
      <p className="register-footer">
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
}

export default Register;