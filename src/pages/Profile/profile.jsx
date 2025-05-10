import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [resetForm, setResetForm] = useState({
    oldPassword: '',
    newPassword: '',
    cPassword: ''
  });
  const [email, setEmail] = useState('');

  // Fetch current user info
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('https://homeybites.onrender.com/api/v1/users/currentuser', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.error('Failed to load user:', err);
    });
  }, []);

  // Handle reset password input changes
  const handleResetChange = (e) => {
    setResetForm({ ...resetForm, [e.target.name]: e.target.value });
  };

  // Submit password reset
  const handleResetSubmit = () => {
    const token = localStorage.getItem('token');
    axios.post('https://homeybites.onrender.com/api/v1/users/reset-password', resetForm, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then(res => {
      alert(res.data.message);
      setResetForm({ oldPassword: '', newPassword: '', cPassword: '' });
    })
    .catch(err => {
      alert('Password reset failed');
      console.error(err);
    });
  };

  // Submit forget password
  const handleForgetPassword = () => {
    axios.post(`https://homeybites.onrender.com/api/v1/users/forget-password?username=${email}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then(res => {
      alert(res.data.message);
    })
    .catch(err => {
      alert('Forget password request failed');
      console.error(err);
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>👤 Profile Info</h2>
      {user ? (
        <div>
          <p><b>Name:</b> {user.firstName} {user.middleName} {user.lastName}</p>
          <p><b>Email:</b> {user.emailId}</p>
          <p><b>Phone:</b> {user.phoneNo}</p>
          <p><b>DOB:</b> {user.dob}</p>
          <p><b>Gender:</b> {user.gender}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      <hr />

      <div>
        <h3>🔒 Reset Password</h3>
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={resetForm.oldPassword}
          onChange={handleResetChange}
        /><br />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={resetForm.newPassword}
          onChange={handleResetChange}
        /><br />
        <input
          type="password"
          name="cPassword"
          placeholder="Confirm New Password"
          value={resetForm.cPassword}
          onChange={handleResetChange}
        /><br />
        <button onClick={handleResetSubmit}>Reset Password</button>
      </div>

      <hr />

      <div>
        <h3>❓ Forgot Password</h3>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <button onClick={handleForgetPassword}>Send OTP</button>
      </div>
    </div>
  );
};

export default Profile;
