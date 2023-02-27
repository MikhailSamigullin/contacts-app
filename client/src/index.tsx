//@ts-nocheck

import { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ClientStore from "./store/ClientStore";
import UserStore from "./store/UserStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      client: new ClientStore(),
    }}
  >
    <App />
  </Context.Provider>
);
