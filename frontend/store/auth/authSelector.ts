import { AppState } from "../store";

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectCounter = (state: AppState) => state.auth.counter;