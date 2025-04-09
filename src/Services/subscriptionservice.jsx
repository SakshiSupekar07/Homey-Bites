import { myAxios } from "./Helper";

export const getAllTiffinPlans = () => {
    return myAxios.get("/api/v1/tiffinplan/")
        .then((res) => res.data);
};


export const getTiffinPlanById = (planId) => {
    return myAxios.get(`api/v1/tiffinplan/${planId}`)
        .then((res) => res.data);
};


export const addTiffinPlan = (planData) => {
    return myAxios.post("/api/v1/tiffinplan/", planData)
        .then((res) => res.data);
};


export const updateTiffinPlan = (planId, updatedData) => {
    return myAxios.put("/api/v1/tiffinplan/${planId}", updatedData)
        .then((res) => res.data);
};


export const addMenuItemsToPlan = (planId, menuIds) => {
    return myAxios.post("/api/v1/tiffinplan/${planId}/menuitems", {
        menuIds: menuIds
    }).then((res) => res.data);
};

export const deleteMenuItemFromPlan = (planId, menuId) => {
    return myAxios.delete("/api/v1/tiffinplan/${planId}/menuItem/${menuId}")
        .then((res) => res.data);
};


export const addPlanToCart = (userId, planId) => {
    return myAxios.post("/api/v1/cart/${userId}/item/${planId}")
        .then((res) => res.data);
};
