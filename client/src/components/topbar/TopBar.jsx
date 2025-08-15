import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate, useLocation } from "react-router-dom";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  // `isRegistered` should be set in Context when the user registers

  const PF = "https://blog-mern-stack-mwhv.onrender.com/images/"
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

    // Navigate to home and scroll to section
  const goToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="top">
      <div className="topLeft">
        <a href="https://github.com/sufi9854"
             target="_blank"
             rel="noreferrer"
          >
          <i className="topIcon fab fa-github-square"></i>
        </a>
        <a href="https://www.linkedin.com/in/sufiyann"
             target="_blank"
             rel="noreferrer"
          >
          <i className="topIcon fab fa-linkedin"></i>
          </a>
        <a href="mailto:sksufiyan9854@gmail.com"
             target="_blank"
             rel="noreferrer"
          >
          <i className="topIcon fas fa-inbox"></i>
          </a>

      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <ScrollLink className="topbarLink" to="header" smooth={true} duration={500} onClick={() => goToSection("header")}>
              HOME
            </ScrollLink>
          </li>
          <li className="topListItem">
            <ScrollLink className="topbarLink" to="aboutSidebar" smooth={true} duration={500} onClick={() => goToSection("aboutSidebar")}>
              ABOUT
            </ScrollLink>
          </li>
          <li className="topListItem">
            <ScrollLink className="topbarLink" to="contact" smooth={true} duration={500} onClick={() => goToSection("contact")}>
              CONTACT
            </ScrollLink>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF+user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login" >
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}