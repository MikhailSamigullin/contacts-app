import React, { useContext } from "react";
import { Context } from "..";
import { Navbar, Container, Nav, Button, Stack } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  CONTACTS_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  INDEX_ROUTE,
} from "../utils/constants";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const { user }: any = useContext(Context);
  const navigate = useNavigate();
  function logout() {
    user.setIsAuth(false);
    navigate(INDEX_ROUTE);
  }
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <NavLink style={{ color: "black" }} to={CONTACTS_ROUTE}>
          Контакты
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto">
            <Stack direction="horizontal" gap={2}>
              <Button
                variant="outline-dark"
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Админ панель
              </Button>
              <Button variant="outline-dark" onClick={() => logout()}>
                Выйти
              </Button>
            </Stack>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Stack direction="horizontal" gap={2}>
              <Button
                variant="outline-dark"
                onClick={() => navigate(LOGIN_ROUTE)}
              >
                Регистрация
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => navigate(REGISTRATION_ROUTE)}
              >
                Войти
              </Button>
            </Stack>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
