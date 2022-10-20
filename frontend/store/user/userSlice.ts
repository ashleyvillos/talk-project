import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getUserDetails } from "./userAction";

export const STORE_NAME = "users";
const hydrate = createAction(HYDRATE);

// Type for our state
export interface IUser {
  id: number;
  name: string;
  username: number;
}
export interface UserState {
  loading: boolean,
  users: IUser[]
}

// Initial state
const initialState: UserState = {
  loading: false,
  users: [],
};

// Actual Slice
export const userSlice = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    // setUser(state, action: PayloadAction<IUser[]>) {
    //   state.users = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => ({
      ...state,
      ...(action.payload?.[STORE_NAME] as unknown as Partial<UserState>),
    }))
    .addCase(getUserDetails.pending, (state, action) => {
      state.loading = true
    })
    .addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
    })
  },
});

// export const { setUser } = userSlice.actions;/