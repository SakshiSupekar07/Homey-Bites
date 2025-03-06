import { myAxios, myAxiosAuth } from "./Helper";

export const getCurrentUser = async () => {
    return await myAxiosAuth.get('/api/v1/users/current-user')
    .then((response) => response.data);
}

export const logIn = async (user) => {
    return await myAxios.post('/api/v1/auth/login', user)
    .then((response) => response.data);
}

export const signIn = async (user) => {
    return await myAxios.post('/api/v1/auth/register', user)
    .then((response) => response.data)
}

export const VerifyEmail = async (otp, username) => {
    return await myAxios.post('/api/v1/auth/verify-email?otp='+otp+'&username='+username)
    .then((response) => response.data)
}

export const VerifyOtp = async (otp, username) => {
    return await myAxios.post('/api/v1/auth/verify-otp?otp='+otp+'&username='+username)
    .then((response) => response.data)
}

export const sendOtp = async (username) => {
    return await myAxios.post('/api/v1/auth/resend-otp?username='+username)
    .then((response) => response.data)
} 

export const forgetpassword = async (username) => {
    return await myAxios.post('/api/v1/auth/forget-password?username='+username)  
    .then((response) => response.data)
}

export const resetPass = async (data, username) => {
    console.log(data);
    return await myAxios.post('/api/v1/auth/reset-pass?emailId='+username, data)  
    .then((response) => response.data)
}
