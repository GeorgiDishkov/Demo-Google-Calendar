import {
  Box,
  Button,
  Checkbox,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ListIcon from "@mui/icons-material/List";
import { useAppDispach } from "../../redux/store";
import { addEvent } from "../../redux/eventSlice/reducer";

const PREFIX = "create-events";

const classes = {
  button: `${PREFIX}-button`,
  active: `${PREFIX}-active`,
  checkBox: `${PREFIX}-checkBox`,
};
const StyledModal = styled(Modal)(({ theme }) => ({
  [`& .${classes.button}`]: {
    color: theme.palette.background.default,
    marginRight: "10px",
    height: "45px",
    "&:hover": {
      backgroundColor: "#3393f514",
    },
  },
  [`& .${classes.active}`]: {
    color: theme.palette.secondary.dark,
    backgroundColor: "#3393f514",
    "&:hover": {
      backgroundColor: "#3393f538",
    },
  },
  [`& .${classes.checkBox}`]: {
    color: theme.palette.secondary.dark,
  },
}));

const CreateEvemtModal = ({ isOpen, onClose }: any) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [typeEvent, setTypeEvent] = useState<string>("");
  const [repeatedly, setRepeatedly] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispach();

  const handleSave = () => {
    const newItem = {
      title,
      description,
      date,
      typeEvent,
    };
    if (title && description && date && typeEvent) {
      dispatch(addEvent({ title, description, date, typeEvent, repeatedly }));
      setTitle("");
      setDescription("");
      setDate("");
      setTypeEvent("");
      setError("");
      onClose();
    }
    if (!title || !description || !date || !typeEvent) {
      setError("Please fill all the fields");
    }
  };
  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "#fff",
          boxShadow: 24,
          padding: 2,
          borderRadius: 3,
        }}
      >
        <Box style={{ marginLeft: "40px" }}>
          <TextField
            label="Add title"
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ my: 2 }}
            fullWidth
          />
        </Box>
        <Box style={{ marginLeft: "40px" }}>
          <Button
            className={`${classes.button} ${
              typeEvent === "event" ? classes.active : ""
            }`}
            onClick={() => setTypeEvent("event")}
          >
            <Typography textTransform="none" fontSize={15}>
              Event
            </Typography>
          </Button>
          <Button
            className={`${classes.button} ${
              typeEvent === "task" ? classes.active : ""
            }`}
            onClick={() => setTypeEvent("task")}
          >
            <Typography textTransform="none" fontSize={15}>
              Task
            </Typography>
          </Button>
        </Box>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <PlaylistAddIcon
            fontSize="small"
            style={{ marginTop: "20px", marginRight: "15px" }}
          />
          <TextField
            label="Description"
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ my: 2 }}
            fullWidth
          />
        </Box>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <ListIcon
            fontSize="small"
            style={{ marginTop: "10px", marginRight: "15px" }}
          />
          <TextField
            variant="standard"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ my: 2 }}
            fullWidth
          />
        </Box>
        <Box>
          {error && (
            <Typography
              style={{ color: "red", marginLeft: "40px" }}
              fontSize={15}
            >
              {error}
            </Typography>
          )}
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography style={{ marginLeft: "200px" }}>Repeatedly</Typography>
            <Checkbox
              className={classes.checkBox}
              checked={repeatedly}
              onChange={(e) => setRepeatedly(e.target.checked)}
              name="myCheckbox"
            />
            <Button variant="contained" color="secondary" onClick={handleSave}>
              <Typography
                color="background.paper"
                fontSize={14}
                textTransform="none"
              >
                Save
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </StyledModal>
  );
};

export default CreateEvemtModal;
