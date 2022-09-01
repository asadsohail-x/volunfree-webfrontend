// Package Imports
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import Layout from "./layout/Layout";
import Loader from "./Loader";

import { set as setAdmin } from "./redux/admin/admin.slice";
import { set as setVolunteer } from "./redux/volunteer/volunteer.slice";
import { set as setOrg } from "./redux/organization/organization.slice";

import {
  Router,
  AdminRouter,
  OrgRouter,
  VolunteerRouter,
} from "./router/AppRouter";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("Volunteer");
  const [cookie, , removeCookie] = useCookies(["user"]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const volLoggedIn = useSelector((state) => state.volunteer.isLoggedIn);
  const orgLoggedIn = useSelector((state) => state.organization.isLoggedIn);

  useEffect(() => {
    setLoggedIn(adminLoggedIn || volLoggedIn || orgLoggedIn);
  }, [adminLoggedIn, volLoggedIn, orgLoggedIn]);

  useEffect(() => {
    const user = cookie["user"];
    if (user) {
      if (!isLoggedIn) {
        if (user.token) {
          setRole(() => user.role);

          const data = JSON.parse(JSON.stringify(user));
          delete data.role;

          switch (user.role.toUpperCase()) {
            case "ADMIN": {
              setIsLoading(true);
              dispatch(setAdmin(data));
              break;
            }
            case "VOLUNTEER": {
              setIsLoading(true);
              dispatch(setVolunteer(data));
              break;
            }
            case "ORGANIZATION": {
              setIsLoading(true);
              dispatch(setOrg(data));
              break;
            }
            default:
              break;
          }

          setLoggedIn(() => true);
          setTimeout(() => setIsLoading(false), 500);

          return;
        }
      } else {
        setLoggedIn(() => true);
        return;
      }
    }

    setRole("Volunteer");
    setLoggedIn(() => false);
    removeCookie("user");
    setTimeout(() => setIsLoading(false), 500);
  }, [cookie, dispatch, isLoggedIn, navigate, removeCookie]);

  return isLoading ? (
    <Loader />
  ) : isLoggedIn ? (
    <Layout>
      {
        {
          Admin: <AdminRouter />,
          Volunteer: <VolunteerRouter />,
          Organization: <OrgRouter />,
        }[role]
      }
    </Layout>
  ) : (
    <Router />
  );
};

export default App;
