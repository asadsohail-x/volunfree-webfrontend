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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import CreateOpportunity from "./CreateOpportunity";
import EditOpportunity from "./EditOpportunity";
import ViewOpportunity from "./ViewOpportunity";

import { useDispatch, useSelector } from "react-redux";

import { getAsync as getOpportunities } from "../../../redux/opportunities/opportunities.slice";

const Opportunities = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const isLoading = useSelector((state) => state.opportunities.isLoading);
  const opportunities = useSelector(
    (state) => state.opportunities.opportunities
  );
  const dispatch = useDispatch();

  const [draft, setDraft] = useState({});

  const edit = (id) => {
    setDraft(() => opportunities.find(({ _id }) => id === _id));
    setIsEditModalOpen(true);
  };

  const view = (id) => {
    setDraft(() => opportunities.find(({ _id }) => id === _id));
    setIsViewModalOpen(true);
  };

  const del = (id) => {
    console.log(
      "Deleting",
      opportunities.find(({ _id }) => id === _id)
    );
  };

  useEffect(() => {
    dispatch(getOpportunities());
  }, [dispatch]);

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
      }}
    >
      <AddModal
        open={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
      />
      <EditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        item={draft}
      />
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
            <Button variant="contained" onClick={() => setIsAddModalOpen(true)}>
              Add
            </Button>
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
                          <IconButton color="success" onClick={() => edit(_id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="custom" onClick={() => view(_id)}>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => del(_id)}>
                            <DeleteIcon />
                          </IconButton>
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

const AddModal = ({ open, handleClose }) => {
  return (
    <Dialog scroll="paper" onClose={handleClose} open={open}>
      <CreateOpportunity handleClose={handleClose} />
    </Dialog>
  );
};

const EditModal = ({ open, handleClose, item }) => {
  return (
    <Dialog scroll="paper" onClose={handleClose} open={open}>
      <EditOpportunity handleClose={handleClose} item={item} />
    </Dialog>
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
