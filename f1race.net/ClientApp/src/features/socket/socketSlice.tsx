// PATH: frontend/src/features/socket/socketSlice.tsx

import { createSlice } from "@reduxjs/toolkit";

export interface SocketConnectionState {
  socketID: string | null;
  isEstablishingConnection: boolean;
  isConnected: boolean;
  error: string | null;
}

export interface SocketState {
  connection: SocketConnectionState | null;
  authorizedConnection: SocketConnectionState | null;
}

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
      state.connection.isEstablishingConnection = true;
    },
    connectionEstablished: (state, action) => {
      state.connection.isEstablishingConnection = false;
      state.connection.isConnected = true;
      state.connection.socketID = action.payload;
    },
    stopConnection: (state) => {
      state.connection.isEstablishingConnection = false;
      state.connection.isConnected = false;
      state.connection.socketID = null;
    },
    startAuthorizedConnection: (state) => {
      state.authorizedConnection.isEstablishingConnection = true;
    },
    authorizedConnectionEstablished: (state, action) => {
      state.authorizedConnection.isEstablishingConnection = false;
      state.authorizedConnection.isConnected = true;
      state.authorizedConnection.socketID = action.payload;
    },
    stopAuthorizedConnection: (state) => {
      state.authorizedConnection.isEstablishingConnection = false;
      state.authorizedConnection.isConnected = false;
      state.authorizedConnection.socketID = null;
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
