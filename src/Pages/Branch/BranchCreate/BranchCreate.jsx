import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBranch } from "../../../redux/slice/branchSlice";
const { Option } = Select;

function BranchCreate() {
  const [cityOptions, setCityOptions] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { restaurantId , userId} = useParams();
  const dispatch = useDispatch()

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


  const onFinish = async (values) => {
    dispatch(createBranch({...values , restaurantId} ))
    navigate(`/dashboard/restaurant/${restaurantId}/branches`)
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
