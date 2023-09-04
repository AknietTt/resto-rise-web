import React from 'react';
import { useSelector } from 'react-redux';
import { Card, List } from 'antd';

function Profile() {
  const user = useSelector((state) => state.user.user);
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>Профиль пользователя</h2>
      <Card title="Информация о пользователе">
        <List
          itemLayout="horizontal"
          dataSource={[
            { label: 'Имя', value: user.firstName },
            { label: 'Фамилия', value: user.lastName },
            { label: 'Отчество', value: user.middleName },
            { label: 'Email', value: user.email },
            { label: 'Имя пользователя', value: user.userName },
            { label: 'Роли', value: user.roles.join(', ') },
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.label}
                description={item.value}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default Profile;
