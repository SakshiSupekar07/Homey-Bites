import axios from "axios";

export const BASE_URL = 'https://homeybites.onrender.com';

export const myAxios = axios.create({
    baseURL: BASE_URL
})

  // const API_BASE_URL = "https://homeybites.onrender.com ";
  // const LOGIN_API = "https://homeybites.onrender.com/api/v1/auth/login";
  // const SIGNUP_API = "https://homeybites.onrender.com/api/v1/auth/register";