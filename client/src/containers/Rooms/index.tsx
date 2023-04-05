import { useSocket } from "@/context/socket";
import { useRef } from "react";

import { EVENTS } from "@/utils/constants";

const RoomsContainer: React.FC = () => {
  const { socket, rooms, roomId } = useSocket();
  const newRoomRef = useRef<HTMLInputElement>(null);

  function handleRoomCreate() {
    if (newRoomRef.current) {
      const newRoomName = newRoomRef.current.value || "";

      if (!newRoomName.trim().length) {
        return;
      }

      socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName: newRoomName });
      newRoomRef.current.value = "";
    }
  }

  function onJoinRoom(room: string) {
    if (room === roomId) {
      return;
    }

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, room);
  }

  return (
    <nav>
      <div>
        <input placeholder="Enter room name" ref={newRoomRef} />
        <button onClick={handleRoomCreate}>Create Room</button>
      </div>
      {Object.keys(rooms).map((roomKey) => {
        return (
          <div key={roomKey}>
            {rooms[roomKey].name}
            <button
              disabled={roomKey === roomId}
              onClick={() => {
                onJoinRoom(roomKey);
              }}
            >
              Join
            </button>
          </div>
        );
      })}
    </nav>
  );
};

export default RoomsContainer;
