import React, { useContext } from 'react';
import './Fooddisplay.css';
import { StoreContext } from '../../context/storecontext';

const Fooddisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const filteredFoodList =
    category === 'All' ? food_list : food_list.filter((food) => food.category === category);

  return (
    <div className="food-display" id="food-display">
      <h2>Top Thalis For You</h2>
      <div className="food-grid">
        {filteredFoodList.map((food) => (
          <div key={food._id} className="food-card">
            <img src={food.image} alt={food.name} className="food-image" />
            <div className="food-info">
              <h3>{food.name}</h3>
              <p className="food-description">{food.description}</p>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fooddisplay;
