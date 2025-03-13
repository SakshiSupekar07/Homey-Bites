import React, { useState, useEffect } from 'react';
import { fetchMenu, fetchMenuByType } from '../../Services/MenuService';
import { addItemToCart, fetchUserCart, removeItemFromCart, updateQuantity, } from '../../Services/AddToCartService';
import { getUserInfo, isLoggedIn } from '../../components/Auth';
import { useCart } from '../../pages/Cart/cartcontext';
import './Menu.css';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import Base from '../../components/Base/Base';
import { userCart } from '../../context/UserCartContext';

const Menu = () => {
    const [data, setData] = useState([]);
    const [type, setType] = useState('Breakfast');
    const [cartData, setCartData] = useState([]);
    const [reload, setReload] = useState(false);
    const { setCartInfo } = userCart([]);
    const { setCartCount } = useCart();
    const userData = getUserInfo();

    useEffect(() => {
        fetchMenu().then((response) => setData(response))
            .catch((error) => console.error("Error fetching data:", error));

        if (isLoggedIn() && userData) {
            fetchUserCart(userData.userId).then((response) => {
                setCartInfo(response.data);
                setCartData(response.data);
                console.log(response.data)
                const cartData = {};
                let totalCount = 0;

                (response.data).forEach(item => {
                    cartData[item.menuId] = item.quantity;
                    totalCount += 1;
                });
                setCartCount(totalCount);  // Update count in cart context
            });
        }
    }, []);

    const addToCart = (menuId) => {
        addItemToCart(userData.userId, menuId).then(() => {
            toast.success("Item added to cart successfully!");
            setReload(!reload);
        }).catch((error) => console.log(error));
    }

    const incrementCount = (menuId) => {
        const item = cartData.find((item) => item?.menuItem?.menuId === menuId);
        if(item)
            updateQuantity(item.cId, item.quantity+1).then((reponse)=>{
                toast.success("Quantity updated successfully..!")
        }).catch((error)=>{
            console.log(error);
        })
    }

    const decrementCount = (menuId) => {
        const item = cartData.find((item) => item?.menuItem?.menuId === menuId);
        if(item)
            updateQuantity(item.cId, item.quantity-1).then((reponse)=>{
                toast.success("Quantity updated successfully..!")
        }).catch((error)=>{
            console.log(error);
        })
    }

    const getMenuByType = (type) => {
        fetchMenuByType(type).then((response) => setData(response));
    };

    const getCartItemCount = (menuId) => {
        const item = cartData.find((item) => item?.menuItem?.menuId === menuId);
        item ? console.log(menuId) : console.log("Not Found");
        return item ? item.quantity : 0;
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
                                            {getCartItemCount(item.menuId) > 0 ? (
                                                <div className='quantity-controls'>
                                                    <button className='quantity-btn decrement' onClick={() => decrementCount(item.menuId)}>-</button>
                                                    <span className='quantity-value'>{getCartItemCount(item.menuId)}</span>
                                                    <button className='quantity-btn' onClick={() => incrementCount(item.menuId)}>+</button>
                                                </div>
                                            ) : (
                                                <button onClick={() => addToCart(item.menuId)} className="add-to-cart">Add to Cart</button>
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
