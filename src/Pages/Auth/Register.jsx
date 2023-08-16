import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const initialFormData = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    repeatPassword: '',
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://localhost:7242/api/Account/register-owner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate('/login'); 
        } else {
          console.log('Registration failed:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const isFormValid =
    formData.firstName &&
    formData.middleName &&
    formData.lastName &&
    formData.email &&
    formData.userName &&
    formData.password &&
    formData.repeatPassword === formData.password;

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div>
          <label>Middle Name:</label>
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>User Name:</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Repeat Password:</label>
          <input
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={!isFormValid}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
