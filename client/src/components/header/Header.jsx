import "./header.css";

export default function Header() {
  return (
    <header id="header">
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Blog</span>
        {/* <span className="headerTitleLg">BLOG</span> */}
      </div>
      <img
        className="headerImg"
        src="./Images/img3.jpg"
        alt=""
      />
    </div>
    </header>
  );
}
