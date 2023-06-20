import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: null,
  name: null,
  token: null,
};

export const DoctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.doctor = action.payload.doctor;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.doctor = null;
      state.name = null;
      state.token = null;
      localStorage.removeItem('doctorToken')
    },
  },
});

export const { setLogin, setLogout } = DoctorSlice.actions;
export default DoctorSlice.reducer;