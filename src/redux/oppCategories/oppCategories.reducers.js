const reducers = {
  startRequest: (state) => {
    state.isLoading = true;
  },
  endRequest: (state, { payload = true }) => {
    if (payload) state.error = "";
    state.isLoading = false;
  },
  set: (state, action) => {
    state.source = state.oppCategories = action.payload;
  },
  add: (state, action) => {
    state.oppCategories.push(action.payload);
    state.source = state.oppCategories;
  },
  update: (state, action) => {
    state.oppCategories = state.oppCategories.map((type) =>
      type._id === action.payload._id
        ? { ...type, name: action.payload.name }
        : type
    );
    state.source = state.oppCategories;
  },
  del: (state, action) => {
    state.oppCategories = state.oppCategories.filter(({ _id }) => _id !== action.payload);
    state.source = state.oppCategories;
  },
  err: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  filter: (state, action) => {
    state.oppCategories = state.source.filter(({ name }) => {
      return name.toLowerCase().includes(action.payload.toLowerCase());
    });
  },
};

export default reducers;
