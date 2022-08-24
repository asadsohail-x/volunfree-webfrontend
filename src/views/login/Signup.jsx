import { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Experiences from "./Experiences";
import Skills from "./Skills";

const VolunteerSignup = ({ login, hide }) => {
  const [volunteer, setVolunteer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    gender: "",
    dob: new Date(Date.now()),
  });

  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // send request to the server
    console.log("Signing up");
    login();
    hide();
  };

  const handleChange = ({ target }) => {
    setVolunteer({ ...volunteer, [target.name]: target.value });
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
        sx={{ py: 6, background: "white", borderRadius: 5, my: 15 }}
        style={{
          paddingLeft: "calc(100vw * 0.05)",
          paddingRight: "calc(100vw * 0.05)",
        }}
      >
        <Box sx={{ my: 3, textAlign: "center" }}>
          <Typography color="primary" variant="h3" sx={{ mb: 1 }}>
            Let's do this!
          </Typography>
          <Typography
            color="custom.accent"
            variant="body2"
            sx={{ fontSize: 17, mb: 2 }}
          >
            Please provide the following information
          </Typography>
        </Box>
        {/* First Name */}
        <TextField
          fullWidth
          margin="normal"
          name="firstName"
          onChange={handleChange}
          type="text"
          value={volunteer.firstName}
          color="primary"
          variant="outlined"
          label="First Name"
        />
        {/* Contact Name */}
        <TextField
          fullWidth
          margin="normal"
          name="contactName"
          onChange={handleChange}
          type="text"
          value={volunteer.contactName}
          color="primary"
          variant="outlined"
          label="Last Name"
        />
        {/* Email */}
        <TextField
          fullWidth
          margin="normal"
          name="email"
          onChange={handleChange}
          type="email"
          value={volunteer.email}
          color="primary"
          variant="outlined"
          label="Email Address"
        />
        {/* Password */}
        <TextField
          fullWidth
          margin="normal"
          name="password"
          onChange={handleChange}
          type="passwprd"
          value={volunteer.password}
          color="primary"
          variant="outlined"
          label="Password"
        />
        {/* Phone Number */}
        <TextField
          fullWidth
          margin="normal"
          name="phoneNo"
          onChange={handleChange}
          type="text"
          value={volunteer.phoneNo}
          color="primary"
          variant="outlined"
          label="Phone Number"
        />
        {/* Gender */}
        <TextField
          fullWidth
          margin="normal"
          name="streetAddress"
          onChange={handleChange}
          type="text"
          value={volunteer.gender}
          color="primary"
          variant="outlined"
          label="Gender"
        />
        {/* DOB */}
        <DatePicker
          label="Date Of Birth"
          inputFormat="MM/dd/yyyy"
          value={volunteer.dob}
          maxDate={new Date(Date.now())}
          onChange={(dob) => setVolunteer({ ...volunteer, dob })}
          renderInput={(p) => (
            <TextField sx={{ mt: 3, mb: 2 }} fullWidth {...p} />
          )}
        />

        {/* Experiences */}
        <Experiences
          experiences={experiences}
          setExperiences={setExperiences}
        />

        {/* Skills */}
        <Skills skills={skills} setSkills={setSkills} />

        <Button
          color="primary"
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Sign Up as Volunteer
        </Button>
        <Button color="primary" fullWidth size="large" onClick={hide}>
          Go Back
        </Button>
      </Container>
    </Box>
  );
};

const OrgSignup = ({ login, hide }) => {
  const [orgState, setOrgState] = useState({
    orgName: "",
    contactName: "",
    email: "",
    password: "",
    phoneNo: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // send request to the server for the check which role this is
    console.log("Signing up");
    login();
    hide();
  };

  const handleChange = ({ target }) => {
    setOrgState({ ...orgState, [target.name]: target.value });
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
        sx={{ py: 6, background: "white", borderRadius: 5, my: 15 }}
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
              Please provide the following information
            </Typography>
          </Box>
          {/* Organization Name */}
          <TextField
            fullWidth
            margin="normal"
            name="orgName"
            onChange={handleChange}
            type="text"
            value={orgState.orgName}
            color="primary"
            variant="outlined"
            label="Organization Name"
          />
          {/* Contact Name */}
          <TextField
            fullWidth
            margin="normal"
            name="contactName"
            onChange={handleChange}
            type="text"
            value={orgState.contactName}
            color="primary"
            variant="outlined"
            label="Contact Name"
          />
          {/* Email */}
          <TextField
            fullWidth
            margin="normal"
            name="email"
            onChange={handleChange}
            type="email"
            value={orgState.email}
            color="primary"
            variant="outlined"
            label="Email Address"
          />
          {/* Password */}
          <TextField
            fullWidth
            margin="normal"
            name="password"
            onChange={handleChange}
            type="passwprd"
            value={orgState.password}
            color="primary"
            variant="outlined"
            label="Password"
          />
          {/* Phone Number */}
          <TextField
            fullWidth
            margin="normal"
            name="phoneNo"
            onChange={handleChange}
            type="text"
            value={orgState.phoneNo}
            color="primary"
            variant="outlined"
            label="Phone Number"
          />
          {/* Street Address */}
          <TextField
            fullWidth
            margin="normal"
            name="streetAddress"
            onChange={handleChange}
            type="text"
            value={orgState.streetAddress}
            color="primary"
            variant="outlined"
            label="Street Address"
          />
          {/* City */}
          <TextField
            fullWidth
            margin="normal"
            name="city"
            onChange={handleChange}
            type="text"
            value={orgState.city}
            color="primary"
            variant="outlined"
            label="City"
          />
          {/* State */}
          <TextField
            fullWidth
            margin="normal"
            name="state"
            onChange={handleChange}
            type="text"
            value={orgState.state}
            color="primary"
            variant="outlined"
            label="State"
          />
          {/* Zip Code */}
          <TextField
            fullWidth
            margin="normal"
            name="zipCode"
            onChange={handleChange}
            type="text"
            value={orgState.zipCode}
            color="primary"
            variant="outlined"
            label="Zip Code"
          />
          {/* Country */}
          <TextField
            fullWidth
            margin="normal"
            name="country"
            onChange={handleChange}
            type="text"
            value={orgState.country}
            color="primary"
            variant="outlined"
            label="Country"
          />
          {/* Details */}
          <TextField
            fullWidth
            margin="normal"
            name="description"
            onChange={handleChange}
            type="text"
            value={orgState.description}
            color="primary"
            variant="outlined"
            label="Organization Description"
            rows={8}
            multiline
          />

          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Button color="primary" fullWidth size="large" onClick={hide}>
            Go Back
          </Button>
        </form>
      </Container>
    </Box>
  );
};

const Signup = ({ role, login, ...rest }) => {
  switch (role.toUpperCase()) {
    case "VOLUNTEER":
      return <VolunteerSignup login={login} {...rest} />;
    default:
      return <OrgSignup login={login} {...rest} />;
  }
};

export default Signup;
