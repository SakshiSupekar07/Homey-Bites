import React, { useState, useEffect } from 'react';
import { fetchMenu, fetchMenuByType } from '../../Services/MenuService';
import { addItemToCart, removeItemFromCart, fetchUserCart } from '../../Services/AddToCartService';
import { getUserInfo, isLoggedIn } from '../../components/Auth';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import Base from '../../components/Base/Base';
import './Menu.css';    

const Menu = () => {
    const [data, setData] = useState([]);
    const [type, setType] = useState('Breakfast');
    const [cart, setCart] = useState({});
    const userData = getUserInfo();

    useEffect(() => {
        fetchMenu().then((response) => {
            setData(response);
        }).catch((error) => console.error("Error fetching data:", error));

        if (isLoggedIn() && userData) {
           fetchUserCart(userData.userId).then((response) => {
                const cartData = {};
                response.forEach(item => {
                    cartData[item.menuId] = item.quantity;
                });
                setCart(cartData);
            });
        }
    }, []);

    const getMenuByType = (type) => {
        fetchMenuByType(type).then((response) => {
            setData(response);
        });
    };

    const handleIncrement = (id) => {
        addItemToCart(userData.userId, id).then(() => {
            setCart(prevCart => ({ ...prevCart, [id]: (prevCart[id] || 0) + 1 }));
            toast.success("Item added to cart successfully!");
        }).catch((error) => console.log(error));
    };

    const handleDecrement = (id) => {
        if (cart[id] === 1) {
            removeItemFromCart(userData.userId, id).then(() => {
                const updatedCart = { ...cart };
                delete updatedCart[id];
                setCart(updatedCart);
                toast.success("Item removed from cart successfully!");
            }).catch((error) => console.log(error));
        } else {
            addItemToCart(userData.userId, id, -1).then(() => {
                setCart(prevCart => ({ ...prevCart, [id]: prevCart[id] - 1 }));
                toast.success("Item quantity decreased successfully!");
            }).catch((error) => console.log(error));
        }
    };

    return (
        <Base>
            <div className='menu-container'>
                <div className="menu-header">
                    <div className="menu-display" id="menu-display">
                        {data && (
                            <div className='menu-type'>
                                <button onClick={() => getMenuByType("Thali")}>Thali</button> | <button onClick={() => getMenuByType("Breakfast")}>Breakfast</button>
                            </div>
                        )}
                        <div className="menu-grid">
                            {data.map((item) => (
                                <div key={item.menuId} className="menu-card">
                                    <img src={item.imageUrl} alt={item.menuName} className="menu-image" />
                                    <div className="menu-info">
                                        <h3>{item.menuName}</h3>
                                        <p className="menu-description">{item.description}</p>
                                        <p className="menu-price">Price: <img src={assets.ruppee} className='ruppee-img' /> {item.price}</p>
                                        <div className='menu-buttons'>
                                            {cart[item.menuId] ? (
                                                <div className='quantity-controls'>
                                                    <button className='quantity-btn decrement' onClick={() => handleDecrement(item.menuId)}>-</button>
                                                    <span className='quantity-value'>{cart[item.menuId]}</span>
                                                    <button className='quantity-btn' onClick={() => handleIncrement(item.menuId)}>+</button>
                                                </div>
                                            ) : (
                                                <button onClick={() => handleIncrement(item.menuId)} className="add-to-cart">Add to Cart</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    );
};

export default Menu;
