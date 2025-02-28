import { useLocation } from "react-router-dom";
import "./MenuItem.css";
import { getMenu } from "../../Services/MenuService";
import { useEffect, useState } from "react";
import Base from '../../components/Base/Base'

const MenuItem = () => {
   

    const [data, setData] = useState([]);

    const location = useLocation();
    const itemId = location.state?.itemId;

    useEffect(() => {
        // Fetch Thali items
        getMenu(itemId)
            .then((response) => {
                console.log("Menu Data:", response);
                setData(response);
            })
            .catch((error) => console.error("Error fetching menu item:", error));
    }, []);


    return (
        <Base>
            <div className="menu-item-container">
                <div className="menu-item-display">
                    <h1>Menu item page</h1>
                    <h2>{data.menuId}</h2>

                    <div className="menu-item-card">
                        <img src={data.imageUrl} alt="menu image" className="menu-item-image" />
                        <div className="menu-item-info">
                            <h3>{data.menuName}</h3>
                            <h3>{data.description}</h3>
                            <h3>Price:</h3> <h3>{data.price}</h3>
                            <div className="menu-item-buttons">
                                <button className="menu-item-button">Add to Cart</button>
                                <button className="menu-item-button">Order Now</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Base>
      
    )
};

export default MenuItem;