import { createSlice } from "@reduxjs/toolkit";
import reducers from "./admin.reducers";

import { axiosPut, axiosPost } from "../../api/axiosHelper";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    data: {},
    error: "",
    isLoggedIn: false,
  },
  reducers,
});

export const { startRequest, endRequest, set, err, clear, markAsLoggedIn } =
  adminSlice.actions;

export const loginAsync = (email, password) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const reqData = { email, password };

    const response = await axiosPost("admin/login", reqData);

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
