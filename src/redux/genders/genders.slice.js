import { createSlice } from "@reduxjs/toolkit";
import reducers from "./genders.reducer";

import { axiosGet, axiosPut, axiosPatch, axiosDelete } from "../../api/axiosHelper";

export const gendersSlice = createSlice({
  name: "genders",
  initialState: {
    isLoading: false,
    genders: [],
    source: [],
  },
  reducers,
});

export const { startRequest, endRequest, set, del, err, add, update, filter } =
  gendersSlice.actions;

export const getAsync = () => async (dispatch) => {
  try {
    dispatch(startRequest());
    const response = await axiosGet("genders/get-all");

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(set(data.genders));
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

    // omitting icon from the request
    const reqData = { name };

    const response = await axiosPut("genders/add", reqData);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(add(data.gender));
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

    const response = await axiosPatch("genders/update", reqData);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(update(data.gender));
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

    const response = await axiosDelete(`genders/delete/${id}`);

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

export default gendersSlice.reducer;
