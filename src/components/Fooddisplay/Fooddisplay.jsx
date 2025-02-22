import React, { useState, useContext, useEffect } from "react";
import "./Fooddisplay.css";
import { StoreContext } from "../../context/storecontext";
import { fetchMenuByType } from "../../Services/MenuService";
import { Navigate, useNavigate } from "react-router-dom";

const Fooddisplay = ({ category }) => {
  const [thaliData, setThaliData] = useState([]);
  const [breakfastData, setBreakfastData] = useState([]);
  const { food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Thali items
    fetchMenuByType("Thali")
      .then((response) => {
        console.log("Thali Data:", response);
        setThaliData(response);
      })
      .catch((error) => console.error("Error fetching Thali:", error));

    // Fetch Breakfast items
    fetchMenuByType("Breakfast")
      .then((response) => {
        console.log("Breakfast Data:", response);
        setBreakfastData(response);
      })
      .catch((error) => console.error("Error fetching Breakfast:", error));
  }, []);

  const handleClick = (item) => {
    navigate("/menu/item", { state: { itemId: item } });
  };

  return (
    <div className="food-display" id="food-display">
      {/* Thali Section */}

      <h2>Top Thalis For You</h2>
      <div className="food-scroll-container">
        <div className="food-grid">
          {thaliData.map((item) => (
            <div key={item.menuId} onClick={() => handleClick(item.menuId)} className="food-card">
              <img src={item.imageUrl} alt={item.menuName} className="food-image" />
              <div className="food-info">
                <h3>{item.menuName}</h3>
                <p className="food-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Breakfast Section */}

      <h2>Delicious Breakfast Options</h2>
       <div className="food-scroll-container"> 
        <div className="food-grid">
          {breakfastData.map((item) => (
            <div key={item.menuId} onClick={() => handleClick(item.menuId)} className="food-card">
              <img src={item.imageUrl} alt={item.menuName} className="food-image" />
              <div className="food-info">
                <h3>{item.menuName}</h3>
                <p className="food-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Fooddisplay;
