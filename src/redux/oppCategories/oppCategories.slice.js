import { createSlice } from "@reduxjs/toolkit";
import reducers from "./oppCategories.reducers";

import { axiosGet, axiosPut, axiosPatch, axiosDelete } from "../../api/axiosHelper";

export const oppCategoriesSlice = createSlice({
  name: "oppCategories",
  initialState: {
    isLoading: false,
    oppCategories: [],
    source: [],
  },
  reducers,
});

export const { startRequest, endRequest, set, del, err, add, update, filter } =
  oppCategoriesSlice.actions;

export const getAsync = () => async (dispatch) => {
  try {
    dispatch(startRequest());
    const response = await axiosGet("opp-categories/get-all");

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(set(data.categories));
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

    const response = await axiosPut("opp-categories/add", reqData);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(add(data.category));
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

    const response = await axiosPatch(
      "opp-categories/update",
      reqData,
    );

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(update(data.category));
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

    const response = await axiosDelete(`opp-categories/delete/${id}`);

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

export default oppCategoriesSlice.reducer;
