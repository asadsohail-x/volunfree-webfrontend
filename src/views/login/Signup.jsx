import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useSelector, useDispatch } from "react-redux";

import Experiences from "./Experiences";
import Skills from "./Skills";

import { getAsync as getGenders } from "../../redux/genders/genders.slice";
import { getAsync as getOrgTypes } from "../../redux/orgTypes/orgTypes.slice";
import { ConstructionOutlined } from "@mui/icons-material";

const VolunteerSignup = ({ signup, hide }) => {
  const [volunteer, setVolunteer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    gender: "",
    zipCode: "",
    dob: new Date(Date.now()),
  });

  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  const dispatch = useDispatch();
  const genders = useSelector((state) => state.genders.genders);

  useEffect(() => {
    dispatch(getGenders());
  }, [dispatch]);

  useEffect(() => {
    console.log(genders);
  }, [genders]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVolunteer = {
      firstName: volunteer.firstName,
      lastName: volunteer.lastName,
      email: volunteer.email,
      password: volunteer.password,
      genderId: volunteer.gender,
      DOB: volunteer.dob,
      zipCode: volunteer.zipCode,
      experiences,
      skills,
    };

    console.log(newVolunteer);

    // send request to the server
    signup(newVolunteer);
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
        {/* Last Name */}
        <TextField
          fullWidth
          margin="normal"
          name="lastName"
          onChange={handleChange}
          type="text"
          value={volunteer.lastName}
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
          type="password"
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
        <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select
            value={volunteer.gender}
            label="Gender"
            name="gender"
            onChange={handleChange}
            fullWidth
          >
            {genders.length > 0 &&
              genders.map(({ _id, name }, index) => (
                <MenuItem key={index} value={_id}>
                  {name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {/* ZIP Code */}
        <TextField
          fullWidth
          margin="normal"
          name="zipCode"
          onChange={handleChange}
          type="text"
          value={volunteer.zipCode}
          color="primary"
          variant="outlined"
          label="ZIP Code"
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

const OrgSignup = ({ signup, hide }) => {
  const [org, setOrg] = useState({
    name: "",
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
    orgType: "",
  });

  const dispatch = useDispatch();
  const orgTypes = useSelector((state) => state.orgTypes.orgTypes);

  useEffect(() => {
    dispatch(getOrgTypes());
  }, [dispatch]);

  useEffect(() => {
    console.log(orgTypes);
  }, [orgTypes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrg = {
      name: org.name,
      contactName: org.contactName,
      email: org.email,
      password: org.password,
      phoneNo: org.phoneNo,
      streetAddress: org.streetAddress,
      city: org.city,
      state: org.state,
      zipCode: org.zipCode,
      country: org.country,
      description: org.description,
      orgTypeId: org.orgType,
    };

    console.log(newOrg);

    // send request to the server for the check which role this is
    signup(newOrg);
  };

  const handleChange = ({ target }) => {
    setOrg({ ...org, [target.name]: target.value });
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
            name="name"
            onChange={handleChange}
            type="text"
            value={org.orgName}
            color="primary"
            variant="outlined"
            label="Organization Name"
          />
          {/* Gender */}
          <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
            <InputLabel>Organization Type</InputLabel>
            <Select
              value={org.orgType}
              label="Organization Type"
              name="orgType"
              onChange={handleChange}
              fullWidth
            >
              {orgTypes.length > 0 &&
                orgTypes.map(({ _id, name }, index) => (
                  <MenuItem key={index} value={_id}>
                    {name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {/* Contact Name */}
          <TextField
            fullWidth
            margin="normal"
            name="contactName"
            onChange={handleChange}
            type="text"
            value={org.contactName}
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
            value={org.email}
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
            type="password"
            value={org.password}
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
            value={org.phoneNo}
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
            value={org.streetAddress}
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
            value={org.city}
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
            value={org.state}
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
            value={org.zipCode}
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
            value={org.country}
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
            value={org.description}
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

const Signup = ({ role, ...rest }) => {
  switch (role.toUpperCase()) {
    case "VOLUNTEER":
      return <VolunteerSignup {...rest} />;
    default:
      return <OrgSignup {...rest} />;
  }
};

export default Signup;
