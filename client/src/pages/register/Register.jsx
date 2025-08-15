import axios from "../../axios";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //Arrow key up and down 
   const handleKeyDown = (e, currentRef) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (currentRef === usernameRef) emailRef.current.focus();
      if (currentRef === emailRef) passwordRef.current.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentRef === passwordRef) emailRef.current.focus();
      if (currentRef === emailRef) usernameRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    // Trigger browser validation for each field one by one
    if (!username.trim()) {
      document.getElementById("username").reportValidity();
      return;
    }
    if (!email.trim()) {
      document.getElementById("email").reportValidity();
      return;
    }
    if (!password.trim()) {
      document.getElementById("password").reportValidity();
      return;
    }

    console.log("Form submitted:", { username, email, password });
    // Call API here

  //   // Check if email ends with @gmail.com
  // if (!email.endsWith("@gmail.com")) {
  //   toast.error("Please enter a valid Gmail address (must end with @gmail.com)", {
  //     position: "top-center",
  //     autoClose: 3000,
  //   });
  //   return; // Stop submission
  // }
  
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });

  //Register Successful toast
  toast.success("Registration successful! You can now log in.", {
    position: "top-center",
    autoClose: 3000,
  });
  
// OPTIONAL: redirect after a delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);

      // If using res.data to check success
    if (res.data) {
      console.log("Registration data:", res.data);
     }
    } catch (err) {
      toast.error("Registration failed! You have been already registered.", {
        position: "top-center",
        autoClose: 3000,
      });
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          id="username"
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          value={username}
          ref={usernameRef}
          onKeyDown={(e) => handleKeyDown(e, usernameRef)}
          onChange={(e) => { const value = e.target.value;
            
    // Allow only letters (remove numbers & special chars)
    if (/^[A-Za-z]*$/.test(value)) {
      setUsername(value);
      }
      }}
     required
     pattern="[A-Za-z]+"
     title="Username must contain only letters"
   />
        <label>Email</label>
        <input
          id="email"
          type="email"
          className="registerInput"
          placeholder="Enter your email..."
          value={email}
          ref={emailRef}
          onKeyDown={(e) => handleKeyDown(e, emailRef)}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          id="password"
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          value={password}
          ref={passwordRef}
          onKeyDown={(e) => handleKeyDown(e, passwordRef)}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}