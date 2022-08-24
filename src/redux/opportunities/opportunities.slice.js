import { createSlice } from "@reduxjs/toolkit";
import reducers from "./opportunities.reducers";

import {
  axiosGet,
  axiosPut,
  axiosPatch,
  axiosDelete,
} from "../../api/axiosHelper";

export const opportunitiesSlice = createSlice({
  name: "opportunities",
  initialState: {
    isLoading: false,
    opportunities: [],
    source: [],
  },
  reducers,
});

export const { startRequest, endRequest, set, del, err, add, update, filter } =
  opportunitiesSlice.actions;

export const getAsync = () => async (dispatch) => {
  try {
    dispatch(startRequest());
    const response = await axiosGet("opportunities/get-all");

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(set(data.opportunities));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(err("Something went wrong"));
  }
};

export const addAsync = (reqData) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const response = await axiosPut("opportunities/add", reqData);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(add(data.opportunity));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(err("Something went wrong"));
  }
};

export const updateAsync = (reqData) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const response = await axiosPatch("opportunities/update", reqData);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(update(data.opportunity));
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

    const response = await axiosDelete(`opportunities/delete/${id}`);

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

export const applyAsync = (reqData) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const response = await axiosPut("opportunities/apply", reqData);

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

export default opportunitiesSlice.reducer;
