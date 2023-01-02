// Path: frontend/src/features/socket/SocketMiddleware.tsx

import { Middleware } from "redux";
import io from "socket.io-client";
import {
  authorizedConnectionEstablished,
  connectionEstablished,
  startAuthorizedConnection,
  startConnection,
  stopAuthorizedConnection,
  stopConnection,
} from "./socketSlice.jsx";

export const socketMiddleware: Middleware = (store) => {
  return (next) => (action) => {
    const { connection, authorizedConnection } = store.getState().socket;
    const canStartConnection =
      !connection?.isEstablishingConnection && !connection?.isConnected;
    const canStartAuthorizedConnection =
      !authorizedConnection?.isEstablishingConnection &&
      !authorizedConnection?.isConnected;

    if (startConnection.match(action) && canStartConnection) {
      let socket = io(process.env.VITE_WS_HOST);
      socket.on("connect", () => {
        store.dispatch(connectionEstablished(socket.id));
      });
      socket.on("disconnect", () => {
        store.dispatch(stopConnection());
      });
    }

    if (
      startAuthorizedConnection.match(action) &&
      canStartAuthorizedConnection
    ) {
      const userToken = store.getState().auth.userToken;
      let adminSocket = io(`${process.env.VITE_WS_HOST}/admin`, {
        auth: {
          token: userToken,
        },
      });
      adminSocket.on("connect", () => {
        store.dispatch(authorizedConnectionEstablished(adminSocket.id));
      });
      adminSocket.on("disconnect", () => {
        store.dispatch(stopAuthorizedConnection());
      });
    }

    next(action);
  };
};
