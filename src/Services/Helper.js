import axios from "axios";
import { getAuthToken } from "../components/Auth";

export const BASE_URL = 'http://localhost:8080';

export const myAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
})

export const myAxiosAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAuthToken()}`,
  },
})

  // const API_BASE_URL = "https://homeybites.onrender.com ";
  // const LOGIN_API = "https://homeybites.onrender.com/api/v1/auth/login";
  // const SIGNUP_API = "https://homeybites.onrender.com/api/v1/auth/register";