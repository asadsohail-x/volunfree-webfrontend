import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import reducers from "./orgTypes.reducers";

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

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmUyN2E1MGExZDE3NjU4ZmFhMjhhZDEiLCJlbWFpbCI6ImFzYWRAZ21haWwuY29tIiwiaWF0IjoxNjU5NTA1MzkwLCJleHAiOjE2NjIwMjUzOTB9.8LuW4DXFja1odoUeKdV8tY-aC8dW2iHZFIKARTbDc-I";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmUyN2E1MGExZDE3NjU4ZmFhMjhhZDEiLCJlbWFpbCI6ImFzYWRAZ21haWwuY29tIiwiaWF0IjoxNjU5NTA1MzkwLCJleHAiOjE2NjIwMjUzOTB9.8LuW4DXFja1odoUeKdV8tY-aC8dW2iHZFIKARTbDc-I`,
  },
};

export const getAsync = () => async (dispatch) => {
  try {
    dispatch(startRequest());
    const response = await axios.get("org-types/get-all", config);

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

    const response = await axios.put("org-types/add", reqData, config);

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

    const response = await axios.patch("org-types/update", reqData, config);

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

    const response = await axios.delete(`org-types/delete/${id}`);

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
