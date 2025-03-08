import axios from "axios";
import { getAuthToken } from "../components/Auth";

export const BASE_URL = 'https://homeybites.onrender.com'; 
 
export const myAxios = axios.create({
    baseURL: BASE_URL,
})

// export const myAxiosAuth = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Accept": "application/json",
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${token}`,
//   },
// })

myAxios.interceptors.request.use((config)=>{
  const token = getAuthToken();
  if(token && ((config.url?.includes("/api/v1/auth")) || (config.method !== "get"))) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error)=>{
  return Promise.reject(error);
});

  // const API_BASE_URL = "https://homeybites.onrender.com ";
  // const LOGIN_API = "https://homeybites.onrender.com/api/v1/auth/login";
  // const SIGNUP_API = "https://homeybites.onrender.com/api/v1/auth/register";