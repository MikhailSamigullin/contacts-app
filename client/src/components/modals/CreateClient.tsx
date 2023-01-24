import React, { useState } from "react";
import { Button, FormControl, Modal, Form, Stack } from "react-bootstrap";
// import { Context } from "../..";
import { createClient } from "../../http/clientAPI";

const CreateClient = ({show, onHide}: any) => {
  // const {client}:any = useContext(Context);
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

const addClient = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('discount', discount)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('description', description)
    createClient(formData).then(_data => onHide())
}

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить нового клиента
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack direction="vertical" gap={3}>
            <FormControl 
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={"Введите ФИО клиента"}/>
            <FormControl 
              value={discount}
              onChange={e => setDiscount(e.target.value)}
              placeholder={"Введите скидку"}/>
            <FormControl 
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder={"Введите телефон"}/>
            <FormControl 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={"Введите email"}/>
            <FormControl 
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={"Введите описание"}/>
          </Stack>
        </Form>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addClient}>Добавить</Button>

      </Modal.Footer>
    </Modal>
  );
};

export default CreateClient;
