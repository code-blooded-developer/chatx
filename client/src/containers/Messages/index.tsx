import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppStore, AppDispatch } from "@/store/store";

import { setMessages } from "@/store/reducers/socketReducer";

import { useSocket } from "@/context/socket";
import { EVENTS } from "@/utils/constants";

const MessagesContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { username, roomId, messages } = useSelector((state: AppStore) => ({
    username: state.app.username,
    roomId: state.socket.roomId,
    messages: state.socket.messages,
  }));

  const { socket } = useSocket();

  const newMessageRef = useRef<HTMLTextAreaElement>(null);

  if (!roomId) {
    return <div />;
  }

  function onMessageSend() {
    if (newMessageRef.current) {
      const message = newMessageRef.current?.value;
      if (!message.trim().length) {
        return;
      }

      socket.emit(EVENTS.CLIENT.SEND_MESSAGE, { username, roomId, message });

      const today = new Date();
      dispatch(
        setMessages([
          ...messages,
          {
            username,
            message,
            time: `${today.getHours()}:${today.getMinutes()}`,
          },
        ])
      );

      newMessageRef.current.value = "";
    }
  }

  return (
    <div>
      {messages.map(({ message }, index) => {
        return <div key={index}>{JSON.stringify(message)}</div>;
      })}

      <div>
        <textarea placeholder="Enter Message" ref={newMessageRef}></textarea>
        <button onClick={onMessageSend}>Send Message</button>
      </div>
    </div>
  );
};

export default MessagesContainer;
