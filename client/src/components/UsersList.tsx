//@ts-ignore
import React, { useEffect, useState } from "react";
//@ts-ignore
import { Button, Card, Container, Dropdown, Stack } from 'react-bootstrap';
import { deleteOneUser, fetchUsers, updateUserRole } from "../http/userApi";

// import { Context } from "..";

import { observer } from 'mobx-react-lite';


const UsersList = observer(() => {

  const [users, setUsers]: any = useState([]);
  const [isRoleChanged, setIsRoleChanged]: any = useState(false);
  console.log(users)

  useEffect(() => {
    updateUsersState();
  }, [])

  const updateUsersState = () => {
    fetchUsers().then((data: any ) => {
      setUsers(data);
      
      })
  }

  if (isRoleChanged) {
    updateUsersState();
    setIsRoleChanged(false)
  }


  return (
    <Container className="mt-3" style={{display: 'flex', justifyItems: 'between', flexWrap: 'wrap'}}>
      {users.map((user: any) => (
        <Card key={user.id} style={{ width: '18rem', margin: 10 }}>
          <Card.Body>
            <Card.Title>{user.email}</Card.Title>
            <Card.Text>
              ID: {user.id}
              <br/>
              Роль: {user.role}
              <br/>
              Создано: {user.createdAt}
            </Card.Text>
            <Stack direction="horizontal" gap={2}>
              <Dropdown>
                <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                  Изменить роль
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item 
                    href="#/action-1" 
                    onClick={() => {updateUserRole(user.id, {role: 'USER'});
                    setIsRoleChanged(true)

                    }}>
                      User
                  </Dropdown.Item>
                  <Dropdown.Item 
                    href="#/action-2" 
                    onClick={() => {updateUserRole(user.id, {role: 'ADMIN'});
                    setIsRoleChanged(true)


                    }}>
                      Admin
                    </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="outline-danger" onClick={() => {deleteOneUser(user.id);
              
              }}>Удалить</Button>
            </Stack>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
});

export default UsersList;
