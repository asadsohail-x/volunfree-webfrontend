import { configureStore, combineReducers } from "@reduxjs/toolkit";

import adminReducer from "./admin/admin.slice";
import gendersReducer from "./genders/genders.slice";
import orgTypesReducer from "./orgTypes/orgTypes.slice";

const rootReducer = combineReducers({
  admin: adminReducer,
  genders: gendersReducer,
  orgTypes: orgTypesReducer,
});

export default configureStore({ reducer: rootReducer });
