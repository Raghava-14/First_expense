import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // import useNavigate
import '../styles.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Attempting to log in with:', formData); // Debug log

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
      }

      const data = await response.json();
      console.log('Login response data:', data); // Debug log

      // Assuming your API sends back a token on successful login
      if (data.token) {
        console.log('Login Success:', data); // Debug success
        localStorage.setItem('token', data.token); // Save token
        navigate('/dashboard'); // Navigate to another route, adjust as needed
      } else {
        console.log('Login Failed:', data); // Debug failure
        // Handle login failure (e.g., show an error message)
      }
    } catch (error) {
      console.error('Login Error:', error);
      // Handle fetch or network error (e.g., show an error message)
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input className="form-input" type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input className="form-input" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button className="form-button" type="submit">Login</button>
        <Link className="form-link" to="/signup">New user? Sign up here</Link>
      </form>
    </div>
  );
}

export default Login;
