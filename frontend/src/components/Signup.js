import React, { useState } from 'react';
import '../styles.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); // For debugging purposes
      // Handle success or navigate to another page
      // You might want to save the token somewhere if you're logging in directly after signing up
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input className="form-input" type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input className="form-input" type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input className="form-input" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input className="form-input" type="text" name="name" placeholder="Name" onChange={handleChange} />
        <button className="form-button" type="submit">Sign Up</button>
      </form>
    </div>
    
  );
}

export default Signup;
