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

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Organizations = () => {
  const isLoading = false;

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h5" sx={{ px: 2, py: 1 }}>
        Organizations
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
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
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
                  background: (theme) => theme.palette.custom.main,
                  borderRadius: 1,
                }}
              >
                <TextField
                  sx={{
                    background: (theme) => theme.palette.custom.light,
                    minWidth: "400px",
                    outline: "none",
                  }}
                  placeholder="Search"
                  color="custom"
                />
                <IconButton variant="contained" sx={{ px: 2, color: "white" }}>
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box>
            <Container>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Subscription</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover>
                    <TableCell>Organization 1</TableCell>
                    <TableCell>NGO</TableCell>
                    <TableCell>Free</TableCell>
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
                  <TableRow hover>
                    <TableCell>Organization 1</TableCell>
                    <TableCell>NGO</TableCell>
                    <TableCell>Free</TableCell>
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
                  <TableRow hover>
                    <TableCell>Organization 1</TableCell>
                    <TableCell>NGO</TableCell>
                    <TableCell>Free</TableCell>
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
            </Container>
          </Box>
        </>
      )}
    </Box>
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

export default Organizations;
