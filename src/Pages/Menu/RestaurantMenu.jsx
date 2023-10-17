import React, { useState, useEffect } from "react";
import { Button, Modal, Upload, List, Card, Input, Form } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFood,
  fetchMenu,
  addFood,
  updateFood,
} from "../../redux/slice/menuSlice";
import { useParams } from "react-router-dom";
import "./RestaurantMenu.css";
import TextArea from "antd/es/input/TextArea";
function RestaurantMenu() {
  const dispatch = useDispatch();
  const menuData = useSelector((state) => state.menu.menu);
  const { restaurantId } = useParams();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFileSelectorVisible, setIsFileSelectorVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    price: "",
  });

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => {
    setIsModalVisible(false);
    setFormData({
      name: "",
      description: "",
      category: "",
      image: "",
      price: "",
    });
  };

  const showFileSelector = () => {
    setIsFileSelectorVisible(true);
  };

  const hideFileSelector = () => {
    setIsFileSelectorVisible(false);
  };

  const handleInputChange = (e) => {
  
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const showEditModal = (item) => {
    setFormData(item);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      image: "",
      price: "",
    })
    setIsEditModalVisible(false);
  };

  const handleUpdate = () => {
    if (formData) {
      const updatedItem = {
        ...formData,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        image: formData.image,
        price: parseFloat(formData.price),
      };

      dispatch(updateFood(updatedItem));

      closeEditModal();
    }
  };

  const handleExcelUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const menuFromExcel = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log(menuFromExcel);
      closeModal();
    };
    reader.readAsArrayBuffer(file);
  };

  const fallbackImageUrl =
    "https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666235469_24-mykaleidoscope-ru-p-fon-s-yedoi-pinterest-26.jpg";

  const handleAdd = () => {
    const newMenuItem = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      price: parseFloat(formData.price),
      restaurantId: +restaurantId,
    };

    dispatch(addFood({food:newMenuItem, restaurantId: +restaurantId}));

    closeModal();
  };

  useEffect(() => {
    dispatch(fetchMenu(restaurantId));
  }, [dispatch, restaurantId]);
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Restaurant Menu</h2>
      <div style={{ marginBottom: "20px" }}>
        <Button
          type="primary"
          onClick={showFileSelector}
          style={{ background: "#15b307" }}
        >
          Загрузить Excel
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginLeft: "10px" }}
          onClick={showModal}
        >
          Добавить
        </Button>
      </div>
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <List
          grid={{ gutter: 0, column: 1 }}
          dataSource={menuData}
          renderItem={(item) => (
            <List.Item style={{ marginBottom: "20px" }}>
              <Card
                title={item.name}
                extra={
                  <div>
                    <Button
                      type="default"
                      icon={<EditOutlined />}
                      style={{ marginRight: "5px" }}
                      onClick={() => showEditModal(item)}
                    />
                    <Button
                      onClick={() => {
                        dispatch(deleteFood(item.id));
                      }}
                      type="default"
                      icon={<DeleteOutlined />}
                    />
                  </div>
                }
                style={{ width: "95%" }}
              >
                <img
                  src={item.image || fallbackImageUrl}
                  alt={item.name}
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                />
                <p>Category: {item.category}</p>
                <p>Description: {item.description}</p>
                <p>Price: {item.price}</p>
              </Card>
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="Добавить блюдо"
        open={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Отмена
          </Button>,
          <Button key="add" type="primary" onClick={handleAdd}>
            Добавить
          </Button>,
        ]}
        bodyStyle={{ padding: "20px" }}
      >
        <Form>
          <Form.Item label="Название">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Описание">
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Категория">
            <Input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Картинка URL">
            <Input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Цена">
            <Input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Выберите файл Excel"
        open={isFileSelectorVisible}
        onCancel={hideFileSelector}
        footer={null}
        centered
        width={400}
        bodyStyle={{ padding: "24px" }}
        className="custom-modal"
      >
        <Upload
          accept=".xlsx, .xls"
          beforeUpload={(file) => {
            handleExcelUpload(file);
            hideFileSelector();
            return false;
          }}
        >
          <Button icon={<InboxOutlined />}>Выбрать файл Excel</Button>
        </Upload>
      </Modal>
      <Modal
        title="Изменить блюдо"
        open={isEditModalVisible}
        onCancel={closeEditModal}
        footer={[
          <Button key="cancel" onClick={closeEditModal}>
            Отмена
          </Button>,
          <Button key="update" type="primary" onClick={handleUpdate}>
            Обновить
          </Button>,
        ]}
        bodyStyle={{ padding: "20px" }}
      >
        <Form.Item label="Название">
          <Input
            type="text"
            name="name"
            value={formData ? formData.name : ""}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Описание">
          <Input
            type="text"
            name="description"
            value={formData ? formData.description : ""}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Категория">
          <Input
            type="text"
            name="category"
            value={formData ? formData.category : ""}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Цена">
          <Input
            type="text"
            name="price"
            value={formData ? formData.price : ""}
            onChange={handleInputChange}
          />
        </Form.Item>
      </Modal>
    </div>
  );
}

export default RestaurantMenu;
