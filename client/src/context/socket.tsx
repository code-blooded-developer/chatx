import { createContext, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";

import { AppStore, AppDispatch } from "@/store/store";

import {
  setRooms,
  setRoomId,
  setMessages,
} from "@/store/reducers/socketReducer";

import { EVENTS } from "@/utils/constants";

interface IContextType {
  socket: Socket;
}

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "");
const SocketContext = createContext<IContextType>({
  socket,
});

function SocketProvider(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { messages } = useSelector((state: AppStore) => ({
    messages: state.socket.messages,
  }));

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    dispatch(setRooms(value));
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    dispatch(setRoomId(value));
    dispatch(setMessages([]));
  });

  socket.on(EVENTS.SERVER.RECEIVED_MSG, ({ message, username, time }) => {
    dispatch(setMessages([...messages, { message, username, time }]));
  });

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
      {...props}
    />
  );
}

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
