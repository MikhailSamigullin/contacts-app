import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateClient from "../components/modals/CreateClient";

const Admin = () => {
  const [clientVisible, setClientVisible] = useState(false);
  return (
    <Container className="d-flex flex-column"> 
      <Button variant="outline-dark" onClick={() => setClientVisible(true)}>Добавить клиента</Button>
      <CreateClient show={clientVisible} onHide={() => setClientVisible(false)}/>
    </Container>
  );
};

export default Admin;
