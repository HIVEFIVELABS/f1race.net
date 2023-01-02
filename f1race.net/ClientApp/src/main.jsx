import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { UserContextProvider } from "./features/auth/UserContext.jsx";
import { SocketProvider } from "./features/socket/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContextProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </UserContextProvider>
    </Provider>
  </React.StrictMode>
);
