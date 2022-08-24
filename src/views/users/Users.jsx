import { useState } from "react";
import {
  Button,
  Box,
  Container,
  Card,
  TextField,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UserModal from "./UserModal";
import UserFilterModal from "./UserFilterModal";

const UsersTable = ({ users }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Card>
      <UserModal open={modalOpen} handleClose={() => setModalOpen(false)} />
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: 768 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Total Posts</TableCell>
                <TableCell>Joined On</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item, i) => (
                <TableRow hover key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john.doe@mail.com</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>Tue Aug 16 2022 06:49:44</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<VisibilityIcon />}
                      color="secondary"
                      onClick={() => setModalOpen(true)}
                    >
                      View More
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Card>
  );
};

const Users = () => {
  const [filterText, setFilterText] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container style={{ maxWidth: 1000 }}>
        <Toolbar
          modalOpen={filterModalOpen}
          handleClose={() => setFilterModalOpen(false)}
          handleOpen={() => setFilterModalOpen(true)}
          filterText={filterText}
          setFilterText={setFilterText}
        />
        <UsersTable users={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
      </Container>
    </Box>
  );
};

const Toolbar = ({
  modalOpen,
  handleOpen,
  handleClose,
  filterText,
  setFilterText,
}) => {
  return (
    <>
      <UserFilterModal open={modalOpen} handleClose={handleClose} />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Users
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => console.log("Add User")}
          >
            Add
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
        <Box sx={{ maxWidth: 500, my: 5, mr: 2 }}>
          <TextField
            fullWidth
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search"
            variant="outlined"
          />
        </Box>
        <Button color="secondary" variant="outlined" onClick={handleOpen}>
          Filters
        </Button>
      </Box>
    </>
  );
};

export default Users;
