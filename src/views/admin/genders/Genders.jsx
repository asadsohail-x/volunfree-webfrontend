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
    <Box sx={{ flexGrow: 1 }}>{item.name}</Box>
    <Divider sx={{ my: 1 }} />
    <div>
      <Button startIcon={<DeleteIcon />} color="error" onClick={deleteItem}>
        Delete
      </Button>
      <Button
        startIcon={<EditIcon />}
        onClick={editItem}
        color="info"
      >
        Edit
      </Button>
    </div>
  </>
);

const Genders = ({ skills, setSkills }) => {
  // Component Local States
  const [draft, setDraft] = useState(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [newItem, setNewItem] = useState("");

  const dispatch = useDispatch();
  const genders = useSelector((state) => state.genders.genders);

  // Add Item Preparation
  const addItem = () => {
    if (draft || isNewItem) {
      // TODO: Add an alert message here
      console.log(
        "Please finish any remaining tasks (like Editing or Adding Item)"
      );
    } else {
      setNewItem("");
      setIsNewItem(true);
    }
  };

  // Edit Item Preparation
  const editItem = (payload) => {
    if (!isNewItem) {
      if (createDraft(payload)) {
        const gender = genders.find(({ id }) => id === payload);
        setNewItem(gender.name);
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

  // Save Item at the end of editing and creating
  const saveItem = (id = null) => {
    if (newItem.trim() === "") {
      console.log("Nothing's been added");
      return;
    }

    if (isNewItem) {
      dispatch(addAsync(newItem));

      setIsNewItem(false);
    } else {
      dispatch(updateAsync(newItem, id));

      setDraft(null);
    }
  };

  // Mark an item as being edited
  const createDraft = (id) => {
    if (draft) return false;

    setDraft(id);
    return true;
  };

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
          <Typography variant="h6">Genders</Typography>
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
              state={newItem}
              handleChange={setNewItem}
              saveItem={() => saveItem()}
              discardItem={discardItem}
            />
          )}
          {genders.length > 0
            ? genders.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 1,
                    my: "2px",
                    border: draft === item._id || "1px solid #eaeaea",
                  }}
                >
                  {draft === item._id ? (
                    <EditItem
                      state={newItemState}
                      handleChange={handleChange}
                      saveItem={() => saveItem(item._id)}
                      discardItem={discardItem}
                    />
                  ) : (
                    <Item
                      item={item}
                      editItem={() => editItem(item._id)}
                      deleteItem={() => del(item._id)}
                    />
                  )}
                </Box>
              ))
            : !isNewItem && <NoItems name="Genders" />}
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

export default Genders;
