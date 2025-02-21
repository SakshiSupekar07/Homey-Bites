import React, { useState, useContext, useEffect } from 'react';
import './Menu.css'
import { StoreContext } from '../../context/storecontext';
import { fetchMenu, fetchMenuByType } from '../../Services/MenuService';

const Menu = ({ }) => {

    const [data, setData] = useState([]);
    const [type, setType] = useState('Breakfast');
    const { food_list } = useContext(StoreContext);

    useEffect(() => {
        fetchMenu().then((response) => {
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

    const getMenuByType = (type) => {
        console.log(type)
        fetchMenuByType(type).then((response) => {
            // response.
            //console.log(response.data[0])
            console.log(response)
            setData(response)
        })
    }

    return (
        <div className='menu-container'>
            <div className="menu-header">
                <div className="menu-display" id="menu-display">
                    {/* <h2>Top Thalis For You</h2> */}
                    {
                        data && (
                            <div className='menu-type'>
                                <button onClick={() => getMenuByType("Thali")}>Thali</button> | <button onClick={() => getMenuByType("Breakfast")}>Breakfast</button>
                            </div>
                        )
                    }
                    <div className="menu-grid">
                        {data.map((data) => (
                            <div key={data.menuId} className="menu-card">
                                <img src={data.imageUrl} alt={data.menuName} className="menu-image" />
                                <div className="menu-info">
                                    <h3>{data.menuName}</h3>
                                    <p className="menu-description">{data.description}</p>
                                    <p className="menu-price">Price: {data.price}</p>
                                    <div className='menu-buttons'>
                                        <button className="add-to-cart">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Menu;
