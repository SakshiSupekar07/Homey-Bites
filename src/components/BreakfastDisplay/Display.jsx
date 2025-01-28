import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import './Display.css'; // Import the CSS file

const Display = () => {
  const { food_list, breakfast_list } = useContext(StoreContext);

  return (
    <div className="display-container">
      <h2>Food List</h2>
      <ul>
        {food_list.map((food) => (
          <li key={food._id}>
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p>{food.description}</p>
          </li>
        ))}
      </ul>

      <h2>Breakfast List</h2>
      <ul>
        {breakfast_list.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Display;
