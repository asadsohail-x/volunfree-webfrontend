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
} from "./redux/admin/admin.slice";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("Admin");
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);

  useEffect(() => {
    console.log(cookie);

    if (cookie["user"]) {
      const user = cookie["user"];

      if (user.token) {
        // verify token

        // set logged in as true
        setRole(user.role);
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
      if (adminState.data.token) {
        setCookie("user", { ...adminState.data, role: role }, { path: "/" });
        setTimeout(() => setIsLoading(false), 1000);
      }
    }
  }, [adminState]);

  const login = (email, password) => {
    switch (role.toUpperCase()) {
      case "ADMIN": {
        setIsLoading(true);
        dispatch(adminLogin(email, password));
        break;
      }
      case "VOLUNTEER": {
        setIsLoading(true);
        console.log("Volunteer", { email, password });
        break;
      }
      case "ORGANIZATION": {
        setIsLoading(true);
        console.log("Organization", { email, password });
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
        console.log("Volunteer logout");
        break;
      }
      case "ORGANIZATION": {
        setIsLoading(false);
        console.log("Organization logout");
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

  return <Login role={role} setRole={setRole} login={login} />;
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
