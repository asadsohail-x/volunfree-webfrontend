import styled from "@emotion/styled";
import {
  Avatar,
  AppBar,
  Typography,
  Box,
  IconButton,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const HeaderRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.custom.main,
  boxShadow: theme.shadows[15],
}));

const Header = ({ onSidebarOpen, logout, ...other }) => {
  const [cookie] = useCookies(["user"]);
  const [name, setName] = useState("");

  useEffect(() => {
    const user = cookie["user"];

    switch (user.role.toUpperCase()) {
      case "VOLUNTEER": {
        setName(`${user.firstName} ${user.lastName}`);
        break;
      }
      default:
        setName(user.name);
    }
  }, [cookie, setName]);

  return (
    <>
      <HeaderRoot
        sx={{
          left: {
            lg: 100,
          },
          width: {
            lg: "calc(100% - 100px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" sx={{ color: "white" }} />
          </IconButton>
          <Box sx={{ flex: 1 }} />
          <IconButton
            sx={{
              mr: 3,
              color: "white",
            }}
          >
            <NotificationsIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="label">{name}</Typography>
            <Avatar
              sx={{
                background: "white",
                color: (theme) => theme.palette.custom.main,
                mx: 1,
                height: 30,
                width: 30,
              }}
            >
              {name && name[0]}
            </Avatar>
          </Box>
        </Toolbar>
      </HeaderRoot>
    </>
  );
};

export default Header;
