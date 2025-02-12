import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../../Services/UserService';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendOtp = () => {
    if (!email) {
      toast.error("Please enter your email ID.");
      return;
    }

    sendOtp(email)
      .then((response) => {
        console.log("OTP Sent Successfully:", response);
        toast.success("OTP sent to your email. Please check your inbox.");
        navigate('/verify-otp');  // Redirecting to OTP verification page
      })
      .catch((error) => {
        console.error("Error Sending OTP:", error);
        toast.error(error.response?.data?.message || "Failed to send OTP.");
      });
  };

  return (
    <div className="forget-password-page">
      <h2>Reset Password</h2>
      <p>Enter your registered email address to receive a reset link.</p>
      <input
        type="email"
        placeholder="Enter Email ID"
        value={email}
        onChange={handleEmailChange}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
};

export default forgetpassword;
