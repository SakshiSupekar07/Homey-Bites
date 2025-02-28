import { myAxios, myAxiosAuth } from "./Helper";

export const fetchUserCart = (userId) => {
    return myAxios.get('/api/v1/cart/'+userId)
    .then((response) => response);
}

export const addItemToCart = (userId, itemId) => {
    return myAxiosAuth.post('/api/v1/cart/'+userId+'/item/'+itemId)
    .then((response) => response.data);
}

export const updateQuantity = (cartId, quantity) => {
    return myAxiosAuth.put('/api/v1/cart/'+cartId+'/quantity/'+quantity)
    .then((response) => response.data);
}

export const removeItemFromCart = (cartId) => {
    return myAxiosAuth.delete('/api/v1/cart/delete/'+cartId)
    .then((response) => response.data);
}

export const removeAllItemFromCart = (userId) => {
    return myAxiosAuth.delete('/api/v1/cart/'+userId)
    .then((response) => response.data);
}