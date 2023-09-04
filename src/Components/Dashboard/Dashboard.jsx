import React from "react";
import { UserOutlined, BarChartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Link, Routes, Route } from "react-router-dom";
import RestaurantList from "../../Pages/Restaurant/RestaurantList/RestaurantList";
import Profile from "../../Pages/Profile/Profile.jsx";
import BadgeIcon from "@mui/icons-material/Badge";
import RestaurantCreate from "../../Pages/Restaurant/RestaurantCreate/RestaurantCreate";
import BranchList from "../../Pages/Branch/BranchList/BranchList";
import BranchCreate from "../../Pages/Branch/BranchCreate/BranchCreate";
import RestaurantEdit from "../../Pages/Restaurant/RestaurantEdit/RestaurantEdit";
import BranchEdit from "../../Pages/Branch/BranchEdit/BranchEdit";
import RestaurantMenu from "../../Pages/Menu/RestaurantMenu";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const Dashboard = () => {
  let colorBgContainer = "#DCDCDC";
  return (
    <div>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["/profile"]}>
            <Menu.Item key="/profile" icon={<UserOutlined />}>
              <Link to="profile">Профиль</Link>
            </Menu.Item>

            <Menu.Item key={"/statistic"} icon={<BarChartOutlined />}>
              <Link to="statistic">Статистика</Link>
            </Menu.Item>

            <SubMenu
              key="restaurantSubMenu"
              icon={<RestaurantIcon />}
              title="Ресторан"
            >
              <Menu.Item key="/restaurants">
                <Link to={`restaurants`}>Рестораны</Link>
              </Menu.Item>
              <Menu.Item key="/restaurants/branches">
                <Link to="restaurants/branches">Филиалы</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key={"/employee"} icon={<BadgeIcon />}>
              <Link to="employee">Работники</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          style={{
            marginLeft: 200,
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          ></Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              overflow: "initial",
            }}
          >
            <Routes>
              <Route path="profile" element={<Profile />} />
              <Route path="restaurants" element={<RestaurantList />} />
              <Route
                path="restaurants/create-restaurant"
                element={<RestaurantCreate />}
              />

              <Route
                path="restaurant/:restaurantId/branches"
                element={<BranchList />}
              />

              <Route
                path="/restaurant/:restaurantId/edit"
                element={<RestaurantEdit />}
              />

              <Route
                path="restaurant/:restaurantId/branches/branch-create"
                element={<BranchCreate />}
              />

              <Route
                path="/restaurant/:restaurantId/branch/:branchId/edit"
                element={<BranchEdit />}
              />

              <Route
                path="/restaurant/:restaurantId/menu"
                element={<RestaurantMenu />}
              />

              <Route path="/*" element={<Profile />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
