import React, { useState, useContext, useEffect } from 'react';
import './Fooddisplay.css';
import { StoreContext } from '../../context/storecontext';
import { fetchMenuByType } from '../../Services/MenuService';

const Fooddisplay = ({ category }) => {

  const [data, setData] = useState([]);
  const [type, setType] = useState('Thali');
  const { food_list } = useContext(StoreContext);

  useEffect(() => {
    fetchMenuByType(type).then((response) => {
      // response.
      //console.log(response.data[0])
      console.log(response)
      setData(response)
    })
      // .then((response))
      //   .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));

    console.log(data)
  }, []);

  const filteredFoodList =
    category === 'All' ? food_list : food_list.filter((food) => food.category === category);

  return (
    <div className="food-display" id="food-display">
      <h2>Top Thalis For You</h2>
      <div className="food-grid">
        

          {data.map((data) => (
              <div key={data.menuId} className="food-card">
                <img src={data.imageUrl} alt={data.menuName} className="food-image" />
                <div className="food-info">
                  <h3>{data.menuName}</h3>
                  <p className="food-description">{data.description}</p>

                </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export default Fooddisplay;
