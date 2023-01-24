import React, { useState, useContext } from "react";
import { Card, Container, Form, Button, Stack } from "react-bootstrap";
import { CONTACTS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/constants";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../http/userApi";
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
        const response = await login(email, password);
        user.setIsAuth(true);
        navigate(CONTACTS_ROUTE);
      } catch(e: Error | any) {
        setError(e.response.data.message);
      }
      
    } else {
      try {
        //@ts-ignore
        const response = await registration(email, password);
        user.setIsAuth(true);
        navigate(CONTACTS_ROUTE);
      } catch(e: Error | any) {
        setError(e.response.data.message);
      }      
    }
    
  }
  return (
    <Container 
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}>
      <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
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
                  <NavLink style={{ color: 'black' }} to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                  <Button className="ms-auto" variant={"outline-success"} onClick={click}>Войти</Button>
                </>
                :
                <>
                  <NavLink style={{ color: 'black' }} to={LOGIN_ROUTE}>Войти</NavLink>
                  <Button className="ms-auto" variant={"outline-success"} onClick={click}>Регистрация</Button>
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
