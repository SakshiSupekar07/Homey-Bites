import React, { useState, useEffect } from 'react';
import { fetchMenu, fetchMenuByType } from '../../Services/MenuService';
import { addItemToCart, fetchUserCart, removeItemFromCart, updateQuantity } from '../../Services/AddToCartService';
import { getUserInfo, isLoggedIn } from '../../components/Auth';
import { useCart } from '../../pages/Cart/cartcontext';
import { userCart } from '../../context/UserCartContext';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import Base from '../../components/Base/Base';
import ClipLoader from "react-spinners/ClipLoader";
import './Menu.css';

const Menu = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [cartData, setCartData] = useState([]);
    const { setCartInfo } = userCart([]);
    const { setCartCount } = useCart();
    const userData = getUserInfo();

    useEffect(() => {
        setLoading(true);
        fetchMenu()
            .then((response) => {
                setData(response);
                setLoading(false); 
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false); 
            });

        if (isLoggedIn() && userData) {
            fetchCartData();  
        } else {
            loadGuestCart();  
        }
    }, []);

   
    const loadGuestCart = () => {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartData(localCart);
        setCartCount(localCart.length);
    };

    const fetchCartData = () => {
        fetchUserCart(userData.userId)
            .then((response) => {
                setCartInfo(response.data);
                localStorage.setItem("cartItem", JSON.stringify(response.data));
                setCartData(response.data);
                setCartCount(response.data.length || 0);
            })
            .catch((error) => console.log(error));
    };

    const addToCart = (menuId) => {
        if (isLoggedIn() && userData) {
            addItemToCart(userData.userId, menuId)
                .then(() => {
                    toast.success("Item added to cart successfully!");
                    fetchCartData();
                })
                .catch((error) => console.log(error));
        } else {
            let localCart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingItem = localCart.find(item => item.menuId === menuId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                localCart.push({ menuId, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(localCart));
            toast.success("Item added to cart!");
            setCartData(localCart);
            setCartCount(localCart.length);
        }
    };

    const incrementCount = (menuId) => {
        if (isLoggedIn()) {
            const item = cartData.find((item)=> item?.menuItem?.menuId === menuId);
            if (item) {
                updateQuantity(item.cId, item.quantity + 1)
                    .then(() => {
                        toast.success("Quantity updated successfully!");
                        fetchCartData();
                    })
                    .catch((error) => console.log(error));
            }
        } else {
            let localCart = JSON.parse(localStorage.getItem("cart")) || [];
            let item = localCart.find((item) => item.menuId === menuId);
            if (item) {
                item.quantity += 1;
                localStorage.setItem("cart", JSON.stringify(localCart));
                setCartData(localCart);
                setCartCount(localCart.length);
                toast.success("Quantity updated!");
            }
        }
    };

    const decrementCount = (menuId) => {
        if (isLoggedIn()) {
            const item = cartData.find((item) => item?.menuItem?.menuId === menuId);
            if (item) {
                if (item.quantity > 1) {
                    updateQuantity(item.cId, item.quantity - 1)
                        .then(() => {
                            toast.success("Quantity updated!");
                            fetchCartData();
                        })
                        .catch((error) => console.log(error));
                } else {
                    removeItemFromCart(item.cId)
                        .then(() => {
                            toast.success("Item removed from cart!");
                            fetchCartData();
                        })
                        .catch((error) => console.log(error));
                }
            }
        } else {
            let localCart = JSON.parse(localStorage.getItem("cart")) || [];
            let itemIndex = localCart.findIndex((item) => item.menuId === menuId);

            if (itemIndex !== -1) {
                if (localCart[itemIndex].quantity > 1) {
                    localCart[itemIndex].quantity -= 1;
                } else {
                    localCart.splice(itemIndex, 1);
                }

                localStorage.setItem("cart", JSON.stringify(localCart));
                setCartData(localCart);
                setCartCount(localCart.length);
                toast.success("Cart updated!");
            }
        }
    };

    const getCartItemCount = (menuId) => {
        if (isLoggedIn()) {
            const item = cartData.find((item) => item?.menuItem?.menuId === menuId);
            return item ? item.quantity : 0;
        } else {
            const item = cartData.find((item) => item.menuId === menuId);
            return item ? item.quantity : 0;
        }
    };

    return (
        <Base>
            <div className='menu-container'>
                {loading ? 
                    <div className="loader-container">
                        <ClipLoader color="#ff6600" size={70} />
                    </div>
                 : (
                    <div className="menu-header">
                        <div className="menu-display" id="menu-display">
                            {data && (
                                <div className='menu-type'>
                                    <button onClick={() => fetchMenuByType("Thali").then(setData)}>Thali</button> |
                                    <button onClick={() => fetchMenuByType("Breakfast").then(setData)}>Breakfast</button>
                                </div>
                            )}
                            <div className="menu-grid">
                                {data.map((item) => (
                                    <div key={item.menuId} className="menu-card">
                                        <img src={item.imageUrl} alt={item.menuName} className="menu-image" />
                                        <div className="menu-info">
                                            <h3>{item.menuName}</h3>
                                            <p className="menu-description">{item.description}</p>
                                            <p className="menu-price">
                                                Price: <img src={assets.ruppee} className='ruppee-img' /> {item.price}
                                            </p>
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
                )}
            </div>
        </Base>
    );
};

export default Menu;
