import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ViewOpportunity from "./ViewOpportunity";

import { useDispatch, useSelector } from "react-redux";

import {
  getByOrganizationAsync as getOpportunities,
  filter,
} from "../../../redux/opportunities/opportunities.slice";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import OpportunitiesTable from "./OpportunitiesTable";

const Opportunities = ({ showMenu }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  const [cookie] = useCookies(["user"]);

  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.opportunities.isLoading);
  const opportunities = useSelector(
    (state) => state.opportunities.opportunities
  );
  const dispatch = useDispatch();

  const [draft, setDraft] = useState({});

  const view = (id) => {
    setDraft(() => opportunities.find(({ _id }) => id === _id));
    setIsViewModalOpen(true);
  };

  useEffect(() => {
    dispatch(getOpportunities(cookie["user"]._id));
  }, [dispatch]);

  const handleFilters = (text) => {
    setFilterText(text);
    dispatch(filter(text));
  };

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
      }}
    >
      <ViewOpportunity
        open={isViewModalOpen}
        handleClose={() => setIsViewModalOpen(false)}
        item={draft}
      />
      <Typography variant="h5" color="custom.main" sx={{ px: 2, py: 1 }}>
        Track Opportunities
      </Typography>
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
                <IconButton variant="contained" sx={{ px: 2, color: "white" }}>
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <OpportunitiesTable
            opportunities={opportunities}
            showMenu={showMenu}
          />
        </Box>
      )}
    </Box>
  );
};

export default Opportunities;
