// Path: frontend/src/features/socket/SocketContext.tsx
var _a;
import React, { createContext, useContext, useEffect, useLayoutEffect, } from "react";
import { Manager } from "socket.io-client";
import { useUserContext } from "../auth/UserContext.jsx";
import { v4 as uuidv4 } from "uuid";
let clientID = (_a = localStorage.getItem("clientID")) !== null && _a !== void 0 ? _a : null;
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
const initialState = {
    socket: null,
    adminSocket: null,
};
const SocketContext = createContext(initialState);
export const SocketProvider = ({ children }) => {
    const { userToken } = useUserContext();
    const [wsState, setWsState] = React.useState(initialState);
    useLayoutEffect(() => {
        var _a;
        (_a = wsState.socket) === null || _a === void 0 ? void 0 : _a.disconnect();
        const socket = manager.socket("/");
        socket.connect();
        socket.on("connect", () => {
            console.log("Socket connected");
            setWsState((prev) => (Object.assign(Object.assign({}, prev), { socket })));
        });
        socket.on("disconnect", () => {
            console.log("Socket disconnected");
            setWsState((prev) => (Object.assign(Object.assign({}, prev), { socket: null })));
        });
        return () => {
            var _a;
            (_a = wsState.socket) === null || _a === void 0 ? void 0 : _a.disconnect();
        };
    }, []);
    useEffect(() => {
        var _a;
        (_a = wsState.adminSocket) === null || _a === void 0 ? void 0 : _a.disconnect();
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
                setWsState((prev) => (Object.assign(Object.assign({}, prev), { adminSocket })));
            });
            adminSocket.on("disconnect", () => {
                console.log("Admin socket disconnected");
                setWsState((prev) => (Object.assign(Object.assign({}, prev), { adminSocket: null })));
            });
        }
        return () => {
            var _a;
            (_a = wsState.adminSocket) === null || _a === void 0 ? void 0 : _a.disconnect();
        };
    }, [userToken]);
    return (<SocketContext.Provider value={wsState}>{children}</SocketContext.Provider>);
};
export const useSocketIO = () => useContext(SocketContext);
//# sourceMappingURL=SocketContext.jsx.map