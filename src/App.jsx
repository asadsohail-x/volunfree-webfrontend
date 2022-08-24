// Package Imports
import { useEffect, useState } from "react";

import { Box, CircularProgress, Typography } from "@mui/material";

// Local Imports
import Layout from "./layout/Layout";
import Login from "./views/login/Login";

import { AdminRouter, OrgRouter, VolunteerRouter } from "./router/AppRouter";

import { useCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";

import {
  loginAsync as adminLogin,
  clear as clearAdmin,
  set as setAdmin,
  markAsLoggedIn as markAdminAsLoggedIn,
} from "./redux/admin/admin.slice";

import {
  loginAsync as volunteerLogin,
  clear as clearVolunteer,
  signupAsync as volunteerSignup,
  set as setVolunteer,
  markAsLoggedIn as markVolunteerAsLoggedIn,
} from "./redux/volunteer/volunteer.slice";

import {
  loginAsync as orgLogin,
  clear as clearOrg,
  signupAsync as orgSignup,
  set as setOrg,
  markAsLoggedIn as markOrgAsLoggedIn,
} from "./redux/organization/organization.slice";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("Admin");
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const volunteerState = useSelector((state) => state.volunteer);
  const organizationState = useSelector((state) => state.organization);

  useEffect(() => {
    if (cookie["user"]) {
      const user = cookie["user"];

      if (user.token) {
        // verify token

        // set logged in as true

        setRole(() => user.role);
        const data = { ...user };
        delete data.role;

        switch (role.toUpperCase()) {
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
        }

        setLoggedIn(true);
        setTimeout(() => setIsLoading(false), 1000);
        return;
      }
    }

    setRole("Volunteer");
    setLoggedIn(false);
    removeCookie("user");
    setTimeout(() => setIsLoading(false), 1000);
  }, [cookie]);

  useEffect(() => {
    if (!adminState.isLoading) {
      if (!adminState.isLoggedIn) {
        if (adminState.data.token) {
          setCookie("user", { ...adminState.data, role: role }, { path: "/" });
          setTimeout(() => setIsLoading(false), 1000);
          dispatch(markAdminAsLoggedIn());
        }
      }
    }
  }, [adminState]);

  useEffect(() => {
    if (!volunteerState.isLoading) {
      if (!volunteerState.isLoggedIn) {
        if (volunteerState.data.token) {
          setCookie(
            "user",
            { ...volunteerState.data, role: role },
            { path: "/" }
          );
          setTimeout(() => setIsLoading(false), 1000);
          dispatch(markVolunteerAsLoggedIn());
        }
      }
    }
  }, [volunteerState]);

  useEffect(() => {
    if (!organizationState.isLoading) {
      if (!organizationState.isLoggedIn) {
        if (organizationState.data.token) {
          setCookie(
            "user",
            { ...organizationState.data, role: role },
            { path: "/" }
          );
          setTimeout(() => setIsLoading(false), 1000);
          dispatch(markOrgAsLoggedIn());
        }
      }
    }
  }, [organizationState]);

  const login = (email, password) => {
    switch (role.toUpperCase()) {
      case "ADMIN": {
        setIsLoading(true);
        dispatch(adminLogin(email, password));
        break;
      }
      case "VOLUNTEER": {
        setIsLoading(true);
        dispatch(volunteerLogin(email, password));
        break;
      }
      case "ORGANIZATION": {
        setIsLoading(true);
        dispatch(orgLogin(email, password));
        break;
      }
    }
  };

  const signup = (data) => {
    switch (role.toUpperCase()) {
      case "VOLUNTEER": {
        setIsLoading(true);
        dispatch(volunteerSignup(data));
        break;
      }
      case "ORGANIZATION": {
        setIsLoading(true);
        dispatch(orgSignup(data));
        break;
      }
    }
  };

  const logout = () => {
    removeCookie("user");
    setLoggedIn(false);

    switch (role.toUpperCase()) {
      case "ADMIN": {
        setIsLoading(false);
        dispatch(clearAdmin());
        break;
      }
      case "VOLUNTEER": {
        setIsLoading(false);
        dispatch(clearVolunteer());
        break;
      }
      case "ORGANIZATION": {
        setIsLoading(false);
        dispatch(clearOrg());
        break;
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isLoggedIn) {
    switch (role.toUpperCase()) {
      case "ADMIN":
        return (
          <Layout role={role} logout={logout}>
            <AdminRouter />
          </Layout>
        );
      case "VOLUNTEER":
        return (
          <Layout role={role} logout={logout}>
            <VolunteerRouter />
          </Layout>
        );
      case "ORGANIZATION":
        return (
          <Layout role={role} logout={logout}>
            <OrgRouter />
          </Layout>
        );
    }
  }

  return <Login role={role} setRole={setRole} login={login} signup={signup} />;
};

const Loader = () => (
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      height: "100vh",
      width: "90%",
      transform: "translate(-50%, -50%)",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 400,
      }}
    >
      <Typography variant="h6">Loading</Typography>
      <CircularProgress sx={{ m: 3 }} color="custom" />
    </Box>
  </Box>
);

export default App;
