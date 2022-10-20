import { configureStore, Middleware } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { userSlice } from "./user/userSlice";
import { createWrapper } from "next-redux-wrapper";
import { apiSlice } from "./user-rtk/api";
import { slice } from "./user-rtk/slice";
import baseQueryAPI from "./base-api-query";

const storeMiddlewares: Middleware[] = [];
storeMiddlewares.push(baseQueryAPI.middleware);

  export const makeStore = () => {
    const store = configureStore({
      reducer: {
        [authSlice.name]: authSlice.reducer,
        [userSlice.name]: userSlice.reducer,
        [slice.name]: slice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
      },
      devTools: true,
      middleware: (getDefaultMiddleWare) => {
        return getDefaultMiddleWare().concat(...storeMiddlewares)
      }
    });
    return store;
  };

  export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Store = ReturnType<typeof store.getState>;
export type ReduxStore = typeof store;

export const wrapper = createWrapper<ReduxStore>(makeStore);