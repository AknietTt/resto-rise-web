import React, { useState, useEffect } from "react";
import { refreshAccessToken } from "../../../utils/authUtils";
import axios from "axios";
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, ReadOutlined, EditOutlined } from "@ant-design/icons";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const userId = localStorage.getItem("user_id");

  const fetchRestaurants = async () => {
    const accessToken = localStorage.getItem("access_token");
    let response;
    try {
      response = await axios.get(
        `https://localhost:7242/api/Restaurant/getAll?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setRestaurants(response.data);
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
    }
  };
  const fetchRestaurantsDelete = async (id) => {
    const accessToken = localStorage.getItem("access_token");
    let response;
    try {
      response = await axios.delete(
        `https://localhost:7242/api/Restaurant/delete?restaurantId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      await fetchRestaurants();
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
    }
  };
  const handleDeleteClick = async (id) => {
    let response = await fetchRestaurantsDelete(id);
    if (response.status === 401) {
      const refreshTokenSuccess = await refreshAccessToken();
      if (refreshTokenSuccess) {
        await fetchRestaurantsDelete(id);
      } else {
        console.error("Failed to refresh access token.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await fetchRestaurants(accessToken);
        console.log(response);
        if (response.status === 401) {
          const refreshTokenSuccess = await refreshAccessToken();
          if (refreshTokenSuccess) {
            await fetchRestaurants();
          } else {
            console.error("Failed to refresh access token.");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "16px", fontSize: "24px" }}>Рестораны</h2>
      <div style={{ textAlign: "right", marginBottom: "16px" }}>
        <Link to="create-restaurant">
          <Button type="primary" size="large">
            Создать
          </Button>
        </Link>
      </div>
      <Row gutter={[16, 16]}>
        {restaurants.map((restaurant, index) => (
          <Col span={24} key={index}>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                boxSizing: "border-box",
              }}
            >
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <img
                    alt={restaurant.name}
                    src={restaurant.image}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </Col>
                <Col span={16}>
                  <h3 style={{ fontSize: "20px" }}>{restaurant.name}</h3>
                  <p>{restaurant.description}</p>
                  <p>Количество филиалов: {restaurant.branches}</p>
                  <Link to={`/dashboard/restaurant/${restaurant.id}/branches`}>
                    <Button type="primary" style={{ marginRight: "8px" }}>
                      Филиалы
                    </Button>
                  </Link>
                  <Button
                    type="dashed"
                    icon={<ReadOutlined />}
                    style={{ marginTop: "8px" }}
                  >
                    Меню
                  </Button>

                  <Link to={`/dashboard/restaurant/${restaurant.id}/edit`}>
                    <Button
                      type="dashed"
                      icon={<EditOutlined />}
                      style={{ marginLeft: "8px" }}
                    >
                      Изменить
                    </Button>
                  </Link>

                  <Button
                    style={{
                      marginLeft: "10px",
                      background: "red",
                      color: "white",
                    }}
                    onClick={() => handleDeleteClick(restaurant.id)}
                    icon={<DeleteOutlined />}
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RestaurantList;
