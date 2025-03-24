import React, { useState, useEffect } from "react";
import "./Fooddisplay.css";
import { fetchMenuByType } from "../../Services/MenuService";
import { Navigate, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Fooddisplay = ({ category }) => {
  const [thaliData, setThaliData] = useState([]);
  const [breakfastData, setBreakfastData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Thali items
    fetchMenuByType("Thali")
      .then((response) => {
        setThaliData(response);
      })
      .catch((error) => console.error("Error fetching Thali:", error));

    // Fetch Breakfast items
    fetchMenuByType("Breakfast")
      .then((response) => {
        setBreakfastData(response);
      })
      .catch((error) => console.error("Error fetching Breakfast:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (item) => {
    navigate("/menu/item", { state: { itemId: item } });
  };

  return (
    <div className="food-display" id="food-display">
      {/* Thali Section */}
      {loading ? (
        <div className="loader">
         
          <ClipLoader color="#ff6600" size={70} />

          </div>
         
          ) : (
          <>


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
          </>
      )}

        </div>
      );
};

      export default Fooddisplay;