import axios from "axios";
// import { getToken } from "./authUtils";

// Create an axios instance with the default headers
export const api = axios.create({
  baseURL: "http://192.168.1.103/projects/easyAcers/admin/api",
<<<<<<< HEAD
=======
  // baseURL: "http://172.20.10.3/projects/easyAcers/admin/api",
>>>>>>> 361020a77e1f9bee1a1fa47731a9ca74f6bbb76d


  imageUrl: "http://192.168.1.103/projects/easyAcers/admin/",

})

// Add the Authorization header to each request
api.interceptors.request.use(
  (config) => {
    const token = "kasejfksjdhfywterjwefbdskgfhsdfjh"; // Get the token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Set the token in the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
