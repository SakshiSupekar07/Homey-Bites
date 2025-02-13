import { myAxios } from "./Helper";

export const logIn = (user) => {
    return myAxios.post('/api/v1/auth/login', user)
    .then((response) => response.data);
}

export const signIn = (user) => {
    return myAxios.post('/api/v1/auth/register', user)
    .then((response) => response.data)
}

export const VerifyEmail = (otp, username) => {
    return myAxios.post('/api/v1/auth/verify-email?otp='+otp+'&username='+username)
    .then((response) => response.data)
}

export const sendOtp = (username) => {
    return myAxios.post('/api/v1/auth/resend-otp?username='+username)
    .then((response) => response.data)
} 

export const forgetpassword = (username) => {
    return myAxios.post('/api/v1/users/forget-password?username='+username)
    .then((response) => response.data)
}