import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CONTACT_ROUTE } from "../utils/constants";

const ClientItem = ({client}: any) => {
  const navigate = useNavigate();
  return (
    <Card border="primary" >
      <Card.Body>
        
        <ListGroup className="list-group">
          <ListGroup.Item>
            Телефон:<br/>
            <a style={{color: 'black'}} href={`tel:${client.phone}`}> {client.phone}</a>
          </ListGroup.Item>
          <ListGroup.Item>
            Почта:<br/>
            <a style={{color: 'black'}} href={`mailto:${client.email}`}>{client.email}</a></ListGroup.Item>
          <ListGroup.Item>
            Описание:<br/>
            {client.description}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer className="text-muted" onClick={() => navigate(CONTACT_ROUTE + '/' + client.id)}>
        <Link to={""} >
          Подробнее
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default ClientItem;
