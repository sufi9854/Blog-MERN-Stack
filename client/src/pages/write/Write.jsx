import { useContext, useState } from "react";
import "./write.css";
import axios from "../../axios";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  if (!user) return null; // Protect route

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !desc) {
      toast.warning("Title and description are required!");
      return;
    }

    const newPost = {
      username: user.username,
      title,
      desc,
    };

    // Handle image upload
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only image files are allowed (jpg, jpeg, png, gif).");
        return;
      }

      const data = new FormData();
      data.append("file", file); // key must match multer backend
      try {
        const res = await axios.post("/api/upload", data);
        newPost.photo = res.data.filename; // use backend returned filename
        toast.success("Image uploaded successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload image.");
        return;
      }
    }

    // Create post
    try {
      const res = await axios.post("/api/posts", newPost);
      toast.success("Blog posted successfully!");
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to publish post.");
    }
  };

  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt="preview"
        />
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
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile) {
                setFile(selectedFile);
              }
            }}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
