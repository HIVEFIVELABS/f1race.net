// Path: ClientApp/src/features/socket/socketSlice.tsx

import { createSlice } from "@reduxjs/toolkit";

export interface SocketConnectionState {
  socketID: string | null;
  isEstablishingConnection: boolean;
  isConnected: boolean;
  error: string | null;
}

export type SocketState = {
  connection: SocketConnectionState | null;
  authorizedConnection: SocketConnectionState | null;
};

const initialState: SocketState = {
  connection: {
    socketID: null,
    isEstablishingConnection: false,
    isConnected: false,
    error: null,
  },
  authorizedConnection: {
    socketID: null,
    isEstablishingConnection: false,
    isConnected: false,
    error: null,
  },
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    startConnection: (state) => {
      if (state.connection) {
        state.connection.isEstablishingConnection = true;
      }
    },
    connectionEstablished: (state, action) => {
      if (state.connection) {
        state.connection.isEstablishingConnection = false;
        state.connection.isConnected = true;
        state.connection.socketID = action.payload;
      }
    },
    stopConnection: (state) => {
      if (state.connection) {
        state.connection.isEstablishingConnection = false;
        state.connection.isConnected = false;
        state.connection.socketID = null;
      }
    },
    startAuthorizedConnection: (state) => {
      if (state.authorizedConnection) {
        state.authorizedConnection.isEstablishingConnection = true;
      }
    },
    authorizedConnectionEstablished: (state, action) => {
      if (state.authorizedConnection) {
        state.authorizedConnection.isEstablishingConnection = false;
        state.authorizedConnection.isConnected = true;
        state.authorizedConnection.socketID = action.payload;
      }
    },
    stopAuthorizedConnection: (state) => {
      if (state.authorizedConnection) {
        state.authorizedConnection.isEstablishingConnection = false;
        state.authorizedConnection.isConnected = false;
        state.authorizedConnection.socketID = null;
      }
    },
  },
});

export const {
  startConnection,
  connectionEstablished,
  stopConnection,
  startAuthorizedConnection,
  authorizedConnectionEstablished,
  stopAuthorizedConnection,
} = socketSlice.actions;

const socketReducer = socketSlice.reducer;

export default socketReducer;
