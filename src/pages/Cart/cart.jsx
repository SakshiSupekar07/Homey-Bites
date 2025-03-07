import React, { useEffect, useState } from 'react'
import './cart.css'
import { getUserInfo } from '../../components/Auth';
import { fetchUserCart, removeAllItemFromCart, removeItemFromCart, updateQuantity } from '../../Services/AddToCartService';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import Base from '../../components/Base/Base'

const cart = () => {

  const user = getUserInfo();
  const [cartData, setCartData] = useState([]);
  const [reload, setReload] = useState(false);
  const [quantity, setQuantity] = useState({});
  const [cartTotal, setCartTotal] = useState();


  const getCart = () => {
    if (user != null) {
      //fetching cart data
      fetchUserCart(user.userId).then((response) => {
        setCartData(response.data);

        //intializing quantity
        const initialSelection = {};
        (response.data).forEach((item) => {
          initialSelection[item.cId] = item?.quantity;
        });
        setQuantity(initialSelection);

        // intializing cart total
        let total = 0;
        (response.data).forEach((item) => {
          total += item?.totalPrice;
        });
        setCartTotal(total);

      }).catch((error) => {
        console.log(error)
      })
    }
  }

  useEffect(() => {
    getCart();
  }, [reload])

  const removeItem = (cartId) => {
    if (cartData != null) {
      removeItemFromCart(cartId).then((response) => {
        console.log(response)
        setReload(!reload)
        toast.success("menu item removed successfully..!")
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  const handleSelectChange = (id, event) => {

    setQuantity((prev) => ({
      ...prev,
      [id]: event.target.value,
    }));
    console.log(event.target.value)
    console.log("menu id:", id)

    updateQuantity(id, event.target.value).then((response) => {
      console.log("success", response)
      setReload(!reload)
    }).catch((error) => {
      console.log("error", error)
    })
  }

  const removeAllItem = (userId) => {
    removeAllItemFromCart(userId).then((response) => {
      console.log(response)
      setReload(!reload)
      toast.success("All items rmoved from cart")
    }).catch((error) => {
      console.log(error)
    })
  }

  const items = cartData;

  return (
    <Base>
      <div className='cart'>
        <div className='cart-data'>
          {
            (items != null) && (
              <>
                <h1 className='cart-header'>Cart</h1>
                <div className='cart-container'>

                  <div className='cart-items'>
                    {items.map((item) => (
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
                    <button className='cart-pay'>Proceed to pay</button>
                  </div>

                </div>
                <button onClick={() => removeAllItem(user.userId

                )} className='remove-all'>Remove All</button>
              </>
            )
          }
          {
            (items == null) && (
              <div className='cart-items'>Loading...</div>
            )
          }
        </div>
      </div>
    </Base>
  )
}

export default cart;
