import React, {  useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Row, Col, Empty } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteBranch, fetchBranches } from "../../../redux/slice/branchSlice";

function BranchList() {
  const { restaurantId } = useParams(); 
  const branches = useSelector((state) => state.branches.branches)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBranches(restaurantId))
  }, [dispatch]);
  
  return (
    <div>
      <div style={{ textAlign: "right", marginBottom: "16px" }}>
        <Link to={`branch-create`}>
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
                          to={`/dashboard/restaurant/40/branch/${branch.id}/edit`}
                        >
                          <EditOutlined /> Изменить
                        </Link>
                      </Button>
                      <Button
                        style={{ background: "red", color: "white" }}
                        onClick={() => dispatch(deleteBranch(branch.id))}
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
