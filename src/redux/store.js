import { configureStore, combineReducers } from "@reduxjs/toolkit";

import adminReducer from "./admin/admin.slice";
import volunteerReducer from "./volunteer/volunteer.slice";
import organiztionReducer from "./organization/organization.slice";
import gendersReducer from "./genders/genders.slice";
import orgTypesReducer from "./orgTypes/orgTypes.slice";
import oppCategoriesReducer from "./oppCategories/oppCategories.slice";

const rootReducer = combineReducers({
  admin: adminReducer,
  volunteer: volunteerReducer,
  organization: organiztionReducer,
  genders: gendersReducer,
  orgTypes: orgTypesReducer,
  oppCategories: oppCategoriesReducer,
});

export default configureStore({ reducer: rootReducer });
