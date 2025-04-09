import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addSubscription, getTiffinPlanById } from "../../Services/subscriptionservice";
import ClipLoader from "react-spinners/ClipLoader";
import './subscriptionbyid.css';
import { getUserInfo, isLoggedIn } from "../../components/Auth";
import { toast } from "react-toastify";
import Base from "../../components/Base/Base";

const Subscriptionbyid = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = getUserInfo();

  const [subscriptionData, setSubscriptionData] = useState({
    startDate: '',
    endDate: '',
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    breakFast: false,
    lunch: false,
    dinner: false
  });

  const chnageHandler = (e) => {
    const { id, value, type, checked } = e.target;
    setSubscriptionData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  }

  useEffect(() => {
    console.log(subscriptionData)
  }, [subscriptionData])

  useEffect(() => {
    setLoading(true);
    getTiffinPlanById(id)
      .then((data) => {
        setPlan(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load plan.");
        setLoading(false);
      });
  }, [id]);

  console.log(plan);

  const addSubscriptionHandler = (event) => {
    event.preventDefault();

    if (!isLoggedIn()) {
      toast.error("Plase login first to subscribe to a plan..");
      return
    }

    setLoading(true);

    addSubscription(user.userId, id, subscriptionData).then((response) => {
      console.log(response);
      toast.success("Subscribtion added successfully...!")
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
      console.log(error);
    })
  }

  return (
    <Base>
      <div className="plan-details-container">
        {loading ? (
          <div className="loader-container">
            <ClipLoader color="#ff6600" size={70} />
          </div>
        ) : (
          <div className="plan-details">
            {error && <p style={{ color: "red" }}>{error}</p>}

            {plan && (

              <form style={{width:'90%', marginTop:'10px'}}>
                <div className="plan-info">
                <h3>Subscription Plan</h3>
                  <div className="plan-inputs">
                    <label htmlFor="planName">Plan name</label>
                    <input type="text" id="planName" value={plan.planName} readOnly />
                  </div>

                  <div className="plan-inputs">
                    <label htmlFor="planType">Plan type</label>
                    <input type="text" id="planType" value={plan.planType} readOnly />
                  </div>

                  <div className="plan-inputs">
                    <label htmlFor="planAddons">Add ons</label>
                    <input type="text" id="planAddons" value={plan.addOns} readOnly />
                  </div>

                  <div className="plan-inputs">
                    <label htmlFor="planPrice">Price</label>
                    <input type="text" id="planPrice" value={plan.price} readOnly />
                  </div>
                  <div className="plan-inputs">
                    <label htmlFor="startDate">Start Date</label>
                    <input type="date" id="startDate" onChange={chnageHandler} value={subscriptionData.startDate} />
                  </div>

                  <div className="plan-inputs">
                    <label htmlFor="endDate">End Date</label>
                    <input type="date" id="endDate" onChange={chnageHandler} value={subscriptionData.endDate} />
                  </div>

                  <div className="plan-checkbox">
                    <label htmlFor="" style={{ marginRight: '10px' }}>Select Tiffin options: </label>
                    <div className="checkbox-item">
                      <input type="checkbox" id="breakFast" onChange={chnageHandler} checked={subscriptionData.breakFast} />
                      <label htmlFor="breakFast">Breakfast</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="lunch" onChange={chnageHandler} checked={subscriptionData.lunch} />
                      <label htmlFor="lunch">Lunch</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="dinner" onChange={chnageHandler} checked={subscriptionData.dinner} />
                      <label htmlFor="dinner">Dinner</label>
                    </div>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Breakfast</th>
                      <th>Thali</th>
                      <th>Dinner</th>
                      <th>Select weekday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan?.tiffinDays.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.weekDay}</td>
                        {[0, 1, 2].map((meal) => (
                          <td key={meal}>{item?.menuItem?.[meal]?.menuName}</td>
                        ))}
                        <td>
                          <input
                            type="checkbox"
                            id={item.weekDay.toLowerCase()}
                            checked={subscriptionData[item.weekDay.toLowerCase()]}
                            onChange={chnageHandler}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="plan-buttons">
                  <button className="plan-button" type="submit" onClick={addSubscriptionHandler}>Subscribe Plan</button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </Base>
  );
};

export default Subscriptionbyid;
