import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import CreateOpportunity from "./CreateOpportunity";

const Opportunities = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const isLoading = false;

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
                <TableRow hover>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Volunteers Needed</TableCell>
                  <TableCell>Skills Required</TableCell>
                  <TableCell>Event Date</TableCell>
                  <TableCell>
                    <IconButton color="success">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="custom">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
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
      <CreateOpportunity />
    </Dialog>
  );
};

const styles = {
  card: {
    width: 250,
    height: 250,
    m: 2,
    boxShadow: (theme) => theme.shadows[20],
    borderRadius: 1,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    transition: "0.25s all ease-in-out",
  },
  avatar: {
    width: 60,
    height: 60,
    m: 2,
    background: (theme) => theme.palette.custom.main,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
};

export default Opportunities;
