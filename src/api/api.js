import axios from "axios";
// import { getToken } from "./authUtils";

// Create an axios instance with the default headers
export const api = axios.create({
  // baseURL: "http://192.168.1.103/projects/easyAcers/admin/api",
  baseURL: "http://172.20.10.2/projects/easyAcers/admin/api",


  // baseURL : "http://192.168.1.14/projects/real_estate",

  // baseURL : "https://billing.onezo.in/api/"
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
