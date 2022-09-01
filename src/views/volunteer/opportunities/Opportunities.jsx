import {
  Box,
  Button,
  Dialog,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { Fragment, useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

import ViewOpportunity from "./ViewOpportunity";

import { useDispatch, useSelector } from "react-redux";

import { getByVolunteerAsync as getOpportunities } from "../../../redux/opportunities/opportunities.slice";
import { useCookies } from "react-cookie";

const Opportunities = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [cookie] = useCookies(["user"]);

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
  }, [cookie, dispatch]);

  // useEffect(() => {
  //   console.log(opportunities);
  // }, [opportunities]);

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
      }}
    >
      <ViewModal
        open={isViewModalOpen}
        handleClose={() => setIsViewModalOpen(false)}
        item={draft}
      />
      <Typography variant="h5" color="custom.main" sx={{ px: 2, py: 1 }}>
        Opportunities
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
                />
                <IconButton variant="contained" sx={{ px: 2, color: "white" }}>
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Volunteers Needed</TableCell>
                  <TableCell>Skills Required</TableCell>
                  <TableCell>Event Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {opportunities.length > 0 ? (
                  opportunities.map(
                    (
                      { _id, title, category, volunteersNeeded, skills, date },
                      i
                    ) => (
                      <TableRow hover key={i}>
                        <TableCell>{title}</TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{volunteersNeeded}</TableCell>
                        <TableCell>
                          {skills.length > 0
                            ? skills.map((skill, index) => (
                                <Fragment key={index}>
                                  {skill} <br />
                                </Fragment>
                              ))
                            : "-"}
                        </TableCell>
                        <TableCell>{new Date(date).toDateString()}</TableCell>
                        <TableCell>
                          <Button color="custom" onClick={() => view(_id)}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  )
                ) : (
                  <TableRow>
                    <TableCell>No Opportunities</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const ViewModal = ({ open, handleClose, item }) => {
  return (
    <Dialog scroll="paper" onClose={handleClose} open={open}>
      <ViewOpportunity handleClose={handleClose} item={item} />
    </Dialog>
  );
};

export default Opportunities;
