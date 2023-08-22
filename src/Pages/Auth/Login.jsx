import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://localhost:7242/api/Account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();

      document.cookie = `access_token=${data.token}; path=/`;
      document.cookie = `refresh_token=${data.refreshToken}; path=/`;

      window.location.href = `/dashboard/${data.id}`;
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ width: 400, padding: 24, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: 8 }}>
      <h2 style={{ marginBottom: 24 }}>Войти</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Email">
          <Input type="email" name="email"  onChange={handleChange} required />
        </Form.Item>
        <Form.Item label="Пароль">
          <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} onClick={handleSubmit}>
            Войти
          </Button>
        </Form.Item>
      </Form>
      <p style={{ textAlign: 'center' }}>
        У вас есть аккуант? <Link to="http://localhost:3000/reg">Регистрация</Link>
      </p>
    </div>
  </div>
  );
}

export default Login;
