import { configureStore, combineReducers } from "@reduxjs/toolkit";

import admin from "./admin/admin.slice";
import volunteer from "./volunteer/volunteer.slice";
import organization from "./organization/organization.slice";
import genders from "./genders/genders.slice";
import orgTypes from "./orgTypes/orgTypes.slice";
import oppCategories from "./oppCategories/oppCategories.slice";
import opportunities from "./opportunities/opportunities.slice";

const rootReducer = combineReducers({
  admin,
  volunteer,
  organization,
  genders,
  orgTypes,
  oppCategories,
  opportunities,
});

export default configureStore({ reducer: rootReducer });
