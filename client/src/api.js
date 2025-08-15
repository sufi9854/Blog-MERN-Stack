import axios from '../axios';

const API_BASE =
  import.meta?.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  'https://blog-mern-stack-mwhv.onrender.com';

export default axios.create({
  baseURL: API_BASE,
  withCredentials: true
});
