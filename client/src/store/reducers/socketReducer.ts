import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRoom {
  [key: string]: {
    name: string;
  };
}

interface IMessage {
  message: string;
  username: string;
  time: string;
}

export interface ISocketState {
  roomId: string;
  rooms: IRoom;
  messages: IMessage[];
}

const initialState: ISocketState = {
  roomId: "",
  rooms: {},
  messages: [],
};

const socketSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRoomId: (state: ISocketState, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setRooms: (state: ISocketState, action: PayloadAction<IRoom>) => {
      state.rooms = action.payload;
    },
    setMessages: (state: ISocketState, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { setRoomId, setRooms, setMessages } = socketSlice.actions;
export default socketSlice.reducer;
