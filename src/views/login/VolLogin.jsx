import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { loginAsync, clear } from "../../redux/volunteer/volunteer.slice";

import Loader from "../../Loader";
import { useCookies } from "react-cookie";

import { toast } from "react-toastify";

const VolLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCheckedRememberMe, setIsCheckedRememberMe] = useState(false);

  const [, setCookie] = useCookies(["user"]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.volunteer.isLoggedIn);
  const isLoading = useSelector((state) => state.volunteer.isLoading);
  const data = useSelector((state) => state.volunteer.data);
  const error = useSelector((state) => state.volunteer.error);

  useEffect(() => {
    if (!isLoading && error) {
      console.log(isLoading, error);
      toast.error(error);
    }

    return () => {
      dispatch(clear());
    };
  }, [error, isLoading, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch Login Action
    dispatch(loginAsync(email, password));
  };

  // handle volunteer state change
  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        if (Object.keys(data).length) {
          setCookie("user", { ...data, role: "Volunteer", loggedIn: true });
          navigate("/");
        } else {
          console.log("no data");
        }
      } else {
        console.log("Not Logged In");
      }
    }
  }, [data, isLoading, isLoggedIn, navigate, setCookie]);

  if (isLoading) {
    return <Loader />;
  }

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
                onClick={() => navigate("/")}
              >
                Volunteer
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
              onClick={() => navigate("/volunteer-signup")}
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
              onClick={() => navigate("/")}
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

export default VolLogin;
