import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import axios from "axios";
import { refreshAccessToken } from "../../../utils/authUtils";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

function BranchCreate() {
  const [cityOptions, setCityOptions] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  useEffect(() => {
    axios
      .get("https://localhost:7242/api/City/getAll")
      .then((response) => {
        setCityOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  const createBranch = async (values) => {
    let response;
    const accessToken = localStorage.getItem("access_token");
    try {
      response = await axios.post(
        "https://localhost:7242/api/Branch/create",
        {
          ...values
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      response = {
        data: null,
        status: 401,
        statusText: "Unauthorized",
        headers: {},
        config: error.config,
      };

      return response;
    }
  };

  const onFinish = async (values) => {
    const requestData = {
      address: values.address,
      cityId: values.cityId,
      restaurantId: restaurantId,
    };
    
    let response = await createBranch(requestData);

    if(response.status === 200 || response.status === 204){
        navigate(`/dashboard/restaurants/${restaurantId}/branches`)
    }
    if (response.status === 401) {
        const refreshTokenSuccess = await refreshAccessToken();
  
        if (refreshTokenSuccess) {
          response =  await createBranch(requestData);
          if(response.status === 200){
             navigate(`/dashboard/restaurants/${restaurantId}/branches`)
          }
        } else {
          console.error("Failed to refresh access token.");
        }
      }
  };
  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item
          label="Город"
          name="cityId"
          rules={[{ required: true, message: "Пожалуйста, выберите город" }]}
        >
          <Select>
            {cityOptions.map((city) => (
              <Option key={city.id} value={city.id}>
                {city.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Адрес"
          name="address"
          rules={[{ required: true, message: "Пожалуйста, введите адрес" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary" htmlType="submit">
            Создать филиал
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BranchCreate;
