import { createSlice } from "@reduxjs/toolkit";
import reducers from "./orgTypes.reducers";

import { axiosGet, axiosPut, axiosPatch, axiosDelete } from "../../api/axiosHelper";

export const orgTypesSlice = createSlice({
  name: "orgTypes",
  initialState: {
    isLoading: false,
    orgTypes: [],
    source: [],
  },
  reducers,
});

export const { startRequest, endRequest, set, del, err, add, update, filter } =
  orgTypesSlice.actions;

export const getAsync = () => async (dispatch) => {
  try {
    dispatch(startRequest());
    const response = await axiosGet("org-types/get-all");

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(set(data.orgTypes));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(err("Something went wrong"));
  }
};

export const addAsync = (name) => async (dispatch) => {
  try {
    dispatch(startRequest());

    // need to call an API to the photo-bucket

    // omitting icon from the request
    const reqData = { name };

    const response = await axiosPut("org-types/add", reqData);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(add(data.orgType));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(err("Something went wrong"));
  }
};

export const updateAsync = (name, id) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const reqData = { id, name };

    const response = await axiosPatch("org-types/update", reqData);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(update(data.orgType));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(err("Something went wrong"));
  }
};

export const delAsync = (id) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const response = await axiosDelete(`org-types/delete/${id}`);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(del(id));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(err("Something went wrong"));
  }
};

export default orgTypesSlice.reducer;
