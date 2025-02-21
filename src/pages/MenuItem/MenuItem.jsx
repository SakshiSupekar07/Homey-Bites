import { useLocation } from "react-router-dom";
import "./MenuItem.css";

const MenuItem = () => {
    const location = useLocation();
    const itemId = location.state?.itemId;

    return(
        <div className="menu-item-container">
            <div className="menu-item-display"> 
                <h1>Menu item page</h1>
                <h2>{itemId}</h2>
                <div className="menu-item-card">
                <img src="#" alt="menu image" className="menu-item-image" />
                </div>
            </div>
        </div>
    )
};

export default MenuItem;