import React, { createContext, useState } from "react";
import { food_list as initialFoodList, breakfast_list as initialBreakfastList } from "../assets/assets";

// Create the StoreContext
export const StoreContext = createContext();

// Context Provider Component
export const StoreContextProvider = ({ children }) => {
  // State to manage food_list and breakfast_list
  const [food_list, setFoodList] = useState(initialFoodList);
  const [breakfast_list, setBreakfastList] = useState(initialBreakfastList);

  // Context value to provide
  const contextValue = {
    food_list,
    setFoodList,
    breakfast_list,
    setBreakfastList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
