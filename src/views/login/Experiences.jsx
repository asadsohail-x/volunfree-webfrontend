import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Container,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
  TextField,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { v4 as uuidv4 } from "uuid";

const EditItem = ({
  state,
  handleChange,
  setStartTime,
  setEndTime,
  setPresent,
  saveItem,
  discardItem,
}) => (
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <Box sx={{ flexGrow: 1, pr: 1 }}>
      <TextField
        fullWidth
        color="primary"
        name="organization"
        value={state.organization}
        onChange={handleChange}
        placeholder="Organization"
        variant="outlined"
        sx={{ my: 2 }}
      />
      <TextField
        fullWidth
        color="primary"
        name="role"
        value={state.role}
        onChange={handleChange}
        placeholder="Role"
        variant="outlined"
        sx={{ my: 2 }}
      />
      <DatePicker
        label="Start Time"
        value={state.startTime}
        onChange={setStartTime}
        maxDate={state.endTime}
        renderInput={(params) => (
          <TextField sx={{ my: 2 }} fullWidth {...params} />
        )}
      />
      <DatePicker
        label="End Time"
        value={state.endTime}
        onChange={setEndTime}
        maxDate={new Date(Date.now())}
        minDate={state.startTime}
        renderInput={(params) => (
          <TextField sx={{ mt: 2 }} fullWidth {...params} />
        )}
        disabled={state.present}
      />
      <FormControlLabel
        control={
          <Checkbox
            sx={{ color: (theme) => theme.palette.custom.accent, ml: 2 }}
            checked={state.present}
            onChange={() => setPresent(!state.present)}
          />
        }
        label="Present"
        sx={{ color: (theme) => theme.palette.custom.accent, mb: 2 }}
      />
    </Box>
    <Box sx={{ width: "100%", justifyContent: "flex-end" }}>
      <Button startIcon={<DeleteIcon />} onClick={discardItem} color="error">
        Discard
      </Button>
      <Button
        startIcon={<SaveIcon />}
        onClick={() => saveItem()}
        color="primary"
      >
        Save
      </Button>
    </Box>
  </Box>
);

const Item = ({ item, editItem, deleteItem }) => (
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <Box>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell sx={{ p: 0, opacity: 0.75 }}>Organization</TableCell>
            <TableCell>{item.organization}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ p: 0, opacity: 0.75 }}>Role</TableCell>
            <TableCell>{item.role}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ p: 0, opacity: 0.75 }}>Start Time</TableCell>
            <TableCell>{item.startTime.toString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ p: 0, opacity: 0.75 }}>End Time</TableCell>
            <TableCell>
              {item.present ? "Present" : item.endTime.toString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
    <Divider sx={{ my: 1 }} />
    <div>
      <Button startIcon={<DeleteIcon />} color="error" onClick={deleteItem}>
        Delete
      </Button>
      <Button
        startIcon={<EditIcon />}
        onClick={() => editItem(item.id)}
        color="info"
      >
        Edit
      </Button>
    </div>
  </Box>
);

const Experiences = ({ experiences, setExperiences }) => {
  // Component Local States
  const [draft, setDraft] = useState(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [newItemState, setNewItemState] = useState({
    organization: "",
    role: "",
    startTime: new Date(),
    endTime: new Date(),
    present: false,
  });

  // Add Item Preparation
  const addItem = () => {
    if (draft || isNewItem) {
      // TODO: Add an alert message here
      console.log(
        "Please finish any remaining tasks (like Editing or Adding Item)"
      );
    } else {
      setNewItemState({
        organization: "",
        role: "",
        startTime: new Date(),
        endTime: new Date(),
        present: false,
      });
      setIsNewItem(true);
    }
  };

  // Edit Item Preparation
  const editItem = (payload) => {
    if (!isNewItem) {
      if (createDraft(payload)) {
        const experience = experiences.find(({ id }) => id === payload);
        setNewItemState({ ...experience });
        setIsNewItem(false);
        return;
      }
    }

    console.log(
      "Please finish any remaining tasks (like Editing or Adding Item)"
    );
  };

  // Discard when editing or adding
  const discardItem = () => {
    if (isNewItem) setIsNewItem(false);

    if (!draft) return;

    setDraft(null);
  };

  const add = (payload) => {
    setExperiences([...experiences, payload]);
  };
  const update = (payload) => {
    setExperiences(
      experiences.map((item) =>
        item.id === payload.id ? { ...item, ...payload } : item
      )
    );
  };
  const del = (payload) => {
    setExperiences(experiences.filter(({ id }) => id !== payload));
  };

  // Save Item at the end of editing and creating
  const saveItem = (id = null) => {
    if (
      newItemState.organization.trim() === "" ||
      newItemState.role.trim() === ""
    ) {
      // TODO: Add an alert message here
      console.log("Nothing's been added");
      return;
    }

    if (isNewItem) {
      add({ id: uuidv4(), ...newItemState });

      setIsNewItem(false);
    } else {
      update({ id, ...newItemState });

      setDraft(null);
    }
  };

  // Mark an item as being edited
  const createDraft = (id) => {
    if (draft) return false;

    setDraft(id);
    return true;
  };

  const handleChange = ({ target }) => {
    setNewItemState({ ...newItemState, [target.name]: target.value });
  };

  // useEffect(() => console.log(newItemState), [newItemState]);

  return (
    <Box
      sx={{
        py: 3,
      }}
    >
      <Container style={{ maxWidth: 1000 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6">Experiences</Typography>
          <Button color="primary" onClick={addItem}>
            Add
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          {isNewItem && (
            <EditItem
              state={newItemState}
              handleChange={handleChange}
              setStartTime={(startTime) =>
                setNewItemState({ ...newItemState, startTime })
              }
              setEndTime={(endTime) =>
                setNewItemState({ ...newItemState, endTime })
              }
              setPresent={(present) =>
                setNewItemState({ ...newItemState, present })
              }
              saveItem={() => saveItem()}
              discardItem={discardItem}
            />
          )}
          {experiences.length > 0
            ? experiences.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 1,
                    my: "2px",
                    border: draft === item.id || "1px solid #eaeaea",
                  }}
                >
                  {draft === item.id ? (
                    <EditItem
                      state={newItemState}
                      handleChange={handleChange}
                      setStartTime={(startTime) =>
                        setNewItemState({ ...newItemState, startTime })
                      }
                      setEndTime={(endTime) =>
                        setNewItemState({ ...newItemState, endTime })
                      }
                      setPresent={(present) =>
                        setNewItemState({ ...newItemState, present })
                      }
                      saveItem={() => saveItem()}
                      discardItem={discardItem}
                    />
                  ) : (
                    <Item
                      item={item}
                      editItem={() => editItem(item.id)}
                      deleteItem={() => del(item.id)}
                    />
                  )}
                </Box>
              ))
            : !isNewItem && <NoItems name="Experiences" />}
        </Box>
      </Container>
    </Box>
  );
};

const NoItems = ({ name }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 3,
      }}
    >
      <Typography variant="h6">No {name} added</Typography>
      <br />
      <p>Create one by clicking the Add button above.</p>
    </Box>
  );
};

export default Experiences;
