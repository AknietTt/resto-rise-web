import React, { useEffect } from "react";
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, ReadOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurants,
  deleteRestaurant,
} from "../../../redux/slice/restaurantSlice";

const RestaurantList = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants.restaurants);
  
  const user = useSelector((state)=>state.user.user)
  useEffect(() => {
    
    console.log(user);
    const fetchData = async () => {
      dispatch(fetchRestaurants({ userId: user.id }));
    };

    fetchData();
  }, [dispatch]);

 
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
                  <Link to={`/dashboard/restaurant/${restaurant.id}/menu`}>
                  <Button
                     type="dashed"
                     icon={<ReadOutlined />}
                     style={{ marginTop: "8px" }}
                     >
                    Меню
                  </Button>
                    </Link>

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
                    onClick={() =>  dispatch(deleteRestaurant({restaurantId: restaurant.id , userId:user.id}))}
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
