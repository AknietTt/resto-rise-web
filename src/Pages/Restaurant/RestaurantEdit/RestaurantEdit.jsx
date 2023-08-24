import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants, updateRestaurant } from "../../../redux/slice/restaurantSlice";

function RestaurantEdit() {
  const { restaurantId, userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const restaurant = useSelector((state) =>
    state.restaurants.restaurants.find(
      (restaurant) => restaurant.id === +restaurantId
    )
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if(restaurant === undefined || restaurant === null){
      dispatch(fetchRestaurants())
    }
    if (restaurant) {
      setName(restaurant.name);
      setDescription(restaurant.description);
      setImage(restaurant.image);
    }
  }, [restaurant]);

  const handleInputChange = (inputName, inputValue) => {
    if (inputValue !== restaurant[inputName]) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }

    switch (inputName) {
      case "name":
        setName(inputValue);
        break;
      case "description":
        setDescription(inputValue);
        break;
      case "image":
        setImage(inputValue);
        break;
      default:
        break;
    }
  };

  const handleUpdateClick = () => {
    const updatedRestaurant = {
      ...restaurant,
      name: name,
      description: description,
      image: image,
    };
    dispatch(updateRestaurant(updatedRestaurant));
    navigate(`/dashboard/${userId}/restaurants`)
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
              value={name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              style={{ margin: "0px 0px 10px 0px" }}
            />
            <p style={{ margin: "10px 0px 0px 0px" }}>Описание</p>
            <Input
              type="text"
              value={description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              style={{ margin: "0px 0px 10px 0px" }}
            />
            <p style={{ margin: "10px 0px 0px 0px" }}>Фото</p>
            <Input
              type="text"
              value={image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              style={{ margin: "0px 0px 10px 0px" }}
            />
          </div>
          <Button
            type="primary"
            onClick={handleUpdateClick}
            disabled={!isModified}
          >
            Изменить
          </Button>
        </div>
      )}
    </div>
  );
}

export default RestaurantEdit;
