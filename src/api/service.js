import axios from "axios";

const storedToken = localStorage.getItem('authToken');

const api = axios.create({
  baseURL: "https://vast-jade-woodpecker-sock.cyclic.app",
  headers: { Authorization: `Bearer ${storedToken}`} 
});

const errorHandler = (err) => {
  throw err;
};

const uploadImage = (file) => {
  return api.post("/posts/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
  uploadImage,
  // createPost
};