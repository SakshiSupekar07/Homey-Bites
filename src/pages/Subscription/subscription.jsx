import React, { useState, useContext, useEffect } from 'react';

import { fetchMenu, fetchMenuByType } from '../../Services/MenuService';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../../Services/AddToCartService';
import { getUserInfo, isLoggedIn } from '../../components/Auth';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import Base from '../../components/Base/Base';

const subscription = () => {

    const [data, setData] = useState([]);
    const [type, setType] = useState('Breakfast');
    const userData = getUserInfo();

    const navigate = useNavigate();

    useEffect(() => {
        fetchMenu().then((response) => {
            setData(response)
        })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const getMenuByType = (type) => {
        console.log(type)
        fetchMenuByType(type).then((response) => {
            console.log(response)
            setData(response)
        })
    }

    const addToCart = (id) => {
        if(isLoggedIn() && userData != null){
            addItemToCart(userData.userId, id).then((response)=>{
                console.log(response)
                toast.success("Item added to cart successfully..!")
            }).catch((error) => {
                console.log(error)
            })
        }
        else {
            toast.error("Please login to add items to cart..")
        }
    }

    return (
        <Base>
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
                            <div key={data.menuId} cLassName="menu-card">
                                <img src={data.imageUrl} alt={data.menuName} className="menu-image" />
                                <div className="menu-info">
                                    <h3>{data.menuName}</h3>
                                    <p className="menu-description">{data.description}</p>
                                    <p className="menu-price">Price:<img src={assets.ruppee} className='ruppee-img' /> {data.price}</p>
                                    <div className='menu-buttons'>
                                        <button onClick={() => addToCart(data.menuId)} className="add-to-cart">Subscribe Now</button>
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

export default subscription;
