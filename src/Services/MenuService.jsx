import { myAxios } from "./Helper";

export const fetchMenu = (menuType) => {
    return myAxios.get('/api/v1/menuitems/type?menuType='+menuType)
    .then((response) => response.data);
}