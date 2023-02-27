import React, { useEffect, useContext, useState } from "react";
import { Col, Container, Form, InputGroup, Button } from "react-bootstrap";
import ClientList from "../components/ClientList";
import { fetchClients } from "../http/clientAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Pages from "../components/Pages";

const Contacts = observer(() => {
  const { client }: any = useContext(Context);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchClients(1, 3).then((data) => {
      client.setClients(data.rows);
      client.setTotalCount(data.count);
    });
  }, [client]);
  // Must change limit in fetchClients and _limit in ClientStore both
  useEffect(() => {
    fetchClients(client.page, 1000).then((data) => {
      client.setClients(data.rows);
      client.setTotalCount(data.count);
    });
  }, [client, client.page]);

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  if (search.length > 0) {
    client.clients.filter((client: { name: string }) => {
      return client.name.match(search);
    });
  }

  return (
    <Container>
      <Col md={12}>
        <Form className="m-2">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Поиск"
              aria-label="Поиск"
              id="search"
              aria-describedby="basic-addon2"
              type="search"
              onChange={handleChange}
              value={search}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleChange}
              value={search}
            >
              Поиск
            </Button>
          </InputGroup>
        </Form>
        <ClientList search={search} />
        <Pages />
      </Col>
    </Container>
  );
});

export default Contacts;
