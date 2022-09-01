import { useEffect, useState } from "react";

import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useLocation, useNavigate } from "react-router-dom";

import VolunteersTable from "./VolunteersTable";
import ViewVolunteer from "./ViewVolunteer";

import { getByOrganizationAsync as getOpportunities } from "../../../redux/opportunities/opportunities.slice";

import {
  getAppliedVolunteersAsync as getVolunteers,
  filterVolunteers as filter,
} from "../../../redux/opportunities/opportunities.slice";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const AppliedVolunteers = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [draft, setDraft] = useState({});
  const [id, setId] = useState(null);

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [cookie] = useCookies(["user"]);

  const isLoading = useSelector((state) => state.opportunities.isLoading);
  const volunteers = useSelector((state) => state.opportunities.volunteers);
  const opportunities = useSelector(
    (state) => state.opportunities.opportunities
  );
  const dispatch = useDispatch();

  const view = (id) => {
    setDraft(() => volunteers.find(({ _id }) => id === _id));
    setIsViewModalOpen(true);
  };

  const handleFilters = (text) => {
    setFilterText(text);
    dispatch(filter(text));
  };

  useEffect(() => {
    if (location.state.id) {
      setId(() => location.state.id);
      dispatch(getVolunteers(location.state.id));
    } else {
      navigate("/track");
    }
  }, [dispatch, location, navigate]);

  useEffect(() => {
    if (id) {
      if (opportunities.length) {
        setSelectedOpportunity(opportunities.find(({ _id }) => _id === id));
      } else {
        dispatch(getOpportunities(cookie["user"]._id));
      }
    }
  }, [id, dispatch, opportunities, cookie]);

  if (location.state.id) {
    return (
      <Box
        component="main"
        sx={{
          width: "100%",
        }}
      >
        <ViewVolunteer
          open={isViewModalOpen}
          handleClose={() => setIsViewModalOpen(false)}
          volunteer={draft}
        />
        <Box sx={{ display: "flex" }}>
          <IconButton
            color="custom"
            onClick={() =>
              navigate("/track", { state: { id: location.state.id } })
            }
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" color="custom.main" sx={{ px: 2, py: 1 }}>
            Applied Volunteers
          </Typography>
        </Box>
        <Divider
          sx={{
            borderColor: "background",
            my: 1,
          }}
        />

        {isLoading ? (
          "Loading..."
        ) : (
          <Box
            sx={{
              width: "100%",
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 1,
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: (theme) => theme.palette.custom.accent,
                    borderRadius: 1,
                  }}
                >
                  <TextField
                    sx={{
                      background: (theme) => theme.palette.custom.light,
                      minWidth: "400px",
                      outline: "none",
                    }}
                    size="small"
                    placeholder="Search"
                    color="custom"
                    value={filterText}
                    onChange={({ target: { value } }) => handleFilters(value)}
                  />
                  <IconButton
                    variant="contained"
                    sx={{ px: 2, color: "white" }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            {selectedOpportunity && (
              <VolunteersTable
                volunteers={volunteers}
                view={view}
                opportunity={selectedOpportunity}
              />
            )}
          </Box>
        )}
      </Box>
    );
  }
};

export default AppliedVolunteers;
