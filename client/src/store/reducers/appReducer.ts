import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAppState {
  username: string;
}

const initialState: IAppState = {
  username: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUsername: (state: IAppState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = appSlice.actions;
export default appSlice.reducer;
