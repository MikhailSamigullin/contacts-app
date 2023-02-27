import React, { useState, useEffect} from "react";
import { Button, FormControl, Modal, Form, Stack } from "react-bootstrap";
import { updateOneClient } from "../../http/clientAPI";

const UpdateClient = ({id, name, email, phone, description, discount, show, onHide, onUpdate}: any) => {
  const [clientName, setClientName] = useState('');
  const [clientDiscount, setClientDiscount] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientDescription, setClientDescription] = useState('');
  
  useEffect(() => {
    setClientName(name)
    setClientDiscount(discount)
    setClientPhone(phone)
    setClientEmail(email)
    setClientDescription(description)
    
  }, [description, discount, email, name, phone])
  

const updateClient = () => {
    const formData = new FormData()
    formData.set('id', id)
    formData.set('name', clientName)
    formData.set('email', clientEmail)
    formData.set('phone', clientPhone)
    formData.set('description', clientDescription)
    formData.set('discount', clientDiscount)
    updateOneClient(formData).then(_data => onHide())
    onUpdate();
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
          Редактировать данные клиента: {clientName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack direction="vertical" gap={3}>
            <FormControl 
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              placeholder={"Введите ФИО клиента"}/>
            <FormControl 
              value={clientDiscount}
              onChange={e => setClientDiscount(e.target.value)}
              placeholder={"Введите скидку"}/>
            <FormControl 
              value={clientPhone}
              onChange={e => setClientPhone(e.target.value)}
              placeholder={"Введите телефон"}/>
            <FormControl 
              value={clientEmail}
              onChange={e => setClientEmail(e.target.value)}
              placeholder={"Введите email"}/>
            <FormControl 
              value={clientDescription}
              onChange={e => setClientDescription(e.target.value)}
              placeholder={"Введите описание"}/>
          </Stack>
        </Form>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={updateClient}>Добавить</Button>

      </Modal.Footer>
    </Modal>
  );
};

export default UpdateClient;
