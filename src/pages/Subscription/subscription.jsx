import React from "react";
import "./subscription.css";
const subscription = () => {
    const tiffinPlans = [
        {
            id: 1,
            name: "Basic Plan",
            planType: "Vegetarian",
            price: 1999,
            items: ["Roti", "Sabzi", "Dal", "Rice"],
        },
        {
            id: 2,
            name: "Standard Plan",
            planType: "Veg + Non-Veg",
            price: 2499,
            items: ["Roti", "Chicken Curry", "Rice", "Salad"],
        },
        {
            id: 3,
            name: "Premium Plan",
            planType: "Deluxe",
            price: 2999,
            items: ["Paneer", "Dal Makhani", "Jeera Rice", "Sweet"],
        },
        {
            id: 4,
            name: "Deluxe Plan",
            planType: "Veg + Non-Veg",
            price: 3499,
            items: ["Roti", "Chicken Curry", "Rice", "Salad"],
        },
        {
            id: 5,
            name: "Family Plan",
            planType: "Veg + Non-Veg",
            price: 3999,
            items: ["Roti", "Chicken Curry", "Rice", "Salad"],
        },
        {
            id: 6,
            name: "Special Plan",
            planType: "Veg + Non-Veg",
            price: 4499,
            items: ["Roti", "Chicken Curry", "Rice", "Salad"],
        }
    ];

    return (
        <div className="subscription-container">
            <h2 className="title">Tiffin Plans</h2>
            <div className="plans-grid">
                {tiffinPlans.map((plan) => (
                    <div className="plan-card" key={plan.id}>
                        <h3 className="plan-title">{plan.name}</h3>
                        <p className="plan-type">{plan.planType} Plan</p>
                        <ul className="plan-items">
                            {plan.items.map((item, index) => (
                                <li key={index}>✔ {item}</li>
                            ))}
                        </ul>
                        <p className="plan-price">₹{plan.price}/month</p>
                        <button className="choose-btn">Choose Plan</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default subscription;
