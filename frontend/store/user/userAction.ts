import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
// import { setUser } from "./userSlice";

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { dispatch, getState, rejectWithValue }) => {
    try {
      const store = getState();
      console.log('store', store);
      const data = await axios.get(`https://63438d663f83935a78552378.mockapi.io/user`)
      // dispatch(setUser(data.data))
      return data.data
      
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)