import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAsync,
  addAsync,
  updateAsync,
  delAsync,
  filter,
} from "../../../redux/orgTypes/orgTypes.slice";

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const OrganizationTypes = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.orgTypes.isLoading);
  const orgTypes = useSelector((state) => state.orgTypes.orgTypes);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);

  const [editItem, setEditItem] = useState({ name: "" });
  const [delId, setDelId] = useState(null);

  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    dispatch(getAsync());
  }, [dispatch]);

  const openEditModal = (id) => {
    setEditItem(orgTypes.find(({ _id }) => id === _id));
    setEditModalOpen(true);
  };

  const openDelModal = (id) => {
    setDelId(id);
    setDelModalOpen(true);
  };

  const handleFilters = (text) => {
    dispatch(filter(text));
    setFilterText(text);
  };

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
      }}
    >
      <AddModal
        open={addModalOpen}
        handleClose={() => setAddModalOpen(false)}
      />
      <EditModal
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        item={editItem}
      />
      <DelModal
        open={delModalOpen}
        handleClose={() => setDelModalOpen(false)}
        id={delId}
      />
      <Typography variant="h5" sx={{ px: 2, py: 1 }}>
        Organization Types
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
                value={filterText}
                onChange={({ target: { value } }) => handleFilters(value)}
                color="custom"
              />
              <IconButton variant="contained" sx={{ px: 2, color: "white" }}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 2,
              p: 2,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Box
              sx={{ ...styles.card, cursor: "pointer" }}
              onClick={() => setAddModalOpen(true)}
            >
              <Avatar sx={styles.avatar}>
                <AddIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h6" color="custom.main">
                Add Type
              </Typography>
            </Box>

            {orgTypes.map((item, index) => (
              <Item
                item={item}
                key={index}
                edit={openEditModal}
                del={(id) => openDelModal(id)}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

const Item = ({ item, edit, del }) => {
  const [isMouseOver, setMouseOver] = useState(false);

  return (
    <Box
      sx={{ ...styles.card, pb: isMouseOver ? 4 : 0 }}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <Avatar sx={styles.avatar}>
        {item.icon ? <AddIcon sx={{ fontSize: 40 }} /> : item.name[0]}
      </Avatar>
      <Typography variant="h6" color="custom.main">
        {item.name}
      </Typography>
      {isMouseOver && (
        <Box sx={styles.actions}>
          <IconButton color="error" sx={{ m: 1 }} onClick={() => del(item._id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="info" sx={{ m: 1 }} onClick={() => edit(item._id)}>
            <EditIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

const DelModal = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const del = () => {
    handleClose();
    dispatch(delAsync(id));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete Organization Type?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you delete an organization type, all the organizations that fall
          under this type will be terminated. Are you sure you want to proceed?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Cancel
        </Button>
        <Button onClick={del} color="error" autoFocus>
          Proceed to Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const EditModal = ({ open, handleClose, item }) => {
  const [state, setState] = useState({
    name: "",
    icon: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setState({
      name: item ? item.name : "",
      icon: item ? item.icon && item.icon : null,
    });
  }, [item]);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const submitHandler = (id) => {
    dispatch(updateAsync(state.name, id));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ py: 3, px: "5%", width: 400 }}>
        <Typography
          variant="h6"
          color="custom.main"
          sx={{ width: "100%", textAlign: "center", mb: 4 }}
        >
          Edit Organization Type
        </Typography>
        <DialogContent>
          <TextField
            autoFocus
            label="Type Name"
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            color="custom"
          />
          <Box sx={{ width: "100%", textAlign: "center", my: 2 }}>
            <Button variant="text" color="custom" component="label">
              Upload Icon
              <input type="file" hidden accept="image/*" />
            </Button>
          </Box>
          <Box sx={{ width: "100%", textAlign: "center", mt: 5 }}>
            <Button
              variant="contained"
              color="custom"
              onClick={() => submitHandler(item._id)}
            >
              Submit
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

const AddModal = ({ open, handleClose }) => {
  const [state, setState] = useState({
    name: "",
    icon: null,
  });

  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleFileChange = ([file]) => {
    console.log(file);
    setState({ ...state, icon: file });
  };

  const submitHandler = () => {
    setState({ ...state, name: "" });
    dispatch(addAsync(state.name));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ py: 3, px: "5%", width: 400 }}>
        <Typography
          variant="h6"
          color="custom.main"
          sx={{ width: "100%", textAlign: "center", mb: 4 }}
        >
          Add Organization Type
        </Typography>
        <DialogContent>
          <TextField
            autoFocus
            label="Type Name"
            type="text"
            value={state.name}
            name="name"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            color="custom"
          />
          <Box sx={{ width: "100%", textAlign: "center", my: 2 }}>
            <Button variant="text" color="custom" component="label">
              Upload Icon
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  handleFileChange([...e.target.files]);
                }}
              />
            </Button>
          </Box>
          <Box sx={{ width: "100%", textAlign: "center", mt: 5 }}>
            <Button variant="contained" color="custom" onClick={submitHandler}>
              Submit
            </Button>
          </Box>
        </DialogContent>
      </Box>
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
    position: "relative",

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
  actions: {
    position: "absolute",
    bottom: 0,
    left: 0,

    width: "100%",
    height: 50,
    transition: "0.25s all ease-in-out",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    boxShadow: "0 -5px 15px -15px black",
  },
};

export default OrganizationTypes;
