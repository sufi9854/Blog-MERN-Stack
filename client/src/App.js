import Home from "./pages/home/Home";
import SinglePost from "./components/singlePost/SinglePost";
import TopBar from "./components/topbar/TopBar";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { Context } from "./context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useContext(Context);

  // Inline Protected wrapper component
  const Protected = ({ user, children, message }) => {
    const navigate = useNavigate();
    const toastShownRef = useRef(false);

    useEffect(() => {
      if (!user && !toastShownRef.current) {
        toastShownRef.current = true;
        toast.warning(message || "Please login to access this page");
        navigate("/"); // redirect to home
      }
    }, [user, navigate, message]); // now user is a prop, dependency is fine

    return user ? children : null;
  };

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />

        {/* Protected routes inline */}
        <Route
          path="/write"
          element={
            <Protected user={user} message="Login your profile to post a blog">
              <Write />
            </Protected>
          }
        />
        <Route
          path="/settings"
          element={
            <Protected user={user} message="Please login to access Settings">
              <Settings />
            </Protected>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;
