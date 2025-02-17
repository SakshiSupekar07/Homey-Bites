import { myAxios } from "./Helper";

export const fetchMenuByType = (menuType) => {
    return myAxios.get('/api/v1/menuitems/type?menuType='+menuType)
    .then((response) => response.data);
}

export const fetchMenu = () => {
    return myAxios.get('/api/v1/menuitems')
    .then((response) => response.data);
}