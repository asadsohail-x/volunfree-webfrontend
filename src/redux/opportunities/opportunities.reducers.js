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
  setVolunteers: (state, action) => {
    state.volunteersSource = state.volunteers = action.payload;
  },
  add: (state, action) => {
    state.opportunities.push(action.payload);
    state.source = state.opportunities;
  },
  addVolunteer: (state, action) => {
    state.volunteers.push(action.payload);
    state.volunteersSource = state.volunteers;
  },
  update: (state, action) => {
    state.opportunities = state.opportunities.map((item) =>
      item._id === action.payload._id ? { ...item, ...action.payload } : item
    );
    state.source = state.opportunities;
  },
  updateVolunteer: (state, action) => {
    state.volunteers = state.volunteers.map((item) =>
      item._id === action.payload._id ? { ...item, ...action.payload } : item
    );
    state.volunteersSource = state.volunteers;
  },
  del: (state, action) => {
    state.opportunities = state.opportunities.filter(
      ({ _id }) => _id !== action.payload
    );
    state.source = state.opportunities;
  },
  delVolunteer: (state, action) => {
    state.volunteers = state.volunteers.filter(
      ({ _id }) => _id !== action.payload
    );
    state.volunteersSource = state.volunteers;
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
  filterVolunteers: (state, action) => {
    state.volunteers = state.volunteersSource.filter(
      ({ firstName, lastName, email }) =>
        firstName.toLowerCase().includes(action.payload.toLowerCase()) ||
        lastName.toLowerCase().includes(action.payload.toLowerCase()) ||
        email.toLowerCase().includes(action.payload.toLowerCase())
    );
  },
  clear: (state) => {
    state.opportunities = [];
  },
  clearVolunteers: (state) => {
    state.volunteers = [];
  },
};

export default reducers;
