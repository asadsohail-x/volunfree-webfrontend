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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { useSelector, useDispatch } from "react-redux";

import Skills from "./Skills";

import { getAsync } from "../../../redux/oppCategories/oppCategories.slice";
import { axiosPut } from "../../../api/axiosHelper";
import { useCookies } from "react-cookie";

const CreateOpportunity = () => {
  const [cookie] = useCookies(["user"]);

  const [opportunity, setOpportunity] = useState({
    title: "",
    categoryId: "",
    date: new Date(Date.now()),
    startTime: "07:30",
    endTime: "12:30",
    city: "",
    state: "",
    zipCode: "",
    volunteersNeeded: "",
    description: "",
    skills: "",
  });

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.oppCategories.oppCategories);

  useEffect(() => {
    dispatch(getAsync());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const org = cookie["user"];
    const organizationId = org._id;
    console.log({ ...opportunity, organizationId });

    axiosPut("opportunities/add", { ...opportunity, organizationId }).then(
      (res) => console.log(res)
    );
  };

  const handleChange = ({ target }) => {
    setOpportunity({ ...opportunity, [target.name]: target.value });
  };

  return (
    <Box
      sx={{
        background: "white",
        borderRadius: 5,
        my: 2,
        py: 5,
        overflowY: "auto",
      }}
      style={{
        paddingLeft: "calc(100vw * 0.05)",
        paddingRight: "calc(100vw * 0.05)",
      }}
    >
      <Box sx={{ my: 3, textAlign: "center" }}>
        <Typography color="primary" variant="h4" sx={{ mb: 1 }}>
          Create Opportunity
        </Typography>
      </Box>
      {/* Title */}
      <TextField
        fullWidth
        margin="normal"
        name="title"
        onChange={handleChange}
        type="text"
        value={opportunity.title}
        color="primary"
        variant="outlined"
        label="Title"
      />
      {/* Description */}
      <TextField
        fullWidth
        margin="normal"
        name="description"
        onChange={handleChange}
        type="text"
        value={opportunity.description}
        color="primary"
        variant="outlined"
        label="Description"
        multiline
        rows={10}
      />
      {/* Category */}
      <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={opportunity.categoryId}
          label="Category"
          name="categoryId"
          onChange={handleChange}
          fullWidth
        >
          {categories.length > 0 &&
            categories.map(({ _id, name }, index) => (
              <MenuItem key={index} value={_id}>
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* Commitment */}
      {/* Date */}
      <InputLabel sx={{ m: 1 }}>Commitment Date</InputLabel>
      <DatePicker
        label="Date"
        inputFormat="dd/MM/yyyy"
        value={opportunity.date}
        onChange={(date) => setOpportunity({ ...opportunity, date })}
        renderInput={(p) => (
          <TextField sx={{ mt: 3, mb: 2 }} fullWidth {...p} />
        )}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Start Time */}
        <TextField
          id="time"
          label="Start Time"
          name="startTime"
          type="time"
          value={opportunity.startTime}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          fullWidth
        />
        {/* End Time */}
        <TextField
          id="time"
          label="End Time"
          name="endTime"
          type="time"
          value={opportunity.endTime}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          fullWidth
        />
      </Box>

      {/* Location */}
      <InputLabel sx={{ m: 1 }}>Location</InputLabel>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* City */}
        <TextField
          fullWidth
          margin="normal"
          name="city"
          onChange={handleChange}
          type="text"
          value={opportunity.city}
          color="primary"
          variant="outlined"
          label="City"
          sx={{ mx: 1 }}
        />
        {/* State */}
        <TextField
          fullWidth
          margin="normal"
          name="state"
          onChange={handleChange}
          type="text"
          value={opportunity.state}
          color="primary"
          variant="outlined"
          label="State"
          sx={{ mx: 1 }}
        />
        {/* Zip Code */}
        <TextField
          fullWidth
          margin="normal"
          name="zipCode"
          onChange={handleChange}
          type="text"
          value={opportunity.zipCode}
          color="primary"
          variant="outlined"
          label="Zip Code"
          sx={{ mx: 1 }}
        />
      </Box>

      {/* Skills */}
      <Skills
        skills={opportunity.skills}
        setSkills={(skills) => setOpportunity({ ...opportunity, skills })}
      />

      <Button
        color="primary"
        fullWidth
        size="large"
        variant="contained"
        sx={{ mt: 10, mb: 2 }}
        onClick={handleSubmit}
      >
        Create
      </Button>
    </Box>
  );
};

export default CreateOpportunity;
