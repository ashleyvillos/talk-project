import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";


export const STORE_NAME = "users-rtk";
const hydrate = createAction(HYDRATE);

// Type for our state
interface IUser {
  id: number;
  name: string;
  username: number;
}
interface UserState {
  users: IUser[]
}

// Initial state
export const initialState: UserState = {
  users: [],
};

// Actual Slice
export const slice = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => ({
      ...state,
      ...(action.payload?.[STORE_NAME] as unknown as Partial<UserState>),
    }))
  },
});

export const { setUser } = slice.actions;