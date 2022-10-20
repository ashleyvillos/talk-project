import { AppState } from "../store";

export const rtkSelector = (state: AppState) => state["users-rtk"].users;