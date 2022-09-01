import { createSlice } from "@reduxjs/toolkit";
import reducers from "./organization.reducers";

import { axiosPost, axiosPut } from "../../api/axiosHelper";

export const organizationSlice = createSlice({
  name: "organization",
  initialState: {
    isLoading: false,
    data: {},
    error: "",
    isLoggedIn: false,
  },
  reducers,
});

export const { startRequest, endRequest, set, err, clear, markAsLoggedIn } =
  organizationSlice.actions;

export const loginAsync = (email, password) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const reqData = { email, password };

    const response = await axiosPost("organizations/login", reqData);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(set(data.organization));
      dispatch(endRequest());
    } else {
      dispatch(err(data.message));
      dispatch(endRequest(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(err("Something went wrong"));
  }
};

export const signupAsync = (reqData) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const response = await axiosPut("organizations/signup", reqData);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    console.log(data);

    if (data.success) {
      dispatch(set(data.organization));
      dispatch(endRequest());
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(err("Something went wrong"));
  }
};

export default organizationSlice.reducer;
