import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { refreshAccessToken } from "../../../utils/authUtils";
import { Button, Row, Col, Empty } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function BranchList() {
  const { restaurantId } = useParams(); // Получаем идентификатор ресторана из URL
  const [branches, setBranches] = useState([]);

  const fetchGetBranches = async (accessToken) => {
    let response;
    try {
      if (!accessToken) {
        console.error("Access token not found.");
        return;
      }
      console.log(restaurantId);
      response = await axios.get(
        `https://localhost:7242/api/Branch/restaurant/${restaurantId}/branches`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setBranches(response.data);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await fetchGetBranches(accessToken);
        console.log(response);
        if (response.status === 401) {
          const refreshTokenSuccess = await refreshAccessToken();
          if (refreshTokenSuccess) {
            const accessToken = localStorage.getItem("access_token");
            await fetchGetBranches(accessToken);
          } else {
            console.error("Failed to refresh access token.");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [restaurantId]);

  const deleteBranch = async (branchId) => {
    const accessToken = localStorage.getItem("access_token");

    try {
      const response = await axios.delete(
        `https://localhost:7242/api/Branch/delete/${branchId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      return {
        status: 401,
      };
    }
  };

  const handleDeleteClick = async (branchId) => {
    const currentBranches = branches;

    const response = await deleteBranch(branchId);

    if (response.status === 200) {
      console.log("200");
      const newBranches = currentBranches.filter((b) => b.id !== branchId);
      setBranches(newBranches);
    }

    if (response.status === 401) {
      const refreshSuccess = await refreshAccessToken();
      console.log("401");
      if (refreshSuccess) {
        const newAccessToken = localStorage.getItem("access_token");
        const newResponse = await fetchGetBranches(newAccessToken);
        setBranches(newResponse.data);
      }
    }
  };

  return (
    <div>
      <div style={{ textAlign: "right", marginBottom: "16px" }}>
        <Link to={`/dashboard/restaurants/${restaurantId}/branch-create`}>
          <Button type="primary" size="large" style={{ marginRight: "16px" }}>
            Создать
          </Button>
        </Link>
      </div>
      {branches.length < 1 ? (
        <Empty description="Нет филиалов" />
      ) : (
        <div>
          <h2>Филиалы {branches[0].restaurant} </h2>
          <Row gutter={[16, 16]}>
            {branches.map((branch, index) => (
              <Col span={24} key={index}>
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={16}>
                      <h3 style={{ fontSize: "20px" }}>{branch.address}</h3>
                      <p>{branch.city}</p>
                      <p>{branch.restaurant}</p>
                    </Col>
                    <Col span={8} style={{ textAlign: "right" }}>
                      <Button type="primary" style={{ marginRight: "8px" }}>
                        <Link
                          to={`/dashboard/restaurants/${restaurantId}/branches/${branch.id}/edit`}
                        >
                          <EditOutlined /> Изменить
                        </Link>
                      </Button>
                      <Button
                        style={{ background: "red", color: "white" }}
                        onClick={() => handleDeleteClick(branch.id)}
                      >
                        <DeleteOutlined /> Удалить
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default BranchList;
