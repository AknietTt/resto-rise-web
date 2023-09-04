import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { fetchMe, loginUser } from "../../redux/slice/authSlice";
import { Typography } from "antd";

const { Text } = Typography;

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    message:"",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      if (!value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        setErrors({ ...errors, email: "Некорректный email" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        setErrors({
          ...errors,
          password: "Пароль должен содержать минимум 6 символов",
        });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.email === "" || formData.password === "") {
      return;
    }
    if (errors.email || errors.password) {
      return;
    }

    const res =  await dispatch(loginUser(formData));

    if (res.error?.message === "Rejected") {
      setErrors({...errors , message:"Не правильный логин или пароль"})
      return;
    }
    dispatch(fetchMe());
    navigate("dashboard/");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#031cffbb",
      }}
    >
      <div
        style={{
          width: 400,
          padding: 24,
          boxShadow: "0px 15px 20px rgba(0, 0, 0, 0.5)",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      >
        <Text strong style={{ fontSize: 24 }}>
          Войти
        </Text>
        {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
        <Form onSubmit={handleSubmit} style={{ marginTop: "25px" }}>
          <Form.Item
            label="Email"
            hasFeedback
            validateStatus={errors.email ? "error" : ""}
          >
            <Input type="email" name="email" onChange={handleChange} required />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </Form.Item>
          <Form.Item
            label="Пароль"
            hasFeedback
            validateStatus={errors.password ? "error" : ""}
          >
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", fontFamily: "" }}
              onClick={handleSubmit}
              disabled={!!errors.email || !!errors.password}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <Text>
            У вас есть аккаунт?{" "}
            <Link to="http://localhost:3000/reg">Регистрация</Link>
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Login;
