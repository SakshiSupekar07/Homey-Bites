import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTiffinPlanById } from "../../Services/subscriptionservice";
import ClipLoader from "react-spinners/ClipLoader";
import './subscriptionbyid.css';

const Subscriptionbyid = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="plan-details-container">
      {loading ? (
        <div className="loader-container">
          <ClipLoader color="#ff6600" size={70} />
        </div>
      ) : (
        <div className="plan-details">
          {error && <p style={{ color: "red" }}>{error}</p>}

          {plan && (
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
                    {[2,1,0].map((meal) => (
                      <td key={meal}>{item?.menuItem?.[meal]?.menuName}</td>
                    ))}
                    <td><input type="checkbox" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Subscriptionbyid;
