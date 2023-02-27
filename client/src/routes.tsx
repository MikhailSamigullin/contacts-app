import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import ContactPage from "./pages/ContactPage";
import Contacts from "./pages/Contacts";
import {
  ADMIN_ROUTE,
  CONTACTS_ROUTE,
  CONTACT_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/constants";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: CONTACTS_ROUTE,
    Component: Contacts,
  },
  {
    path: CONTACT_ROUTE + "/:id",
    Component: ContactPage,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
];
