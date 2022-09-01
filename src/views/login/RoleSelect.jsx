import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RoleSelect = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#fafafa",
        backgroundImage: "linear-gradient(to right, #0470B8, #1EABE3)",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          py: 3,
          pt: 5,
          background: "white",
          borderRadius: 5,
          minHeight: 475,
          display: "flex",
          flexDirection: "column",
          boxShadow: (theme) => theme.shadows[10],
        }}
      >
        <Typography variant="h4" color="primary" sx={{ textAlign: "center" }}>
          Choose Yourself
        </Typography>
        <Box
          style={{
            marginTop: "20px",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            color="primary"
            sx={{ mt: 2, width: 250, height: 55, fontSize: 17 }}
            variant="contained"
            onClick={() => navigate("/volunteer")}
          >
            Volunteer
          </Button>
          <Button
            color="primary"
            sx={{ mt: 2, width: 250, height: 55, fontSize: 17 }}
            variant="contained"
            onClick={() => navigate("/organization")}
          >
            Organization
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RoleSelect;
