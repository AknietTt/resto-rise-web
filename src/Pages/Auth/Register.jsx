import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserAsync } from "../../Requests/authRequests";
import { Button, Input } from "antd";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    repeatPassword: "",
  });

  const isFormValid = Object.values(formData).every((value) => value !== "");

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleRegisterClick =async ()  => {
    if (isFormValid) {
      let response = await  registerUserAsync(formData);
      if(response?.status === 200){
        navigate("/");
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          padding: 20,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
        }}
      >
        <Input
          placeholder="Имя"
          value={formData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Фамилия"
          value={formData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Отчество"
          value={formData.middleName}
          onChange={(e) => handleInputChange("middleName", e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Имя пользователя"
          value={formData.userName}
          onChange={(e) => handleInputChange("userName", e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          type="password"
          placeholder="Повторите пароль"
          value={formData.repeatPassword}
          onChange={(e) => handleInputChange("repeatPassword", e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Button
          type="primary"
          onClick={handleRegisterClick}
          disabled={!isFormValid}
          style={{ width: "100%" }}
        >
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
}

export default Register;
