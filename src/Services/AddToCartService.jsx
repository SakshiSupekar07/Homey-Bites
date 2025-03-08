import { myAxios } from "./Helper";

export const fetchUserCart = (userId) => {
    return myAxios.get('/api/v1/cart/'+userId)
    .then((response) => response);
}

export const addItemToCart = (userId, itemId) => {
    return myAxios.post('/api/v1/cart/'+userId+'/item/'+itemId)
    .then((response) => response.data);
}

export const updateQuantity = (cartId, quantity) => {
    return myAxios.put('/api/v1/cart/'+cartId+'/quantity/'+quantity)
    .then((response) => response.data);
}

export const removeItemFromCart = (cartId) => {
    return myAxios.delete('/api/v1/cart/delete/'+cartId)
    .then((response) => response.data);
}

export const removeAllItemFromCart = (userId) => {
    return myAxios.delete('/api/v1/cart/'+userId)
    .then((response) => response.data);
}