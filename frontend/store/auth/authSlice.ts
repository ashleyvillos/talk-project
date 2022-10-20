import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const STORE_NAME = "auth";
const hydrate = createAction(HYDRATE);

// Type for our state
export interface AuthState {
  authState: boolean;
  counter: number;
}

// Initial state
const initialState: AuthState = {
  authState: false,
  counter: 0
};

// Actual Slice
export const authSlice = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<boolean>) {
      state.authState = action.payload;
    },
    setIncrement(state, action: PayloadAction<number>) {
      state.counter = action.payload + 1;
    },
    setDecrement(state, action: PayloadAction<number>) {
      state.counter = action.payload - 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => ({
      ...state,
      ...(action.payload?.[STORE_NAME] as unknown as Partial<AuthState>),
    }));
  },
});

export const { setAuthState, setIncrement, setDecrement } = authSlice.actions;