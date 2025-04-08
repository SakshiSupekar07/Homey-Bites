import React, { useEffect, useState } from "react";
import "./subscription.css";
import { getAllTiffinPlans } from "../../Services/subscriptionservice";

const subscription = () => {
    const [tiffinPlans, setTiffinPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getAllTiffinPlans()
            .then((data) => {
                setTiffinPlans(data); 
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load plans.");
                setLoading(false);
            });
    }, []);

    return (
        <div className="subscription-container">
            <h2 className="title">Subscription Plans</h2>

            {loading ? (
                <p>Loading plans...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <div className="plans-grid">
                    {tiffinPlans.map((plan) => (
                        <div className="plan-card" key={plan.tiffinPlanId}>
                            <h3 className="plan-title">{plan.planName}</h3>
                            <p className="plan-type">{plan.addOns} Plan</p>
                            <ul className="plan-items">
                                {plan.menuItems && plan.menuItems.length > 0 ? (
                                    plan.menuItems.map((item, index) => (
                                        <li key={index}>✔ {item}</li>
                                    ))
                                ) : (
                                    <li>No menu items</li>
                                )}
                            </ul>
                            <p className="plan-price">₹{plan.price}/month</p>
                            <button className="choose-btn">Choose Plan</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default subscription;
