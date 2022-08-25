import { useEffect, useState } from "react";

import { Box, Avatar, IconButton, Typography, Divider } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useLocation, useNavigate } from "react-router-dom";

import PostedOpportunities from "./PostedOpportunities";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Track = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [id, setId] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const { state } = location;

    if (state) {
      if (state.id) {
        showMenu(state.id);
      }
    }
  }, [location]);

  if (isMenuVisible) {
    return <Menu id={id} hide={() => setIsMenuVisible(false)} />;
  }

  const showMenu = (_id) => {
    setId(_id);
    setIsMenuVisible(true);
  };

  return <PostedOpportunities showMenu={showMenu} />;
};

const Menu = ({ id, hide }) => {
  const navigate = useNavigate();

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <IconButton color="custom" onClick={hide}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" color="custom.main" sx={{ px: 2, py: 1 }}>
          Track Opportunities
        </Typography>
      </Box>
      <Divider
        sx={{
          borderColor: "background",
          my: 1,
        }}
      />

      <Box
        sx={{
          mt: 2,
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <Item
          item={{
            title: "Volunteers Applied",
            icon: <AddIcon sx={{ fontSize: 40 }} />,
          }}
          onClick={() => navigate("/applied-volunteers", { state: { id: id } })}
        />
        <Item
          item={{
            title: "Selected Volunteers",
            icon: <AddIcon sx={{ fontSize: 40 }} />,
          }}
          onClick={() =>
            navigate("/approved-volunteers", { state: { id: id } })
          }
        />
        <Item
          item={{
            title: "Volunteers Came",
            icon: <AddIcon sx={{ fontSize: 40 }} />,
          }}
          onClick={() =>
            navigate("/attended-volunteers", { state: { id: id } })
          }
        />
        <Item
          item={{
            title: "Volunteers Dropped",
            icon: <AddIcon sx={{ fontSize: 40 }} />,
          }}
          onClick={() => navigate("/dropped-volunteers", { state: { id: id } })}
        />
      </Box>
    </Box>
  );
};

const Item = ({ item, onClick }) => {
  return (
    <>
      <Box sx={styles.card} onClick={onClick}>
        <Avatar sx={styles.avatar}>{item.icon}</Avatar>
        <Typography variant="h6" color="custom.accent">
          {item.title}
        </Typography>
      </Box>
    </>
  );
};

const styles = {
  card: {
    width: 250,
    height: 250,
    m: 2,
    mx: 4,
    boxShadow: (theme) => theme.shadows[20],
    borderRadius: 1,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    transition: "0.25s all ease-in-out",
    cursor: "pointer",
  },
  avatar: {
    width: 60,
    height: 60,
    m: 2,
    background: (theme) => theme.palette.custom.accent,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
};

export default Track;
