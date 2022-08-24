const reducers = {
  startRequest: (state) => {
    state.isLoading = true;
  },
  endRequest: (state, { payload = true }) => {
    if (payload) state.error = "";
    state.isLoading = false;
  },
  set: (state, action) => {
    state.source = state.orgTypes = action.payload;
  },
  add: (state, action) => {
    state.orgTypes.push(action.payload);
    state.source = state.orgTypes;
  },
  update: (state, action) => {
    state.orgTypes = state.orgTypes.map((type) =>
      type._id === action.payload._id
        ? { ...type, name: action.payload.name }
        : type
    );
    state.source = state.orgTypes;
  },
  del: (state, action) => {
    state.orgTypes = state.orgTypes.filter(({ _id }) => _id !== action.payload);
    state.source = state.orgTypes;
  },
  err: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  filter: (state, action) => {
    state.orgTypes = state.source.filter(({ name }) => {
      return name.toLowerCase().includes(action.payload.toLowerCase());
    });
  },
};

export default reducers;
