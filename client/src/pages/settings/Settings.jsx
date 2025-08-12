import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  //Delete user and posts
const handleDelete = async () => {
  try {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    await axios.delete(`/users/${user._id}`, {
      data: { userId: user._id } // matches backend check req.body.userId === req.params.id
    });

    alert("Account deleted successfully");
    // Optionally clear context and redirect
    dispatch({ type: "LOGOUT" });
    window.location.replace("/login");
  } catch (err) {
    console.error("Delete Error:", err);
    alert("Failed to delete account");
  }
};
  
  
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle" style={{ display: "flex", justifyContent: "flex-end" }}>
          <span className="settingsDeleteTitle" onClick={handleDelete}>Delete Account</span>
          {/* <span className="settingsUpdateTitle">Update Account</span> */}
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            // placeholder={user.username} To add username in update section placeholder
            placeholder=""
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder=""
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "blue", textAlign: "center", marginTop: "20px" }}
            >
              Your Profile has been Updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}