import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slice/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));

    navigate("dashboard/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: 400,
          padding: 24,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
        }}
      >
        <h2 style={{ marginBottom: 24 }}>Войти</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Email">
            <Input type="email" name="email" onChange={handleChange} required />
          </Form.Item>
          <Form.Item label="Пароль">
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              onClick={handleSubmit}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
        <p style={{ textAlign: "center" }}>
          У вас есть аккуант?{" "}
          <Link to="http://localhost:3000/reg">Регистрация</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
