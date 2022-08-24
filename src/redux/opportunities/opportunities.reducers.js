const reducers = {
  startRequest: (state) => {
    state.isLoading = true;
  },
  endRequest: (state, { payload = true }) => {
    if (payload) state.error = "";
    state.isLoading = false;
  },
  set: (state, action) => {
    state.source = state.opportunities = action.payload;
  },
  add: (state, action) => {
    state.opportunities.push(action.payload);
    state.source = state.opportunities;
  },
  update: (state, action) => {
    state.opportunities = state.opportunities.map((type) =>
      type._id === action.payload._id ? { ...type, ...action.payload } : type
    );
    state.source = state.opportunities;
  },
  del: (state, action) => {
    state.opportunities = state.opportunities.filter(
      ({ _id }) => _id !== action.payload
    );
    state.source = state.opportunities;
  },
  err: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  filter: (state, action) => {
    state.opportunities = state.source.filter(({ title }) => {
      return title.toLowerCase().includes(action.payload.toLowerCase());
    });
  },
};

export default reducers;
