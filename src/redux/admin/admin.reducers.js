const reducers = {
  startRequest: (state) => {
    state.isLoading = true;
  },
  endRequest: (state, { payload = true }) => {
    if (payload) state.error = "";
    state.isLoading = false;
  },
  set: (state, action) => {
    state.data = action.payload;
  },
  err: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clear: (state) => {
    state.isLoading = false;
    state.error = "";
    state.data = {};
  },
};

export default reducers;
