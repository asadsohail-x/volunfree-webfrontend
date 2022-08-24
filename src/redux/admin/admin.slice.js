import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import reducers from "./admin.reducers";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    data: {},
    error: "",
    isLoggedIn: false
  },
  reducers,
});

export const { startRequest, endRequest, set, err, clear, markAsLoggedIn } = adminSlice.actions;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginAsync = (email, password) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const reqData = { email, password };

    const response = await axios.post("admin/login", reqData, config);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      // store token
      dispatch(set(data.admin));
      dispatch(endRequest());
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(err("Something went wrong"));
  }
};

export default adminSlice.reducer;
