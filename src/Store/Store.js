import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AdminSlice } from "./Slice/AdminSlice";
import { ClientSlice } from "./Slice/ClientSlice";
import { DoctorSlice } from "./Slice/DoctorSlice";

const persistConfigAdmin = { key: "admin", storage, version: 1 };
const persistConfigClient = { key: "client", storage, version: 1 };   
const persistConfigDoctor = { key: "doctor", storage, version: 1 };   



const clientPersistedReducer = persistReducer(
    persistConfigClient,
    ClientSlice.reducer
);

const AdminPersisteReducer = persistReducer(
    persistConfigAdmin,
    AdminSlice.reducer
);

const DocterPersistReducer = persistReducer(
    persistConfigDoctor,
  DoctorSlice.reducer
); 

export const store = configureStore({
  reducer: {
    clientLogin: clientPersistedReducer,
    adminLogin: AdminPersisteReducer,
    doctorLogin: DocterPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor= persistStore(store)