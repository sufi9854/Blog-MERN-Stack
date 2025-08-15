import axios from "../../axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Frontend validation
    if (!username) {
      toast.error("Please enter your username", { position: "top-center", autoClose: 2000 });
      return;
    }
    if (!password) {
      toast.error("Please enter your password", { position: "top-center", autoClose: 2000 });
      return;
    }

    // Step 2: Send login request
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", { username, password });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast.success("Login successful!", { position: "top-center", autoClose: 2000 });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });

      if (err.response && err.response.data) {
        if (err.response.data.message === "User not registered") {
          toast.error("Login failed! Your account is not registered");
        } else if (err.response.data.message === "Invalid username") {
          toast.error("Incorrect username!", { position: "top-center", autoClose: 3000 });
        } else if (err.response.data.message === "Invalid password") {
          toast.error("Incorrect password!", { position: "top-center", autoClose: 3000 });
        }
      } else {
        toast.error("Server error. Please try again.", { position: "top-center", autoClose: 2000 });
      }
    }
  };

  // Enter key submit handler
  // const handleEnterSubmit = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     document.getElementById("loginForm").requestSubmit();
  //   }
  // };

  
  // Enter Key Scroll to next input field 
const handleKeyDown = (e, nextRef, prevRef = null) => {

  // If Arrow Down → move to next field
  if (e.key === "ArrowDown" && nextRef?.current) {
    e.preventDefault();
    nextRef.current.focus();
  }
};
//   // If Arrow Up → move to previous field
//   if (e.key === "ArrowUp" && nextRef?.current) {
//     e.preventDefault();
//     prevRef.current.focus();
//   }
// };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form id="loginForm" className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, passwordRef, null)}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, null, userRef)}
        />
        <button
          className="loginButton"
          type="submit"
          disabled={isFetching}
          style={{ backgroundColor: "salmon" }}
        >
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
