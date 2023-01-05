// Path: ClientApp/src/features/socket/SocketContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { Manager, Socket } from "socket.io-client";
import { useUserContext } from "../auth/UserContext.jsx";
import { v4 as uuidv4 } from "uuid";

export interface SocketState {
  socket: Socket | null;
  adminSocket: Socket | null;
}

let clientID = localStorage.getItem("clientID") ?? null;
if (!clientID) {
  clientID = uuidv4();
  localStorage.setItem("clientID", clientID);
}

const manager = new Manager(process.env.VITE_WS_HOST, {
  autoConnect: false,
  query: {
    clientID,
  },
});

const initialState: SocketState = {
  socket: null,
  adminSocket: null,
};

const SocketContext = createContext<SocketState>(initialState);

type Props = {
  children?: React.ReactNode;
};

export const SocketProvider = ({ children }: Props) => {
  const { userToken } = useUserContext();

  const [wsState, setWsState] = React.useState<SocketState>(initialState);

  useLayoutEffect(() => {
    wsState.socket?.disconnect();

    const socket = manager.socket("/");
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected");
      setWsState((prev) => ({ ...prev, socket }));
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setWsState((prev) => ({ ...prev, socket: null }));
    });

    return () => {
      wsState.socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    wsState.adminSocket?.disconnect();

    if (userToken) {
      console.log("Connecting adminSocket");
      const adminSocket = manager.socket("/admin", {
        auth: {
          token: userToken,
        },
      });
      adminSocket.connect();

      adminSocket.on("connect", () => {
        console.log("Admin socket connected");
        setWsState((prev) => ({ ...prev, adminSocket }));
      });

      adminSocket.on("disconnect", () => {
        console.log("Admin socket disconnected");
        setWsState((prev) => ({ ...prev, adminSocket: null }));
      });
    }

    return () => {
      wsState.adminSocket?.disconnect();
    };
  }, [userToken]);

  return (
    <SocketContext.Provider value={wsState}>{children}</SocketContext.Provider>
  );
};

export const useSocketIO = () => useContext<SocketState>(SocketContext);
