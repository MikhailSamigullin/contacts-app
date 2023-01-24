import React, { useContext } from "react";
import { observer } from 'mobx-react-lite';
import { Context } from "..";
import { Row, Accordion } from "react-bootstrap";
import ClientItem from "./ClientItem";
import { searchEngine } from "../utils/searchEngine"

const ClientList = observer((props: any) => {
  const {client}:any = useContext(Context);
  const search: any = props.search;
  let searchedClients: any[] = [];
  
  searchEngine(search, searchedClients, client.clients, 'client');

  return (
    <Row className="d-flex flex-row justify-content-center">
        { 
        searchedClients.map(client => 
          <Accordion defaultActiveKey={['0']} alwaysOpen key={client.id}>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{client.discount}% {client.name}</Accordion.Header>
        <Accordion.Body>
          <ClientItem key={client.id} client={client}/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>


          )
        }
    </Row>
  );
});

export default ClientList;
