import { useState } from "react";
import {
  Box,
  Button,
  Link,
  Checkbox,
  FormControlLabel,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import Signup from "./Signup";

const LoginHandler = ({ login, signup, role, setRole }) => {
  const [hasSelectedRole, setHasSelectedRole] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleRoleSelect = (role) => {
    setRole(role);
    setHasSelectedRole(true);
  };

  if (showSignup) {
    return (
      <Signup hide={() => setShowSignup(false)} role={role} signup={signup} />
    );
  }

  if (hasSelectedRole) {
    return (
      <Login
        login={login}
        role={role}
        signup={() => setShowSignup(true)}
        selectRole={() => setHasSelectedRole(false)}
      />
    );
  }

  return <RoleSelect setRole={handleRoleSelect} />;
};

const Login = ({ login, selectRole, role, signup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCheckedRememberMe, setIsCheckedRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate if the email and password are valid or not
    login(email, password);
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",

        backgroundImage: "linear-gradient(to right, #0470B8, #1EABE3)",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ py: 6, background: "white", borderRadius: 5 }}
        style={{ paddingLeft: "100px", paddingRight: "100px" }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ my: 3, textAlign: "center" }}>
            <Typography color="primary" variant="h3" sx={{ mb: 1 }}>
              Let's do this!
            </Typography>
            <Typography
              color="custom.accent"
              variant="body2"
              sx={{ fontSize: 17, mb: 2 }}
            >
              Sign In as{" "}
              <span
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={selectRole}
              >
                {role}
              </span>{" "}
              to get started with Volunfree
            </Typography>
          </Box>
          <TextField
            fullWidth
            margin="normal"
            name="email"
            onChange={({ target: { value } }) => setEmail(value)}
            type="email"
            value={email}
            color="primary"
            variant="outlined"
            placeholder="Enter your Email"
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            onChange={({ target: { value } }) => setPassword(value)}
            type="password"
            value={password}
            color="primary"
            variant="outlined"
            placeholder="Enter Password"
          />

          <Box
            sx={{
              py: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: (theme) => theme.palette.custom.accent }}
                  checked={isCheckedRememberMe}
                  onChange={() => setIsCheckedRememberMe(!isCheckedRememberMe)}
                />
              }
              label="Remember Me"
              sx={{ color: (theme) => theme.palette.custom.accent }}
            />
            <Link
              href="#"
              underline="none"
              sx={{ color: (theme) => theme.palette.custom.accent }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Box
            sx={{
              py: 2,
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ mr: 2 }}
            >
              Sign In
            </Button>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ ml: 2 }}
              onClick={signup}
            >
              Sign Up
            </Button>
          </Box>
          <Box
            sx={{
              py: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Button
              color="primary"
              sx={{ m: 0 }}
              onClick={selectRole}
              variant="outlined"
            >
              Change Role
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

const RoleSelect = ({ setRole }) => (
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
          onClick={() => setRole("Volunteer")}
        >
          Volunteer
        </Button>
        <Button
          color="primary"
          sx={{ mt: 2, width: 250, height: 55, fontSize: 17 }}
          variant="contained"
          onClick={() => setRole("Organization")}
        >
          Organization
        </Button>
        <Button
          color="primary"
          sx={{ mt: 2, width: 250, height: 55, fontSize: 17 }}
          variant="contained"
          onClick={() => setRole("Admin")}
        >
          Admin
        </Button>
      </Box>
    </Container>
  </Box>
);

export default LoginHandler;
