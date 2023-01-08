// Path: ClientApp/src/screens/front/Home.jsx

import React from "react";
import { useSocketIO } from "../../features/socket/SocketContext.jsx";
import { useUserContext } from "../../features/auth/UserContext.jsx";

const HomeScreen = () => {
  const { socket, adminSocket } = useSocketIO();
  const { userToken } = useUserContext();

  return (
    <>
      <h2>Home Component</h2>
      {
        <div>
          <p>
            Socket status:{" "}
            <b>
              {socket?.connected ? (
                <span style={{ color: "green" }}>Connected</span>
              ) : (
                <span style={{ color: "red" }}>Disconnected</span>
              )}
              , <i>{socket?.id}</i>
            </b>
          </p>
          <p>
            Admin socket status:{" "}
            <b>
              {adminSocket?.connected ? (
                <span style={{ color: "green" }}>Connected</span>
              ) : (
                <span style={{ color: "red" }}>Disconnected</span>
              )}
              , <i>{adminSocket?.id}</i>
            </b>
          </p>
        </div>
      }
      <p>User token: {userToken}</p>
    </>
  );
};

export default HomeScreen;
