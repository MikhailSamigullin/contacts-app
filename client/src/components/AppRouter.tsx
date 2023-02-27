import React, { useContext } from "react";
import {Routes, Route} from 'react-router-dom';
import { ADMIN_ROUTE, CONTACTS_ROUTE, CONTACT_ROUTE, INDEX_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, WAITING_ROUTE } from "../utils/constants";
import Auth from "../pages/Auth";
import Admin from "../pages/Admin";
import Contacts from "../pages/Contacts";
import ContactPage from "../pages/ContactPage";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const AppRouter: any = observer(() => {
  const {user}: any =  useContext(Context);

  return (
    <Routes>
      {user.isAuth && 
        <>
          <Route path={ADMIN_ROUTE} element={<Admin />} />
          <Route path={CONTACTS_ROUTE} element={<Contacts />} />
          <Route path={CONTACT_ROUTE + '/:id'} element={<ContactPage />} />
        </>
      }
      {
        <>
          <Route path={REGISTRATION_ROUTE} element={<Auth />} />
          <Route path={LOGIN_ROUTE} element={<Auth />} />
          <Route path={INDEX_ROUTE} element={<Auth />} />
          <Route path={WAITING_ROUTE} element={<Auth />} />
        </>
      }
    </Routes>
  );  
});

export default AppRouter;
