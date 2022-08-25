import { Box, Avatar, Typography, Divider } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

const Track = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h5" color="custom.main" sx={{ px: 2, py: 1 }}>
        Track Opportunities
      </Typography>
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
            title: "Applied For",
            icon: <AddIcon sx={{ fontSize: 40 }} />,
          }}
          onClick={() => navigate("/applied-opportunities")}
        />
        <Item
          item={{
            title: "Approved For",
            icon: <AddIcon sx={{ fontSize: 40 }} />,
          }}
          onClick={() => navigate("/approved-opportunities")}
        />
        <Item
          item={{
            title: "Upcoming Opportunities",
            icon: <AddIcon sx={{ fontSize: 40 }} />,
          }}
          onClick={() => navigate("/upcoming-opportunities")}
        />
        <Item
          item={{
            title: "Past Opportunities",
            icon: <AddIcon sx={{ fontSize: 40 }} />,
          }}
          onClick={() => navigate("/past-opportunities")}
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
