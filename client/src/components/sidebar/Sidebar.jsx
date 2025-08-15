import axios from "../../axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { Element } from 'react-scroll';

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("https://blog-mern-stack-mwhv.onrender.com")

      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <Element name="aboutSidebar">
    <div className="sidebar">
      <div className="sidebarItem" id="about">
        <span className="sidebarTitle">ABOUT US</span>
        <img
          src="https://images.unsplash.com/photo-1522199710521-72d69614c702" 
          alt="Travel gear and accessories on desk"
        />
        <p>
        Welcome to <strong>Your's Vibe Blog</strong>, your go-to space for insightful
        articles,inspiring stories,about Nature,Life Thoughts & Daily Motivational tips on technology and lifestyle we Grow With You All.</p>
        <p>We believe in creating content that educates, entertains, and empowers our readers. Whether you’re here to learn something new, stay informed, or share your own voice, our blog is built for you.
          Join us on this journey, and let’s explore, learn, and grow together.
      </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
           {Array.isArray(cats) && cats.length > 0 ? (
    cats.map((c) => (
      <Link key={c._id || c.name} to={`/?cat=${c.name}`} className="link">
        <li className="sidebarListItem">{c.name}</li>
      </Link>
    ))
  ) : (
    <li>No categories found</li>
  )}
</ul>
      </div>
      <div className="sidebarItem" id="contact">
        <span className="sidebarTitle">CONTACT US</span>
        <div className="sidebarSocial">
          <a href="https://github.com/sufi9854"
             target="_blank"
             rel="noreferrer"
          >
          <i className="sidebarIcon fab fa-github-square"></i>
          </a>
          <a href="https://www.linkedin.com/in/sufiyann"
             target="_blank"
             rel="noreferrer"
          >
          <i className="sidebarIcon fab fa-linkedin"></i>
          </a>
          <a href="mailto:sksufiyan9854@gmail.com"
             target="_blank"
             rel="noreferrer"
          >
          <i className="sidebarIcon fas fa-inbox"></i>
          </a>
        </div>
      </div>
    </div>
    </Element>
  );
}