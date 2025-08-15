import axios from "axios";

const instance = axios.create({
  baseURL: "https://blog-mern-stack-mwhv.onrender.com/api", // change this to your Render backend URL
});

export default instance;
