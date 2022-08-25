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
    volunteers: [],
    source: [],
    volunteersSource: [],
  },
  reducers,
});

export const {
  startRequest,
  endRequest,
  set,
  setVolunteers,
  del,
  delVolunteers,
  err,
  add,
  addVolunteer,
  update,
  updateVolunteer,
  filter,
  filterVolunteers,
  clear,
  clearVolunteers,
} = opportunitiesSlice.actions;

export const getAsync = () => async (dispatch) => {
  try {
    dispatch(clear());
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

export const getByOrganizationAsync = (organization) => async (dispatch) => {
  try {
    dispatch(clear());
    dispatch(startRequest());
    const response = await axiosGet(
      `opportunities/get-all?organization=${organization}`
    );

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

export const getByVolunteerAsync = (volunteer) => async (dispatch) => {
  try {
    dispatch(clear());
    dispatch(startRequest());
    const response = await axiosGet(
      `opportunities/get-all?volunteer=${volunteer}`
    );

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

export const getAppliedAsync = (volunteer) => async (dispatch) => {
  try {
    dispatch(clear());
    dispatch(startRequest());
    const response = await axiosGet(
      `opportunities/get-applied?volunteer=${volunteer}`
    );

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      console.log("called applied API");
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

export const getApprovedAsync = (volunteer) => async (dispatch) => {
  try {
    dispatch(clear());
    dispatch(startRequest());
    const response = await axiosGet(
      `opportunities/get-approved?volunteer=${volunteer}`
    );

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      console.log("called Approved API");
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

export const getPastAsync = (volunteer) => async (dispatch) => {
  try {
    dispatch(clear());
    dispatch(startRequest());
    const response = await axiosGet(
      `opportunities/get-past?volunteer=${volunteer}`
    );

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      console.log("called past API");
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

export const getUpcomingAsync = (volunteer) => async (dispatch) => {
  try {
    dispatch(clear());
    dispatch(startRequest());
    const response = await axiosGet(
      `opportunities/get-upcoming?volunteer=${volunteer}`
    );

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      console.log("called upcoming API");
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

export const getAppliedVolunteersAsync = (id) => async (dispatch) => {
  try {
    dispatch(clearVolunteers());
    dispatch(startRequest());

    const response = await axiosGet(
      `opportunities/get-applied-volunteers?opportunityId=${id}`
    );

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(setVolunteers(data.applicants));
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

    const response = await axiosPatch("opportunities/apply", reqData);

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

export const unApplyAsync = (reqData) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const response = await axiosPatch("opportunities/un-apply", reqData);

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

export default opportunitiesSlice.reducer;
