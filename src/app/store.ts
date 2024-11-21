import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth";


const store = configureStore({
  reducer: {
    auth: auth,
  },
});


export type RootState = ReturnType<typeof store.getState>;  // Obtient le type de l'état global
export type AppDispatch = typeof store.dispatch;  // Type pour le dispatch

export default store;