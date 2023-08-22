import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRestaurant } from "../../../redux/slice/restaurantSlice";

function RestaurantCreate() {
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const ownerId = +userId;
    dispatch(createRestaurant({ ...values, owner: ownerId }));
    navigate(`/dashboard/${userId}/restaurants`)
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
