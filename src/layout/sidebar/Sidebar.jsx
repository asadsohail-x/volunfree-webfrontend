import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button, Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { FiLogOut } from "react-icons/fi";

import Logo from "../../assets/logo.png";

const ListItemBody = ({ config, active = false }) => {
  const { icon, selectedIcon, title } = config;

  return (
    <>
      {icon !== null && active ? selectedIcon : icon}
      <ListItemText style={{ marginLeft: "20px" }} primary={title} />
    </>
  );
};

const NavButton = ({ active = false, children, ...rest }) => (
  <Button
    sx={{
      backgroundColor: "custom.light",
      borderRadius: 1,
      color: active ? "custom.dark" : "black",
      fontWeight: active && "fontWeightBold",
      justifyContent: "flex-start",
      px: 3,
      mt: 1,
      textAlign: "left",
      textTransform: "none",
      width: "100%",
      "& .MuiButton-startIcon": {
        color: active ? "secondary.main" : "neutral.400",
      },
    }}
    {...rest}
  >
    {children}
  </Button>
);

const MenuItem = ({ config }) => {
  const location = useLocation();
  const active = location.pathname === config.path;

  return (
    <NavLink to={config.path}>
      <NavButton active={active}>
        <ListItemBody config={config} active={active} />
      </NavButton>
    </NavLink>
  );
};

const ExpandableMenuItem = ({ config }) => {
  const [open, setOpen] = useState(false);

  return (
    <div component="nav">
      <NavButton onClick={() => setOpen(!open)}>
        <ListItemBody config={config} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </NavButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Menu routes={config.children} />
      </Collapse>
    </div>
  );
};

const Menu = ({ routes }) => {
  const createList = (routes) => {
    let menu = [];
    routes.forEach((menuItem, key) => {
      if (menuItem.children) {
        menu.push(<ExpandableMenuItem config={menuItem} key={key} />);
      } else {
        menu.push(<MenuItem config={menuItem} key={key} />);
      }
    });
    return menu.concat();
  };

  return <List>{createList(routes)}</List>;
};

const SidebarContent = ({ routes, logout }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      p: 1,
    }}
  >
    <Box sx={{ py: 4 }}>
      <NavLink
        to="/"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Logo} alt="Logo" style={{ width: "175px" }} />
      </NavLink>
    </Box>
    <Divider
      sx={{
        borderColor: "background",
        mb: 3,
      }}
    />
    <Box>
      <Menu routes={routes} />
    </Box>
    <Divider
      sx={{
        borderColor: "background",
      }}
    />
    <NavButton onClick={logout}>
      <ListItemBody
        config={{ title: "Logout", icon: <FiLogOut size={21} /> }}
      />
    </NavButton>
  </Box>
);

const Sidebar = ({ open, onClose, routes, logout }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "custom.light",
            color: "#FFFFFF",
            width: 300,
            borderTopRightRadius: 35,
            boxShadow: "3px 0 15px -10px black",
          },
        }}
        variant="permanent"
      >
        <SidebarContent routes={routes} logout={logout} />
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "custom.light",
          color: "#FFFFFF",
          borderTopRightRadius: 35,
          width: 300,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      <SidebarContent routes={routes} logout={logout} />
    </Drawer>
  );
};

export default Sidebar;
