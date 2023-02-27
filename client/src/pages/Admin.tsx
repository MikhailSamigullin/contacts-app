import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Tab, Tabs } from "react-bootstrap";
import CreateClient from "../components/modals/CreateClient";
import ClientChart from "../components/ClientChart";
import { fetchClients } from "../http/clientAPI";
// import { fetchUsers } from "../http/userApi";
import { Context } from "..";
import { createDataCliets, exportToXlsx } from "../utils/clientHelper";
import ImportXlxs from "../components/ImportXlxs";
import UsersList from "../components/UsersList";

const Admin = () => {
  const [clientVisible, setClientVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  //@ts-ignore

  const {user}: any = useContext(Context)
  const {client}: any = useContext(Context)
  const [key, setKey]: any = useState('home');
  const data: any = [];
  //@ts-ignore
  // const [role, setRole]: any = useState(false);

  

  useEffect(() => {
    fetchClients(1, 1000).then(data => {
      client.setClients(data.rows)
      client.setTotalCount(data.count)
      
      })
  }, [client])



console.log(user)
// console.log(user.users)



  createDataCliets(client, data);

  return (
    <Container className=""> 
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(key) => setKey(key)}
      className="mb-3 mt-3"
      >
        <Tab eventKey="home" title="Статистика">
          <ButtonGroup aria-label="Basic example" className="m-1">
            <Button variant="primary" disabled>Всего клиентов:</Button>
            <Button variant="outline-info" disabled>{client.totalCount}</Button>
          </ButtonGroup>
          {data.map((item: any) => {
            let clientSiffix = '';
            let lastNumber = item.value.toString().split('').pop();
            if (lastNumber === '1') {
              clientSiffix = 'клиент';
            } else if (lastNumber > 1 || lastNumber < 5) {
              clientSiffix = 'клиента';
            } else {
              clientSiffix = 'клиентов';
            }
            return (
              <ButtonGroup key={item.name} aria-label="Basic example" className="m-1">
                <Button variant="primary" disabled>Скидка {item.name}%:</Button>
                <Button variant="outline-info" disabled>{item.value} {clientSiffix}</Button>
              </ButtonGroup>
            )
          })}

          <ClientChart />
          
        </Tab>
        <Tab eventKey="profile" title="Действия">
          <Button variant="outline-dark" onClick={() => setClientVisible(true)}>Добавить клиента</Button>
          <CreateClient show={clientVisible} onHide={() => setClientVisible(false)}/>
          {visible 
          ?
          <>
          <Button variant="dark" className="m-2" onClick={() => setVisible(false)}>Закрыть</Button> 
          <Button variant="outline-dark" onClick={() => exportToXlsx(client.clients, "clients")}>Экспорт клиентов</Button>
          <ImportXlxs />
          </>
          :
          <>
          <Button variant="outline-dark" className="m-2" onClick={() => setVisible(true)}>Импорт Клиентов</Button>
          <Button variant="outline-dark" onClick={() => exportToXlsx(client.clients, "clients")}>Экспорт клиентов</Button>
          </>
          }
        </Tab>
          <Tab eventKey="contact" title="Настройки">
            <UsersList />
        </Tab>  
    </Tabs>
    </Container>
  );
};

export default Admin;
