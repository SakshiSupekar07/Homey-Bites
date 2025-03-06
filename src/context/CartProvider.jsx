import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserCart } from "../Services/AddToCartService";
import { UserContext } from "./UserProvider";
import { isLoggedIn } from "../components/Auth";

export const CartContext = createContext();

export const cartProvider = ({ children }) => {
    const { userData } = useContext(UserContext);
    const [cartData, setCartData] = useState([]);

    const getCart = async () => {
        if (isLoggedIn() && userData) {
            await fetchUserCart(userData.userId).then((response) => {
                setCartData(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    useEffect(() => {
        getCart();
    }, [userData])

    return (
        <CartContext.Provider value={{ cartData }}>
            {children}
        </CartContext.Provider>
    )
}

export default cartProvider