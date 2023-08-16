import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { refreshAccessToken } from "../../../utils/authUtils";
import { useNavigate } from "react-router-dom";

function RestaurantCreate() {
  const [loading, setLoading] = useState(false);
  const ownerId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const createRestaurant = async (values, accessToken) => {
    let response;
    try {
      setLoading(true);
      response = await axios.post(
        "https://localhost:7242/api/Restaurant/add",
        {
          ...values,
          owner: ownerId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Restaurant created:", response.data);
      return response;
    } catch (error) {
      response = {
        data: null,
        status: 401,
        statusText: "Unauthorized",
        headers: {},
        config: error.config,
      };

      console.error("Error fetching orders:", response);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    let accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("Access token not found.");
      return;
    }

    let response = await createRestaurant(values, accessToken);
    if (response.status === 200 || response.status === 204) {
      navigate("/dashboard/restaurants");
    }
    
    if (response.status === 401) {
      const refreshTokenSuccess = await refreshAccessToken();

      if (refreshTokenSuccess) {
        accessToken = localStorage.getItem("access_token");
        response =  await createRestaurant(values, accessToken);
        if(response.status === 200){
          navigate("/dashboard/restaurants");
        }
      } else {
        console.error("Failed to refresh access token.");
      }
    }
  };

  return (
    <div>
      <h2>Создание ресторана</h2>
      <Form onFinish={onFinish}>
        <Form.Item label="Название" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Картинка" name="image" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Создать
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RestaurantCreate;
