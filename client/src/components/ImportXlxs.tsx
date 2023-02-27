import React, { useState } from "react";

import { Button, Card, Container, Form, Stack } from 'react-bootstrap';

import { observer } from 'mobx-react-lite';
//@ts-ignore
import * as XLSX from 'xlsx/xlsx.mjs';

import { addClients } from "../utils/clientHelper";

const ImportXlxs = observer(() => {
  const [items, setItems] = useState([]);

  const readExcel = (file: any) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e: any) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        console.log(data);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d: any) => {
      setItems(d);
    });
  };

  console.log(items)

const clearFormAndData = () => {
  const form: any = document.getElementsByTagName('input') as any;
  form[0].value = ""
  setItems([]);
}

  return (

        <Container className="mt-3">
          <Form.Group controlId="formFile" className="mb-2">
            <Form.Control 
              type="file" 
              onChange={(e: any) => {
                const file: any = e.target.files[0];
                readExcel(file);
              }}/>
          </Form.Group>
          <Stack direction="horizontal" gap={2}>
            <Button variant="outline-success" onClick={() => addClients(items)}>Сохранить</Button>
            <Button variant="outline-info" onClick={() => clearFormAndData()}>Нормализация данных</Button>
            <Button variant="outline-danger" onClick={() => clearFormAndData()}>Удалить файл</Button>
          </Stack>
          <Container className="mt-3" style={{display: 'flex', justifyItems: 'between', flexWrap: 'wrap'}}>
          {items.map((item: any) => (
        <Card style={{ width: '18rem', margin: 10 }}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              Скидка: {item.discount}%
              <br/>
              Телефон: {item.phone}
              <br/>
              Почта: {item.email}
              <br/>
              Описание: {item.description}

            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      </Container>
    </Container>

  );
});

export default ImportXlxs;
