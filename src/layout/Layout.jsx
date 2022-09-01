import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "./header/Header";

import { adminRoutes, orgRoutes, volunteerRoutes } from "../router/AppRouter";
import Sidebar from "./sidebar/Sidebar";
import { useCookies } from "react-cookie";

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
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

const HandleSidebar = (props) => {
  const [cookie, , remove] = useCookies(["user"]);

  const logout = () => {
    remove("user");
    window.location.href = "/";
  };

  switch (cookie["user"].role) {
    case "Admin":
      return <Sidebar routes={adminRoutes} logout={logout} {...props} />;
    case "Volunteer":
      return <Sidebar routes={volunteerRoutes} logout={logout} {...props} />;
    case "Organization":
      return <Sidebar routes={orgRoutes} logout={logout} {...props} />;
    default:
      logout();
  }
};

export default Layout;
