import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches, updateBranch } from "../../../redux/slice/branchSlice";

function BranchEdit() {
  const { branchId, restaurantId } = useParams();
  const branch = useSelector((state) =>
    state.branches.branches.find((branch) => branch.id === +branchId)
  );

  const dispatch = useDispatch();
  const [address, setAddress] = useState(branch ? branch.address : "");
  const [city, setCity] = useState(branch ? branch.city : "");
  const [isModified, setIsModified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (branch === undefined || branch === null) {
      dispatch(fetchBranches(restaurantId));
    } else {
      setAddress(branch.address);
      setCity(branch.city);
    }
  }, [branch, dispatch, restaurantId]);

  const handleInputChange = (inputName, inputValue) => {
    setIsModified(true);

    switch (inputName) {
      case "address":
        setAddress(inputValue);
        break;
      case "city":
        setCity(inputValue);
        break;
      default:
        break;
    }
  };

  const handleUpdateClick = () => {
    const updatedBranch = {
      ...branch,
      address: address,
      city: city,
    };
    dispatch(updateBranch(updatedBranch));
    navigate(-1);
  };

  return (
    <div>
      {branch === undefined ? (
        <p>Ошибка</p>
      ) : (
        <div>
          <div>
            <p style={{ margin: "10px 0px 0px 0px" }}>Адрес</p>
            <Input
              type="text"
              value={address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              style={{ margin: "0px 0px 10px 0px" }}
            />
            <p style={{ margin: "10px 0px 0px 0px" }}>Город</p>
            <Input
              type="text"
              value={city}
              onChange={(e) => handleInputChange("city", e.target.value)}
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

export default BranchEdit;
