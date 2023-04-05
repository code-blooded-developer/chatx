import { EVENTS } from "@/utils/constants";
import { createContext, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";

interface Message {
  message: string;
  username: string;
  time: string;
}

interface IContextType {
  socket: Socket;
  username: string;
  setUsername: Function;
  roomId: string;
  rooms: {
    [key: string]: {
      name: string;
    };
  };
  messages: Message[];
  setMessages: Function;
}

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "");
const SocketContext = createContext<IContextType>({
  socket,
  username: "",
  setUsername: () => false,
  roomId: "",
  rooms: {},
  messages: [],
  setMessages: () => false,
});

function SocketProvider(props: any) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState<Message[]>([]);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);
    setMessages([]);
  });

  socket.on(
    EVENTS.SERVER.RECEIVED_MSG,
    ({ message, username, time }: Message) => {
      setMessages([...messages, { message, username, time }]);
    }
  );

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        roomId,
        rooms,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
