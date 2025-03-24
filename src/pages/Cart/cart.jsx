import React, { useEffect, useState } from 'react';
import './cart.css';
import { getUserInfo } from '../../components/Auth';
import { fetchUserCart, removeAllItemFromCart, removeItemFromCart, updateQuantity } from '../../Services/AddToCartService';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import Base from '../../components/Base/Base';
import ClipLoader from "react-spinners/ClipLoader";

const Cart = () => {
  const user = getUserInfo();
  const [cartData, setCartData] = useState([]);
  const [reload, setReload] = useState(false);
  const [quantity, setQuantity] = useState({});
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const getCart = () => {
    if (user) {
      setLoading(true); // Start loading
      fetchUserCart(user.userId)
        .then((response) => {
          setCartData(response.data);

          // Initialize quantity
          const initialSelection = {};
          let totalCount = 0;
          response.data.forEach((item) => {
            initialSelection[item.cId] = item?.quantity;
            totalCount += 1;
          });
          setQuantity(initialSelection);

          // Initialize cart total
          let total = 0;
          response.data.forEach((item) => {
            total += item?.totalPrice;
          });
          setCartTotal(total);

          setLoading(false); 
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); 
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, [reload]);

  const removeItem = (cartId) => {
    removeItemFromCart(cartId)
      .then(() => {
        setReload(!reload);
        toast.success("Menu item removed successfully!");
      })
      .catch((error) => console.log(error));
  };

  const handleSelectChange = (id, event) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: event.target.value,
    }));

    updateQuantity(id, event.target.value)
      .then(() => {
        setReload(!reload);
      })
      .catch((error) => console.log(error));
  };

  const removeAllItem = (userId) => {
    removeAllItemFromCart(userId)
      .then(() => {
        setReload(!reload);
        toast.success("All items removed from cart");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Base>
      <div className='cart'>
        <div className='cart-data'>
          {loading ? (
            <div className="loader-container">
              <ClipLoader color="#ff6600" size={70} />
            </div>
          ) : cartData.length > 0 ? (
            <>
              <h1 className='cart-header'>Cart</h1>
              <div className='cart-container'>
                <div className='cart-items'>
                  {cartData.map((item) => (
                    <div key={item?.cId} className='items'>
                      <div className='item-card'>
                        <div className='item-image'>
                          <img src={item?.menuItem?.imageUrl} alt={item?.menuItem?.menuName} />
                        </div>
                        <div className='item-info'>
                          <div className='item-desc'>
                            <h3>{item?.menuItem?.menuName}</h3>
                            <p>{item?.menuItem?.description}</p>
                            <p><img src={assets.ruppee} className='ruppee-img' />{item?.menuItem?.price}</p>
                            <div className="custom-select">
                              <select value={quantity[item?.cId] || ""} onChange={(event) => handleSelectChange(item?.cId, event)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <img src={assets.trash} alt='trash' onClick={() => removeItem(item?.cId)} className='trash-img' />
                          </div>
                        </div>
                      </div>
                      <div className='item-total'>
                        <p>Total:<img src={assets.ruppee} className='ruppee-img' /> {item?.totalPrice}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='cart-checkout'>
                  <p>Subtotal: <img src={assets.ruppee} className='ruppee-img' />{cartTotal}</p>
                  <button className='cart-pay'>Proceed to Pay</button>
                </div>
              </div>
              <button onClick={() => removeAllItem(user.userId)} className='remove-all'>Remove All</button>
            </>
          ) : (
            <div className='empty-cart'>
              <h2>Your cart is empty</h2>
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
