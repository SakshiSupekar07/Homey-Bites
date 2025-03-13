import React, { createContext, useContext, useState } from 'react';

const usercartcontext = createContext();

export const UserCartProvider = ({ children }) => {
    const [cartInfo, setCartInfo] = useState([]);

    return (
        <usercartcontext.Provider value={{ cartInfo, setCartInfo }}>
            {children}
        </usercartcontext.Provider>
    );
};

export const userCart = () => useContext(usercartcontext);
