import React, { createContext, useContext, useState } from 'react';

const cartcontext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    return (
        <cartcontext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </cartcontext.Provider>
    );
};

export const useCart = () => useContext(cartcontext);
