import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <RedirectOnRefresh />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/register" element={user ? <Home /> : <Register />} />
  <Route path="/login" element={user ? <Home /> : <Login />} />
  <Route path="/write" element={user ? <Write /> : <Write />} />
  <Route path="/settings" element={user ? <Settings /> : <Register />} />
  <Route path="/post/:postId" element={<Single />} />
      </Routes>
  <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

function RedirectOnRefresh() {
  const navigate = useNavigate();

  useEffect(() => {
    const navigationType = window.performance.getEntriesByType("navigation")[0]?.type;
    const isReload = navigationType === "reload";

    const path = window.location.pathname;
    const search = window.location.search;

    // Allow only main pages without redirect
    const allowedPaths = ["/", "/login", "/register"];

    // If reload happens on any ?cat= or unlisted path -> go home
    if (isReload && (!allowedPaths.includes(path) || search.includes("cat="))) {
      navigate("/");
    }
  }, [navigate]);

  return null;
}

export default App;