import { useContext, useState, useEffect,useRef } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const shownRef = useRef(false);

  //Pop Up Toast notification for loggedout unregistered users
  useEffect(() => {
    if (!user && !shownRef.current) {
      toast.warning("Login your profile to post a Blog.");
      shownRef.current = true;
    }
  }, [user]);

  if (!user) {
    return null; // Don't render the form if not logged in
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  // //Write Message when user try to post without registering or login
  // if (!user) {
  //   return (
  //     <div className="write-message">
  //       <h2>Please Register or Login to write a post.</h2>
  //     </div>
  //   );
  // }

  return (
    <div className="write">
        {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit"> 
          Publish
        </button>
      </form>
    </div>
  );
}
