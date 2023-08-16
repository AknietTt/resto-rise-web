import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { refreshAccessToken } from "../../../utils/authUtils";
import { Button, Input } from "antd";

function BranchEdit() {
  const { branchId } = useParams();
  const [branch, setBranch] = useState();

  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  let isFormChanged = true;

  const fetchBranch = async () => {
    let response;
    const accessToken = localStorage.getItem("access_token");

    try {
      response = await axios.get(
        "https://localhost:7242/api/Branch/get/" + branchId,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAddress(response.data.address);
      setCity(response.data.city);

      setBranch(response.data);
      return response;
    } catch (error) {
      return {
        status: 401,
      };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetchBranch();

      if (response.status === 401) {
        const refreshTokenSuccess = await refreshAccessToken();
        if (refreshTokenSuccess) {
          await fetchBranch();
        }
      }
    };
    fetchData();
  }, []);
  const handleEditClick = () =>{

  }
  return (
    <div>
      {branch === undefined ? (
        <p>Пусто</p>
      ) : (
        <div>
          <div>
            <p style={{ margin: "10px 0px 0px 0px" }}>Адрес</p>
            <Input
              type="text"
              value={ branch.address}
              style={{ margin: "0px 0px 10px 0px" }}
            />
            <p style={{ margin: "10px 0px 0px 0px" }}>Город</p>
            <Input
              type="text"
              value={branch.city}
              style={{ margin: "0px 0px 10px 0px" }}
            />
          </div>
          <Button
            type="primary"
            onClick={() => handleEditClick(branch.id)}
            disabled={!isFormChanged}
          >
            Изменить
          </Button>
        </div>
      )}
    </div>
  );
}

export default BranchEdit;
