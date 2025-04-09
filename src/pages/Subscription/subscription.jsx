import React, { useEffect, useState } from "react";
import "./subscription.css";
import { getAllTiffinPlans } from "../../Services/subscriptionservice";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { isLoggedIn } from "../../components/Auth";
import { toast } from "react-toastify";
import Base from "../../components/Base/Base";

const Subscription = () => {
    const [tiffinPlans, setTiffinPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getAllTiffinPlans()
            .then((data) => {
                setTiffinPlans(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load plans.");
                setLoading(false);
            });
    }, []);

    return (
        loading ? (
            <div className="loader-container">
                <ClipLoader color="#ff6600" size={70} />
            </div>
        ) : (
            <Base>
                <div className="subscription-container">
                    <h2 className="title">Subscription Plans</h2>

                    {error ? (
                        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
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
                                            <li></li>
                                        )}
                                    </ul>
                                    <p className="plan-price">₹{plan.price}/month</p>
                                    <button
                                        className="choose-btn"
                                        onClick={() => navigate(`/subscriptionbyid/${plan.tiffinPlanId}`)}
                                    >
                                        View Plan
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Base>
        )
    );
};

export default Subscription;
