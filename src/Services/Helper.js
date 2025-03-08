import axios from "axios";
import { getAuthToken } from "../components/Auth";

export const BASE_URL = 'http://localhost:8080'; 
 
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

const excludedEndpoints = [
  "/api/v1/auth"
];


myAxios.interceptors.request.use((config)=>{
  const token = getAuthToken();

  const isExcluded = excludedEndpoints.some(endpoint => config.url.includes(endpoint));

  if(token && (!isExcluded || (config.method !== "get"))) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error)=>{
  return Promise.reject(error);
});

  // const API_BASE_URL = "https://homeybites.onrender.com ";
  // const LOGIN_API = "https://homeybites.onrender.com/api/v1/auth/login";
  // const SIGNUP_API = "https://homeybites.onrender.com/api/v1/auth/register";