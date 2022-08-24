import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Container,
  Divider,
  Typography,
  TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import { v4 as uuidv4 } from "uuid";

const EditItem = ({ state, handleChange, saveItem, discardItem }) => (
  <Box sx={{ width: "100%" }}>
    <Box sx={{ flexGrow: 1, pr: 1 }}>
      <TextField
        fullWidth
        color="primary"
        name="skill"
        value={state.skill}
        onChange={handleChange}
        label="Skill"
        variant="outlined"
        sx={{ my: 2 }}
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
  <>
    <Box sx={{ flexGrow: 1 }}>{item.skill}</Box>
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
  </>
);

const Skills = ({ skills, setSkills }) => {
  // Component Local States
  const [draft, setDraft] = useState(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [newItemState, setNewItemState] = useState({ skill: "" });

  // Add Item Preparation
  const addItem = () => {
    if (draft || isNewItem) {
      // TODO: Add an alert message here
      console.log(
        "Please finish any remaining tasks (like Editing or Adding Item)"
      );
    } else {
      setNewItemState({ skill: "" });
      setIsNewItem(true);
    }
  };

  // Edit Item Preparation
  const editItem = (payload) => {
    if (!isNewItem) {
      if (createDraft(payload)) {
        const skill = skills.find(({ id }) => id === payload);
        setNewItemState({ ...skill });
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
    setSkills([...skills, payload]);
  };
  const update = (payload) => {
    setSkills(
      skills.map((item) =>
        item.id === payload.id ? { ...item, ...payload } : item
      )
    );
  };
  const del = (payload) => {
    setSkills(skills.filter(({ id }) => id !== payload));
  };

  // Save Item at the end of editing and creating
  const saveItem = (id = null) => {
    if (newItemState.skill.trim() === "") {
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
          <Typography variant="label">Required Skills</Typography>
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
              saveItem={() => saveItem()}
              discardItem={discardItem}
            />
          )}
          {skills.length > 0
            ? skills.map((item, index) => (
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
            : !isNewItem && <NoItems name="Skills" />}
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

export default Skills;
