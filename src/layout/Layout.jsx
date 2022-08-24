import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "./header/Header";

import { adminRoutes, orgRoutes, volunteerRoutes } from "../router/AppRouter";
import Sidebar from "./sidebar/Sidebar";

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 300,
  },
}));

const Layout = ({ children, logout, role }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
            p: 1,
          }}
        >
          {children}
        </Box>
      </LayoutRoot>
      <Header onSidebarOpen={() => setSidebarOpen(true)} />
      <HandleSidebar
        role={role}
        logout={logout}
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

const HandleSidebar = ({ role, logout, ...rest }) => {
  switch (role.toUpperCase()) {
    case "ADMIN":
      return <Sidebar routes={adminRoutes} logout={logout} {...rest} />;
    case "VOLUNTEER":
      return <Sidebar routes={volunteerRoutes} logout={logout} {...rest} />;
    case "ORGANIZATION":
      return <Sidebar routes={orgRoutes} logout={logout} {...rest} />;
    default:
      logout();
  }
};

export default Layout;
