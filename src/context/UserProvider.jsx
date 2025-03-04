import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from '../Services/UserService';
import { isLoggedIn } from "../components/Auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState([]);

    // const [userData, setUserData] = useState(()=>{
    //     const storedUser = localStorage.getItem("userData");
    //     return storedUser ? storedUser : null;
    // });

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        if (isLoggedIn()) {
            await getCurrentUser().then((response) => {
                setUserData(response.classObj);
                // localStorage.setItem("userData", response.classObj);
                console.log(response.classObj)
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    return (
        <UserContext.Provider value={{ userData }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider