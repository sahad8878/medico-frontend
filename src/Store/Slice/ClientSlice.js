import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: null,
  name: null,
  token: null,
  count:null,
};
export const ClientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.client = action.payload.client;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.count = action.payload.count;
    },
    setLogout: (state, action) => {
      state.client = null;
      state.name = null;
      state.token = null;
      state.count = null;
    },
  },
});

export const { setLogin, setLogout } = ClientSlice.actions;
export default ClientSlice.reducer;