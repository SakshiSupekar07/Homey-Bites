export const isLoggedIn = () => {
    let data = localStorage.getItem("authToken");
    if(data != null) return true;
    else return false;
};

export const doLogin = (data,next) => {
    localStorage.setItem("authToken", data.token);
    const userData = JSON.stringify(data.user);
    localStorage.setItem("user", userData);
    next()
};

export const doLogout = (next) => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    next()
}

export const getAuthToken = () => {
    return localStorage.getItem("authToken");
}

export const getUserInfo = () => {
    if(isLoggedIn())
        return JSON.parse(localStorage.getItem("user"));
}

export const cartInfo = () => {
    if(isLoggedIn())
    {
        
    }
}