import React, { useState, useContext } from "react";
import { Card, Container, Form, Button, Stack } from "react-bootstrap";
import { CONTACTS_ROUTE, LOGIN_ROUTE, WAITING_ROUTE } from "../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../http/userApi";
import { Context } from "..";

const Auth = () => {
  const location = useLocation();
  const {user}: any = useContext(Context);
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const click = async () => {
    
    if (isLogin) {
      try {
        //@ts-ignore
        // const response = await registration(email, password, role = 'USER');
        // user.setIsAuth(true);
        navigate(WAITING_ROUTE);
      } catch(e: Error | any) {
        setError(e.response.data.message);
      }
      
    } else {
      try {
        //@ts-ignore
        const response = await login(email, password);
        user.setIsAuth(true);
        navigate(CONTACTS_ROUTE);
      } catch(e: Error | any) {
        setError(e.response.data.message);
      }      
    }
    
  }
  console.log(user)
  return (
    <Container 
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}>
      <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">{isLogin ? "Регистрация" : "Авторизация"}</h2>
        <Form className="d-flex flex-column mt-4">
          <Stack direction="vertical" gap={3}>
            <Form.Control placeholder="Введите email..." value={email} onChange={e => setEmail(e.target.value)}/>
            <Form.Control placeholder="Введите пароль..." value={password} onChange={e => setPassword(e.target.value)} type="password"/>
            <Form.Text className="text-danger">
              {error}
            </Form.Text>
              <Stack direction="horizontal" gap={3}>
                {isLogin ?
                <>
                  <h6> Регистрация в данный момент отключена</h6>
                  <Button className="ms-auto" variant={"outline-success"} onClick={click}>Регистрация</Button>
                </>
                :
                <>
                  <Button className="ms-auto" variant={"outline-success"} onClick={click}>Войти</Button>
                </>
                }
              
              </Stack>

          </Stack>
        </Form>
      </Card>
      
    </Container>
  );
};

export default Auth;
