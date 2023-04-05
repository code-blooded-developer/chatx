import { v4 as uuidv4 } from "uuid";
import { Server, Socket } from "socket.io";

const EVENTS = {
  CONNECTION: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_MESSAGE: "SEND_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    RECEIVED_MSG: "RECEIVED_MSG",
  },
};

const rooms: Record<string, { name: string }> = {};

export default function socket({ io }: { io: Server }) {
  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    console.log("User Connected", socket.id);

    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      const roomId = uuidv4();
      rooms[roomId] = {
        name: roomName,
      };
      socket.join(roomId);
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });

    socket.on(EVENTS.CLIENT.SEND_MESSAGE, ({ username, roomId, message }) => {
      const today = new Date();

      socket.to(roomId).emit(EVENTS.SERVER.RECEIVED_MSG, {
        username,
        message,
        time: `${today.getHours()}:${today.getMinutes()}`,
      });
    });

    socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
      socket.join(roomId);
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });
  });
}
