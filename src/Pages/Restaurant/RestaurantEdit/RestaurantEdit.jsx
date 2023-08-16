import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Input, Button } from "antd";

import { refreshAccessToken } from "../../../utils/authUtils";

function RestaurantEdit() {
  const [restaurant, setRestaurant] = useState();
  const { restaurantId } = useParams();

  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedImage, setEditedImage] = useState("");

  const [isFormChanged, setIsFormChanged] = useState(false);
  const navigate = useNavigate();

  const fetchRestaurant = async () => {
    let response;
    const accessToken = localStorage.getItem("access_token");
    try {
      response = await axios.get(
        "https://localhost:7242/api/Restaurant/get/Restaurant/" + restaurantId,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setRestaurant(response.data);
      setEditedName(response.data.name);
      setEditedImage(response.data.image);
      setEditedDescription(response.data.description);

      return response;
    } catch (error) {
      return (response = {
        status: 401,
      });
    }
  };

  const fetchEditRestaurant = async (restaurantId) => {
    let response;
    const accessToken = localStorage.getItem("access_token");
    try {
      response = await axios.put(
        "https://localhost:7242/api/Restaurant/update/" + restaurantId,
        {
          id: restaurantId,
          name: editedName,
          description: editedDescription,
          image: editedImage,
          owner: localStorage.getItem("user_id"),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setRestaurant(response.data);
      return response;
    } catch (error) {
      return (response = {
        status: 401,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetchRestaurant();
      if (response.status === 401) {
        const refreshTokenSuccess = await refreshAccessToken();
        if (refreshTokenSuccess) {
          await fetchRestaurant();
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const isNameChanged = editedName !== restaurant?.name;
    const isDescriptionChanged = editedDescription !== restaurant?.description;
    const isImageChanged = editedImage !== restaurant?.image;
    setIsFormChanged(isNameChanged || isDescriptionChanged || isImageChanged);
  }, [editedName, editedDescription, editedImage, restaurant]);

  const handleEditClick = async (restaurantId) => {
    let response = await fetchEditRestaurant(restaurantId);
    if (response.status === 401) {
      const refreshTokenSuccess = await refreshAccessToken();
      if (refreshTokenSuccess) {
        await fetchEditRestaurant(restaurantId);
      }
    }
    if(response.status === 200){
      navigate(`/dashboard/restaurants`)
    }
  };

  return (
    <div>
      {restaurant === undefined ? (
        <p>Пусто</p>
      ) : (
        <div>
          <div>
            <p style={{ margin: "10px 0px 0px 0px" }}>Название</p>
            <Input
              type="text"
              value={editedName || restaurant.name}
              onChange={(e) => setEditedName(e.target.value)}
              style={{ margin: "0px 0px 10px 0px" }}
            />
            <p style={{ margin: "10px 0px 0px 0px" }}>Описание</p>
            <Input
              type="text"
              value={editedDescription || restaurant.description}
              onChange={(e) => setEditedDescription(e.target.value)}
              style={{ margin: "0px 0px 10px 0px" }}
            />
            <p style={{ margin: "10px 0px 0px 0px" }}>Фото</p>
            <Input
              type="text"
              value={editedImage || restaurant.image}
              onChange={(e) => setEditedImage(e.target.value)}
              style={{ margin: "0px 0px 10px 0px" }}
            />
          </div>
          <Button
            type="primary"
            onClick={() => handleEditClick(restaurant.id)}
            disabled={!isFormChanged}
          >
            Изменить
          </Button>
        </div>
      )}
    </div>
  );
}

export default RestaurantEdit;
