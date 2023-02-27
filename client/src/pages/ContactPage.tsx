import React, { useEffect, useState } from "react";
import { Card, ListGroup, Container, Accordion, Button, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import UpdateClient from "../components/modals/UpdateClient";
import { deleteOneClient, fetchOneClient } from "../http/clientAPI";
import { CONTACTS_ROUTE, CONTACT_ROUTE } from "../utils/constants";
import { CSVLink } from "react-csv";
import { normalizeDate } from "../utils/clientHelper";

export type Client = {
  updatedAt: any;
  name: string;
  discount: string;
  email?: string;
  phone?: string;
  id: number;
  createdAt: any;
  description?: string;
};

const ContactPage = () => {
  const [clientVisible, setClientVisible] = useState(false);
  const [client, setClient] = useState<Client>({
    name: '',
    discount: '',
    createdAt: '',
    updatedAt: '',
    id: 0
  });
  const [createdAtDate, setCreatedAtDate] = useState('');
  const [updatedAtDate, setUpdatedAtDate] = useState('');
  const [data, setData] = useState<string[][]>([]);
  const {id} = useParams();

  const navigate = useNavigate();

    useEffect(() => {
        fetchOneClient(id).then((data) => setClient(data))
        setData([
          ["name", "phone", "email", "discount", "description"],
          [`${client.name}`, `${client.phone}`, `${client.email}`, `${client.discount}`, `${client.description}`],

        ])
    }, [client.description, client.discount, client.email, client.name, client.phone, id])

    useEffect(() => {
      const createDate = normalizeDate(client.createdAt);
      const updateDate = normalizeDate(client.updatedAt);
      setCreatedAtDate(createDate);
      setUpdatedAtDate(updateDate);
    }, [client.createdAt, client.updatedAt])

    function deleteClient() {
      deleteOneClient(id);
      navigate(CONTACTS_ROUTE);
    }
    //@ts-ignore
    function updateClient() {
      fetchOneClient(id).then((data) => setClient(data))
      navigate(CONTACT_ROUTE + '/' + client.id);
    }
  return (
    <Container>
      <Accordion defaultActiveKey={['0']} alwaysOpen className="mt-2">
        <Accordion.Item eventKey="0">
          <Accordion.Header>О клиенте</Accordion.Header>
          <Accordion.Body>
            <Card border="primary">
        <Card.Header>
          <Card.Title>
            {client.name} {client.discount}% 
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
              <CSVLink
                data={data}
                filename={`${client.name} ${client.discount}%.csv`}
                className="btn btn-primary"
                target="_blank"
              >
                Скачать карточку клиента (CSV)
              </CSVLink>
              <Button variant="warning" onClick={() => setClientVisible(true)}>Редактировать</Button>
                <UpdateClient 
                  id={id} 
                  name={client.name}
                  email={client.email}
                  phone={client.phone}
                  description={client.description}
                  discount={client.discount}
                  show={clientVisible} 
                  onHide={() => setClientVisible(false)}
                  onUpdate={() => updateClient()}/>
              <Button variant="danger" onClick={() => deleteClient()}>Удалить</Button>
            </Stack>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default ContactPage;
