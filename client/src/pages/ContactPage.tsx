import React, { useContext, useEffect, useState } from "react";
import { Card, ListGroup, Container, Accordion, Button, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "..";
import { fetchOneClient } from "../http/clientAPI";

type Client = {
  updatedAt: any;
  name: string;
  discount: number;
  email?: string;
  phone?: number;
  id: number;
  createdAt: any;
  description?: string;
};

const ContactPage = () => {
  const {user}: any = useContext(Context);

  const [client, setClient] = useState<Client>({
    name: '',
    discount: 0,
    createdAt: '',
    updatedAt: '',
    id: 0
  });
  const [createdAtDate, setCreatedAtDate] = useState('');
  const [updatedAtDate, setUpdatedAtDate] = useState('');
  const {id} = useParams();

    useEffect(() => {
        fetchOneClient(id).then((data) => setClient(data))
    }, [id])

    useEffect(() => {
      const createDate = `${client.createdAt.slice(11, 13)}.${client.createdAt.slice(5, 7)}.${client.createdAt.slice(0, 4)}`;
      const updateDate = `${client.updatedAt.slice(11, 13)}.${client.updatedAt.slice(5, 7)}.${client.updatedAt.slice(0, 4)}`;
      
      setCreatedAtDate(createDate);
      setUpdatedAtDate(updateDate);
    }, [client.createdAt, client.updatedAt])

    console.log(client);
    console.log(client.createdAt);

    

      
      console.log(createdAtDate);

    

  console.log(user.user);
  return (
    <Container>

      <Accordion defaultActiveKey={['0']} alwaysOpen className="mt-2">
        <Accordion.Item eventKey="0">
          <Accordion.Header>О клиенте</Accordion.Header>
          <Accordion.Body>
            <Card border="primary">
        <Card.Header>
          <Card.Title>
            {client.name} 
          </Card.Title>
          </Card.Header> 
        <Card.Body>
          
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Телефон:<br/>
              <a style={{color: 'black'}} href={`tel:${client.phone}`}>{client.phone}</a>
            </ListGroup.Item>
            <ListGroup.Item>
              Почта:<br/>
              <a style={{color: 'black'}} href={`mailto:${client.email}`}>{client.email}</a></ListGroup.Item>
            <ListGroup.Item>
              Описание:<br/>
              {client.description}
            </ListGroup.Item>
            <ListGroup.Item>
              ID клиента:<br/>
              {client.id}
            </ListGroup.Item>
            <ListGroup.Item>
              Карточка создана:<br/>
              {createdAtDate}
            </ListGroup.Item>
            {client.createdAt === client.updatedAt 
              ?
              <ListGroup.Item>
                Карточка не обновлялась
              </ListGroup.Item>
              :
              <ListGroup.Item>
                Карточка обновлена:<br/>
                {updatedAtDate}
              </ListGroup.Item>
            }
          </ListGroup>
        </Card.Body>
      </Card>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Действия</Accordion.Header>
          <Accordion.Body>
            <Stack gap={2} className="col-md-5 mx-auto">
              <Button variant="secondary" disabled>Поделиться контактом</Button>
              <Button variant="warning">Редактировать</Button>
              <Button variant="danger">Удалить</Button>
            </Stack>
            
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      
    </Container>
  );
};

export default ContactPage;
