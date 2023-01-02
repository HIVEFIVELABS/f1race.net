import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { UserContextProvider } from "./features/auth/UserContext";
import { SocketProvider } from "./features/socket/SocketContext";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
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
