export const isLoggedIn = () => {
    let data = localStorage.getItem("authToken");
    if(data != null) return true;
    else return false;
};

export const doLogin = (data,next) => {
    localStorage.setItem("authToken", data.token);
    next()
};

export const doLogout = (next) => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("cartData");
    localStorage.removeItem("userData");
    next()
}

export const getAuthToken = () => {
    return localStorage.getItem("authToken");
}